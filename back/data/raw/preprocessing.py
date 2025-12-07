import os
import re
import json
import uuid
from pathlib import Path
from ast import literal_eval
import pandas as pd
import joblib
import unicodedata
from rapidfuzz import process, fuzz


# NLP / NER helpers 
def word2features(sent, i):
    word = sent[i][0]
    features = {
        'bias': 1.0,
        'word.lower()': word.lower(),
        'word.istitle()': word.istitle(),
        'word.isupper()': word.isupper(),
        'word.isdigit()': word.isdigit(),
        'word.length': len(word),
        'word.is_hyphenated': '-' in word,
        'word.is_comma': (word == ','),
        'word.is_dot': (word == '.'),
    }
    if i > 0:
        word1 = sent[i-1][0]
        features.update({
            '-1:word.lower()': word1.lower(),
            '-1:word.istitle()': word1.istitle(),
            '-1:word.isupper()': word1.isupper(),
            '-1:word.is_comma': (word1 == ','),
        })
    else:
        features['BOS'] = True
    if i < len(sent)-1:
        word1 = sent[i+1][0]
        features.update({
            '+1:word.lower()': word1.lower(),
            '+1:word.istitle()': word1.istitle(),
            '+1:word.isupper()': word1.isupper(),
            '+1:word.is_comma': (word1 == ','),
        })
    else:
        features['EOS'] = True
    return features

def sent2features(sent):
    return [word2features(sent, i) for i in range(len(sent))]

def preprocess_raw_ingredient(raw_ingredient_string):
    """
    Tokenize: keep letters (including accents) and apostrophes,
    return list of tuples [(token, 'O'), ...] suitable for CRF.
    """
    if not isinstance(raw_ingredient_string, str):
        return []
    clean_string = re.sub(r'[\(\)\[\]\{\}]', ' ', raw_ingredient_string)
    tokens = re.findall(r"[\wÀ-ÿ']+|[.,\"'/]", clean_string)
    return [(token, 'O') for token in tokens if token]

def extract_ingredient_names(raw_ingredient_string, crf_model):
    """
    Using the CRF model
    Returns list of ingredient strings (may be empty).
    """
    sequence = preprocess_raw_ingredient(raw_ingredient_string)
    if not sequence or crf_model is None:
        return []

    features = sent2features(sequence)
    try:
        predicted_labels = crf_model.predict([features])[0]
    except Exception:
        return []

    extracted_tokens = [token for (token, _), label in zip(sequence, predicted_labels) if label == 'NAME']

    final_names = []
    current_name = []
    for token in extracted_tokens:
        if current_name and (token[0].islower() or token[0].isdigit() or re.match(r'^[\W_]+$', token) or token == "'"):
            current_name.append(token)
        elif current_name:
            final_names.append(" ".join(current_name))
            current_name = [token]
        else:
            current_name = [token]
    if current_name:
        final_names.append(" ".join(current_name))

    cleaned = [re.sub(r'\s+', ' ', t).strip() for t in final_names if t and t.strip()]
    return cleaned



# Normalization helpers
def normalize_string_for_keywords(text):
    s = str(text or "").lower()
    s = ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn')
    s = re.sub(r'[^\w\s-]', ' ', s)
    s = re.sub(r'[-\s]+', ' ', s)
    return s.strip()

def normalize_for_match(s):
    s = str(s or "").lower()
    s = s.replace('-', ' ')
    s = re.sub(r'[^\w\s]', '', s)
    s = re.sub(r'\s+', ' ', s).strip()
    return s

def clean_ingredient_name(name):
    if not isinstance(name, str):
        return ""
    cleaned = name.strip(" \t\n\r\"'.,;:-")
    cleaned = re.sub(r'\s+', ' ', cleaned)
    return cleaned.strip()



