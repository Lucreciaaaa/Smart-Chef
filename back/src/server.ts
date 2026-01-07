import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: ["https://smart-chef-rho.vercel.app", "http://localhost:3000"],
  })
);

async function loadRecipes() {
  const GITHUB_ASSET_URL = process.env.GITHUB_ASSET_URL;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME; // Cloudinary

  if (!GITHUB_ASSET_URL) {
    throw new Error("GITHUB_ASSET_URL missing in env variables");
  }

  const response = await fetch(GITHUB_ASSET_URL);

  if (!response.ok) {
    throw new Error(`GitHub API responds with status : ${response.status}`);
  }

  const data = await response.json();

  return data.map((recipe: any) => ({
    ...recipe,

    image: recipe.image
      ? `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/FoodImages/${path.basename(
          recipe.image
        )}`
      : null,
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

app.listen(PORT, () => {
  console.log(`back running on ${PORT} !`);
});
