# Maip: AI-Powered Map Search Extension 🌍✨

Maip (Map + AI) is a next-generation map exploration tool that replaces static keyword searches with semantic, AI-driven spatial intelligence. It enables users to explore their surroundings using natural language and provides unique "Near and Far" feature detection.

## 🚀 Key Features

- **Semantic AI Search**: Describe what you're looking for (e.g., *"A quiet cafe with natural light away from main roads"*) rather than just searching for keywords.
- **Near & Far Detection**: Intelligent spatial grouping that helps you discover immediate local spots vs. regional attractions.
- **Premium Visualization**: High-performance vector maps using **MapLibre GL** and **OpenFreeMap** for a fluid, high-resolution experience.
- **Glassmorphic UI**: A modern, premium interface built with Angular 19.

## 🏗️ Technical Architecture

- **Frontend**: [Angular 19](Maip.Web/) - Featuring reactive state management with Signals and modern control flow.
- **Backend**: [.NET 10 Web API](Maip.Api/) - High-performance spatial processing with NetTopologySuite.
- **AI Engine**: Google Gemini 1.5 Flash - Semantic intent refinement.
- **Maps**: MapLibre GL JS + OpenFreeMap (Free Vector Tiles).

## 🛠️ Getting Started

### Prerequisites
- .NET 10 SDK
- Node.js (v20+)
- Angular CLI
- Google Gemini API Key

### Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Sri-Ram-Saran/Maip.git
   cd Maip
   ```

2. **Backend Configuration**
   - Navigate to `Maip.Api`.
   - Update `appsettings.json` with your Gemini API Key:
     ```json
     "Gemini": {
       "ApiKey": "YOUR_KEY_HERE"
     }
     ```
   - Run the API:
     ```bash
     dotnet run
     ```

3. **Frontend Configuration**
   - Navigate to `Maip.Web`.
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the dev server:
     ```bash
     npm start
     ```

## 📜 License
This project is open-source and free to use.
