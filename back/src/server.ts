import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import fs from "fs/promises";

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, "..", "public")));

const recipesPath = path.join(
  __dirname,
  "..",
  "data",
  "processed",
  "recipes.json"
);
console.log("Loading recipes from:", recipesPath);

async function loadRecipes() {
  const file = await fs.readFile(recipesPath);
  const data = JSON.parse(file.toString());

  // recipe steps strings to recipe array string
  return data.map((recipe: any) => ({
    ...recipe,
    steps:
      typeof recipe.steps === "string"
        ? recipe.steps.split("\n")
        : recipe.steps,
  }));
}

app.get("/recipes", async (req: Request, res: Response) => {
  try {
    const recipes = await loadRecipes();
    res.json(recipes);
  } catch (err) {
    console.error("Error reading recipes:", err);
    res.status(500).json({ error: "Cannot load recipes" });
  }
});

app.listen(3001, () => {
  console.log("back running on http://localhost:3001 !");
});
