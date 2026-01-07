# SmartChef, Your Personal Recipe Explorer

<p align="center">
  <img src="front/src/assets/logo.png" alt="SmartChef Logo" width="150"/>
</p>

<p align="center">
  <em>Transform your everyday ingredients into delicious meals</em>
</p>

---

## 📖 Overview

SmartChef is a **single-page application** that helps you discover recipes based on ingredients you already have at home. No more wondering what to cook or wasting food in your fridge: simply input what you have and SmartChef will find the best recipes for you.

### 🎯 Why SmartChef?

- **Reduce food waste**: use ingredients before they expire
- **Save time**: no need to plan grocery shopping for every meal
- **Discover new recipes**: get creative with what you already own
- **Smart matching**: intelligent scoring system ranks recipes by relevance

## ✨ Key Features

- **🔍 Smart Search**: finds recipes using 3 to 10 ingredients with fuzzy matching support.
- **📊 Dynamic Scoring**: 0-100% relevance score representing the percentage of matching ingredients relative to the user's input, optimized by an 80% coverage ratio. Ensures recipes with many ingredients aren't unfairly penalized.
- **⚖️ Smart Filtering**: shows top 30 results with a minimum of 2 matching ingredients.
- **🚦 Visual Feedback**: color-coded badges (Excellent/Good/Partial) and progress bars.
- **📖 Full Guides**: step-by-step instructions, images, and precise quantities.

## 🎬 Quick Preview

<p align="center">
  <img src="https://github.com/user-attachments/assets/a44d7d40-4f75-4f66-8b63-f1f4d8926b16" alt="SmartChef Quick Preview" width="100%" />
</p>

---

## 🛠️ Tech Stack

| Category             | Technology                          |
| :------------------- | :---------------------------------- |
| **Frontend**         | React (TypeScript)                  |
| **State Management** | Redux Toolkit                       |
| **UI Library**       | Material-UI (MUI)                   |
| **Styling**          | Emotion (CSS-in-JS)                 |
| **Backend**          | Node.js, Express                    |
| **CI**               | Github Actions                      |
| **Cloud**            | Cloudinary (images)                 |
| **Deployment**       | Vercel (Frontend), Render (Backend) |
| **Code Quality**     | Husky, ESLint, Prettier             |

**Data Source:** [Food Ingredients and Recipe Dataset with Images](https://www.kaggle.com/datasets/pes12017000148/food-ingredients-and-recipe-dataset-with-images)

---

## 🤖 Behind the Scenes: NLP-Powered Ingredient Extraction

SmartChef uses **Named Entity Recognition (NER)** to intelligently parse recipe ingredients:

- **CRF Model** (Conditional Random Fields) trained to extract ingredient names from raw text
- **Fuzzy Matching** (RapidFuzz) to handle typos and variations (e.g., "tomatoe" → "tomato")
- **Image Association**: automated matching between recipes and images using token-based similarity scoring

---

## 📬 Contact

**Lucrece Fodouop**

Any questions or suggestions? Feel free to reach me at: [lfodouop@gmail.com](mailto:lfodouop@gmail.com).

Thank you for taking the time to explore **SmartChef**! 🍳

---

---

> [!NOTE]
>
> ### 🔍 Limitations & Perspectives
>
> SmartChef is a functional application.  
> However, as a data-driven project, it comes with certain limitations that are important to acknowledge.
>
> The application relies on an external recipe dataset, which introduces constraints in terms of data quality and structure.  
> Some recipes may contain minor inconsistencies, parsing imperfections, or missing information (e.g. imprecise quantities, cooking times, or servings). These limitations are inherent to the source data rather than the application logic itself.
>
> The current implementation prioritizes a seamless user experience, focusing on intuitive ingredient input, real-time relevance scoring, and visual feedback. To maintain this focus on core usability, some secondary features such as multi-language support or advanced dietary filtering remain intentionally limited in this version.
>
> From a broader perspective, the project can be extended in multiple directions, whether through richer data, improved content validation, internationalization, or additional user-oriented features.
