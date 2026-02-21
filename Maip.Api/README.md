# Maip.Api (.NET 10)

The spatial intelligence engine for Maip.

## Core Services

### 🔍 GeminiService
Handles semantic refinement of user queries. It translates natural language ("quiet spots") into a list of searchable tags and categories.

### 📍 SpatialService
Uses `NetTopologySuite` for high-precision geographical calculations. It implements the "Near and Far" logic based on proximity to the user's focus point.

### 🛣️ SearchController
Exposes the modern REST API:
- `GET /api/search?query={query}&lat={lat}&lng={lng}`

## Dependencies
- `Google.GenAI` (Custom HttpClient implementation)
- `NetTopologySuite`
- `Microsoft.EntityFrameworkCore.SqlServer.NetTopologySuite`
