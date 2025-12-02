import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import fs from "fs/promises";

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, "..", "public")));

const recipesPath = path.join(__dirname, "..", "data", "recipes.json");

async function loadRecipes() {
  const file = await fs.readFile(recipesPath);
  return JSON.parse(file.toString());
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
