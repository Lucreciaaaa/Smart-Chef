# SmartChef, Your Personal Recipe Explorer

<p align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="front/src/assets/logo-on-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="front/src/assets/logo-on-light.jpg">
  <img
    src="front/src/assets/logo-on-dark.png"
    alt="SmartChef Logo"
    width="150"
  />
</picture>

</p>

<p align="center">
  <em>Transform your everyday ingredients into delicious meals.</em>
</p>

---

## 🎬 Quick Preview

<p align="center">
  <img src="https://github.com/user-attachments/assets/a44d7d40-4f75-4f66-8b63-f1f4d8926b16" alt="SmartChef Quick Preview" width="100%" />
</p>

## 📖 Overview

SmartChef is a **recipe discovery application** designed to help users decide _what to cook_ based on the ingredients they already have at home.

Instead of browsing endless recipes or planning meals around shopping lists, SmartChef focuses on a simple question:

> **“What can I cook right now?”**

By combining ingredient-based search, fuzzy matching, and a relevance scoring system, SmartChef surfaces the most realistic and useful recipes.

---

## 🎯 Why SmartChef?

- 🥕 **Reduce food waste**: use ingredients before they expire
- ⏱️ **Save time**: skip unnecessary planning
- 🍽️ **Discover new recipes**: explore dishes you wouldn't normally search for
- 🧠 **Get smart results**: recipes ranked by actual relevance

---

## ✨ Core Features

- **🔍 Ingredient-based search**  
  Search recipes using **3 to 10 ingredients**, with tolerance for typos and variations.

- **🧠 Fuzzy matching & normalization**  
  Ingredient names are matched intelligently.

- **📊 Relevance scoring (0–100%)**  
  Recipes are ranked using a custom scoring algorithm that balances:

  - ingredient coverage
  - recipe complexity
  - fairness toward recipes with longer ingredient lists

- **⚖️ Smart filtering**

  - Top 30 most relevant results
  - Minimum of 2 matching ingredients

- **🎨 Visual clarity**  
  Color-coded relevance badges and progress indicators for quick decision-making.

- **📖 Detailed recipe view**  
  Step-by-step instructions, quantities and images.

---

## 🛠️ Tech Stack

### 🎨 Frontend

- **React + TypeScript**  
  Strongly typed data models ensure consistency across recipes, ingredients, and scoring logic.

- **Redux Toolkit**  
  Centralized state management for search inputs, results, and UI state, following scalable frontend patterns.

- **Material UI (MUI)**  
  Provides an accessible and consistent design system with responsive layouts and theming.

- **Emotion**  
  Used for fine-grained component customization alongside MUI.

### ⚙️ Backend & Tooling

- **Node.js / Express**, lightweight API layer
- **Cloudinary**, optimized image hosting
- **GitHub Actions**, basic CI workflows
- **ESLint / Prettier / Husky**, code quality and consistency
- **Deployment** : Vercel (frontend), Render (backend)

**Data source:**  
[Food Ingredients and Recipe Dataset with Images (Kaggle)](https://www.kaggle.com/datasets/pes12017000148/food-ingredients-and-recipe-dataset-with-images)

---

## 🤖 Behind the Scenes : Ingredient Intelligence

SmartChef relies on **NLP-based ingredient extraction** to improve matching quality:

- **Named Entity Recognition (NER)**  
  A CRF (Conditional Random Fields) model extracts ingredient names from raw recipe text.

- **Fuzzy Matching (RapidFuzz)**  
  Handles spelling errors and semantic variations.

- **Automated image association**  
  Recipes and images are matched using token-based similarity scoring.

This preprocessing step ensures cleaner data and more reliable search results.

---

## 🧪 Testing

Basic unit tests were implemented using **Jest** and **React Testing Library** to validate component rendering.

More advanced UI testing (complex dialogs and search logic) is a natural extension for future iterations.

---

## ⚠️ Trade-offs & Design Decisions

- The backend remains intentionally lightweight to keep the focus on **frontend architecture and user experience**.
- Some dataset inconsistencies (quantities, metadata) reflect source data limitations rather than application logic.
- Advanced features such as dietary filters or internationalization were deferred to preserve clarity and performance in the core experience.

These choices reflect strategic prioritization, they represent a balance between adding features and maintaining a solid architecture.

---

## 🧠 My Approach & Takeaways

Building SmartChef highlighted several important engineering considerations:

- **Designing relevance over raw matching**  
  Developed a scoring system that accounts for recipe complexity and ingredient coverage, allowing users to quickly understand how well a recipe matches their available ingredients, even when recipes vary in the number of ingredients.

- **Managing global and local state**  
  Gained hands-on experience with Redux Toolkit for global state management, while using React hooks (especially `useState`) for local UI state, reinforcing patterns for predictable and maintainable component behavior.

- **Working with imperfect real-world data**  
  Handled real-world dataset imperfections through parsing, normalization and structured storage, including associating images with recipes and formatting recipe objects for predictable frontend use.

- **UX-driven architecture decisions**  
  Visual feedback (badges, progress indicators, filtering) directly influenced component structure and data flow, reinforcing the importance of designing UI and logic together.

---

## 📬 Contact

**Lucrece Fodouop**  
📧 [lfodouop@gmail.com](mailto:lfodouop@gmail.com)

Thanks for taking the time to explore **SmartChef** 🍳
