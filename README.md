# 🧩 Pokémon Explorer

A modern Pokémon web app built with React that lets users browse, search, and interact with Pokémon data using the public PokeAPI.

---

## 🛠 Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![Husky](https://img.shields.io/badge/Husky-000000?style=for-the-badge)
![lint--staged](https://img.shields.io/badge/lint--staged-000000?style=for-the-badge)

---

## 🚀 Features

### 🔍 Core Functionality
- Grid layout displaying Pokémon cards
  - Each card includes:
    - Pokémon image
    - Pokémon name
- Click on a card to view detailed Pokémon information on a separate page

### 🔎 Search & Filtering
- Fuzzy search by Pokémon name
- Sorting options (e.g., rating, reviews)

### ⭐ User Features (Client-side MVP)
- Favorite Pokémon
- Rate Pokémon
- Add reviews
- User profile page to manage:
  - Favorites
  - Ratings
  - Reviews
- Data persisted using `localStorage`

### 🎯 Daily Highlight
- "Pokémon of the Day" feature
  - Random Pokémon highlighted on the main page
  - Updates daily

---

## 📦 API

- Data is fetched from: https://pokeapi.co/

---

## ⚙️ Setup & Installation

```bash
# Clone the repository
git clone https://github.com/your-username/pokemon-explorer.git

# Navigate into the project
cd pokemon-explorer

# Install dependencies
npm install

# Start development server
npm run dev
