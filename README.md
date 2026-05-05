# 🔍 Pokémon Explorer
### This task is included in my frontend training program at Asal.

#### A modern, interactive Pokémon web application built with **React** and **TypeScript**. Explore the vast world of Pokémon, search for your favorites, and manage a personalized profile with ratings and reviews.
---

## 🛠 Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge)
![Biome](https://img.shields.io/badge/Biome-F7B93E?style=for-the-badge&logo=biome&logoColor=black)
![Husky](https://img.shields.io/badge/Husky-000000?style=for-the-badge)

---

## 🚀 Key Features

### 🐾 Core Exploration
*   **Dynamic Grid Layout:** High-quality Pokémon cards with images and names.
*   **Detailed Views:** Dedicated pages for comprehensive Pokémon stats and info.
*   **Pokémon of the Day:** A random highlight on the main page that refreshes daily.

### 🔍 Advanced Search & Filtering
*   **Fuzzy Search:** Find Pokémon effortlessly even with partial names.

### 👤 User Experience
*   **Favorites System:** Save your top Pokémon to a Favorite personal list.
*   **Ratings & Reviews:** Share your thoughts and rate different entries.
*   **Personal Profile:** Manage all your interactions in one dedicated space.
*   **Data Persistence:** Powered by `localStorage` to keep your data safe after refresh. It could be easily moved to DB later since use Hex Arch.

---

## 🏗 Architecture & Principles

This project is built with scalability and clean code in mind:
*   **SOLID Principles:** Especially *Interface Segregation* and *Dependency Inversion*.
*   **Hexagonal Architecture:** Using *Ports & Adapters* pattern to decouple core logic from external dependencies (like LocalStorage).
*   **State Management:** Optimized using **Zustand** for client state and **React Query** for server state.


---
## 📦 API

- Data is fetched from: https://pokeapi.co/
- 
---

## ⚙️ Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run development server:**
    ```bash
    npm run dev
    ```
---

