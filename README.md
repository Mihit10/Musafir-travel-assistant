# 🗺️ Musafir: AI-Powered Travel for Social Good

### 🌱 An intelligent travel platform that connects you with local communities.

Planning trips is easy. Making them meaningful isn’t. Musafir is not just a travel app—it’s an AI-powered platform that learns your preferences and builds personalized itineraries that actually make sense for you, all while uplifting local economies.

This project was created to turn travel into a tool for social good.

---

## 🔹 Problem Statement

**How can we build an AI-powered travel platform that delivers smart, personalized itineraries while actively integrating and uplifting local communities?**

Our goal was to:

✅ Connect tourists with grassroots-level service providers like vendors, artisans, guides, and homestays.
✅ Ensure fair visibility, direct access, and equitable income distribution for local providers.
✅ Promote sustainable tourism by factoring in real-time data, weather, and eco-friendly options.
✅ Turn travel into a positive force by highlighting lesser-known destinations.

---

## 🌟 Our Solution: Musafir

Musafir is an AI-powered platform that builds a travel ecosystem to support local communities, small vendors, and eco-friendly tourism. It's a space where travelers, locals, and tech come together to reshape how we explore.

### 🔹 Key Features
- 🧠 **Smart Itinerary Planning:** A multi-agent AI system generates optimized, day-wise itineraries considering user preferences, distance, and optimal visiting times.
- 🤝 **Community Integration:** Features a database of local vendors, certified guides, and community-run homestays to promote sustainable tourism and authentic experiences.
- 🗺️ **Interactive Map View:** Visualizes the daily travel plan on an interactive Mapbox interface, showing routes and points of interest.
- 🤖 **AI Travel Assistant:** A built-in chatbot powered by Google's Gemini answers questions and provides real-time, context-aware recommendations.
- 🎨 **Dynamic Themed UI:** The user interface and color scheme adapt based on the selected destination for a more immersive feel.
- 🏡 **Direct Vendor & Homestay Listings:** Includes dedicated sections for users to browse and connect directly with local businesses and homestay owners.

---

## 💻 Tech Stack

| Area      | Technology |
|------------|---------|
| 🧠 **AI/ML & Agents** | Generative AI (Gemini), Machine Learning, AI Agents (Agno AI) |
| ⚛️ **Frontend** | Next.js, React, TypeScript, Tailwind CSS, Shadcn/UI, Mapbox GL, Framer Motion |
| 🐍 **Backend** | Node.js, Express.js, Python, Flask |
| 📦 **Database** | PostgreSQL |
| 🔧 **Tooling** | Selenium, Web Scraping |

---

## 📺 Demo

[![Watch the Demo on YouTube](https://img.youtube.com/vi/kauukh8hu1k/0.jpg)](https://www.youtube.com/watch?v=kauukh8hu1k)

---

## 👥 Contributors

- **Mihit Singasane** – [GitHub](https://github.com/Mihit10)
- **Ria Talsania** – [GitHub](https://github.com/05q10)
- **Ved Thakker** – [GitHub](https://github.com/godfather979)
- **Vedant Kulkarni** – [GitHub](https://github.com/Vedant-8)

---

## 📌 Getting Started

### 🔧 Prerequisites
- Node.js (v18 or later recommended)
- Python 3.x
- PostgreSQL

### 🚀 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/musafir-travel-assistant.git](https://github.com/your-username/musafir-travel-assistant.git)
    cd musafir-travel-assistant
    ```

2.  **Setup the Frontend (Client):**
    ```bash
    cd client
    npm install
    npm run dev
    ```
    The frontend will be running at `http://localhost:3000`.

3.  **Setup the Backend Servers:**

    * **Node.js Database Server:**
        ```bash
        cd backend/node\ db\ server
        npm install
        npm start
        ```
        This server handles interactions with the PostgreSQL database for vendors, guides, etc.

    * **Node.js Trip Server:**
        ```bash
        cd backend/node\ trip\ server
        npm install
        npm start
        ```
        This server manages the AI agent interactions and itinerary generation.

4.  **Configure Environment Variables:**
    Create a `.env` file in the appropriate directories (`client`, `backend/node db server`) and add your API keys for Mapbox, Gemini, and your PostgreSQL connection details.
