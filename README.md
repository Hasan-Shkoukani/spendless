# 🧠 SPENDLESS

**SPENDLESS** is a smart assistant web app that helps users generate realistic shopping/meal plans based on a budget **OR** estimate the total cost of a plan they've already made. It uses **Google Gemini AI** to intelligently handle budget estimation and plan generation.

---

## 🚀 Features

### 🔄 Plan Generator
- Input your **budget**, **number of days**, and **preferences** (e.g., vegetarian, likes pasta).
- Get a **meal plan** and **shopping list** tailored to your constraints.
- AI ensures results stick to the budget or explain why it can't.

### 💰 Plan to Budget
- Paste your own plan (itinerary, shopping list, notes).
- AI estimates the **total cost** with breakdown and overall price highlighted.

---

## 🛠 Tech Stack

- **Frontend**: React, JSX, CSS
- **Backend**: Node.js, Express
- **AI API**: [Google Gemini API](https://ai.google.dev)
- **Markdown Renderer**: `marked` + `DOMPurify` for safe rendering