class RecipePreprocessor:
    def __init__(self,
                 csv_path,
                 model_path,
                 image_dir,            
                 output_path,
                 min_ingredients=2,
                 fuzzy_threshold=60,
                 debug=False):
        self.csv_path = Path(csv_path)
        self.model_path = Path(model_path)
        self.image_dir = Path(image_dir)
        self.output_path = Path(output_path)
        self.MIN_INGREDIENTS = min_ingredients
        self.FUZZY_THRESHOLD = fuzzy_threshold
        self.debug = debug

        self.df = None
        self.crf_model = self._load_model()
        self._image_stem_map = self._load_available_images_map()


    def _load_model(self):
        try:
            model = joblib.load(self.model_path)
            return model
        except Exception as e:
            print(" !! could not load the NER model:", e)
            return None
        

    def _resolve_image_dir(self):
        candidate = Path(self.image_dir)
        if candidate.exists():
            return candidate.resolve()

        cand = Path.cwd() / self.image_dir
        if cand.exists():
            return cand.resolve()

        script_dir = Path(__file__).resolve().parent
        cand = script_dir / self.image_dir
        if cand.exists():
            return cand.resolve()

        cand = script_dir.parent / self.image_dir.name
        if cand.exists():
            return cand.resolve()
        return candidate


    def _load_available_images_map(self):
        resolved_dir = self._resolve_image_dir()
        if not resolved_dir.exists():
            print(f" pb with Image dir : {resolved_dir}")
            return {}

        stems_map = {}
        count = 0
        for f in resolved_dir.iterdir():
            if f.is_file() and f.suffix.lower() in ['.jpg', '.jpeg', '.png', '.webp']:
                count += 1
                stem = normalize_for_match(f.stem)
                stems_map.setdefault(stem, []).append(f.name)
        if self.debug:
            print("Sample image stems:", list(stems_map.keys())[:10])
        return stems_map

  
    def load_data(self):
        self.df = pd.read_csv(self.csv_path)

        for col in ['Cleaned_Ingredients', 'Image_Name']:
            if col in self.df.columns:
                self.df.drop(columns=[col], inplace=True, errors='ignore')

        for col in ["Title", "Ingredients", "Instructions"]:
            if col not in self.df.columns:
                self.df[col] = ""
            self.df[col] = self.df[col].fillna("").astype(str)
        return self

    def parse_ingredients_column(self):
        """
        For each ingredient line, we extract ingredient names via NER if available,
        otherwise fallback to heuristic tokenization.
        Produce IngredientPairs: list of {"ingredient": name, "amount": original_line}
        """
        parsed_lists = []
        for raw in self.df["Ingredients"]:
            parsed = []
            try:
                cand = literal_eval(raw)
                if isinstance(cand, (list, tuple)):
                    parsed = [str(x) for x in cand if x]
                else:
                    parsed = [str(raw)]
            except Exception:
                if "\n" in raw:
                    parsed = [line.strip() for line in raw.splitlines() if line.strip()]
                else:
                    parsed = [p.strip() for p in re.split(r';|\||\n', raw) if p.strip()]
                    if len(parsed) == 1 and "," in parsed[0]:
                        parsed = [p.strip() for p in parsed[0].split(",") if p.strip()]

            pairs = []
            for item in parsed:
                # extract via NER w/ the CRF model (extract_ingredient_names)
                names = extract_ingredient_names(item, self.crf_model) if self.crf_model else []
                if not names:
                    cand = normalize_string_for_keywords(item)
                    words = [w for w in cand.split() if len(w) > 2 and not re.search(r'\d', w)]
                    if words:
                        names = [" ".join(words[:3])]
              
                if names:
                    for name in names:
                        name_clean = clean_ingredient_name(name)
                        if name_clean:
                            pairs.append({"ingredient": name_clean, "amount": item})
            parsed_lists.append(pairs)

        self.df["IngredientPairs"] = parsed_lists
        self.df["IngredientCount"] = self.df["IngredientPairs"].apply(len)
        self.df = self.df[self.df["IngredientCount"] >= self.MIN_INGREDIENTS].reset_index(drop=True)
       
        return self

    def parse_steps(self):
        self.df["Steps"] = self.df["Instructions"].apply(lambda x: str(x).strip())
        return self

  

    def find_best_image_match(self, title, ingredient_pairs):
      
        if not self._image_stem_map:
            return None

        title_keywords = normalize_string_for_keywords(title)
        ingredient_keywords = " ".join(normalize_string_for_keywords(i["ingredient"]) for i in ingredient_pairs)
        combined = (title_keywords + " " + ingredient_keywords).strip()
        if not combined:
            return None

        stems = list(self._image_stem_map.keys())
       
        try:
            best = process.extractOne(combined, stems, scorer=fuzz.token_set_ratio)
        except Exception:
            return None

        if best and best[1] >= self.FUZZY_THRESHOLD:
            matched_stem = best[0]  
            
            filenames = self._image_stem_map.get(matched_stem, [])
            if filenames:
               
                return os.path.join("FoodImages", filenames[0]).replace("\\", "/")
        return None

    def associate_images(self):
        if not self._image_stem_map:
            print(" no images available to match")
            self.df["Image_File"] = None
            return self

        self.df["Image_File"] = self.df.apply(
            lambda r: self.find_best_image_match(r["Title"], r["IngredientPairs"]),
            axis=1
        )
        matched = self.df["Image_File"].notnull().sum()
        print(f" images matched: {matched}/{len(self.df)}")
        if self.debug:
            # a few examples of matches
            sample = self.df[["Title", "Image_File"]].head(10)
            print("Sample matches:\n", sample.to_dict(orient="records"))
        return self


    def save_json(self):
        os.makedirs(self.output_path.parent, exist_ok=True)
        recipes = []
        for _, row in self.df.iterrows():
            recipes.append({
                "id": str(uuid.uuid4()),
                "title": row["Title"],
                "overview": None,
                "image": row["Image_File"],
                "ingredients": row["IngredientPairs"],
                "steps": row["Steps"],
                "cookingTime": None,
                "servings": None
            })
      
        with open(self.output_path, "w", encoding="utf-8") as f:
            json.dump(recipes, f, indent=4, ensure_ascii=False)
        print(" saved json to:", self.output_path)
        return self

 
    def run(self):
        return (
            self.load_data()
                .parse_ingredients_column()
                .parse_steps()
                .associate_images()
                .save_json()
        )


if __name__ == "__main__":
    BASE_DIR = Path(__file__).resolve().parent.parent
    CSV_PATH = BASE_DIR / "raw" / "food_dataset.csv"
    MODEL_PATH = BASE_DIR / "raw" / "ingredient_ner_model.joblib"
    IMAGE_DIR = (BASE_DIR.parent / "public" / "FoodImages")
    OUTPUT_DIR = BASE_DIR / "raw" / "processed"
    OUTPUT_PATH = OUTPUT_DIR / "recipes.json"

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    processor = RecipePreprocessor(
        csv_path=CSV_PATH,
        model_path=MODEL_PATH,
        image_dir=IMAGE_DIR,
        output_path=OUTPUT_PATH,
        min_ingredients=2,
        fuzzy_threshold=60,
        debug=True
    )
    processor.run()
