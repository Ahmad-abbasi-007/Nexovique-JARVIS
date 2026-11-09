# Nexovique JARVIS

Nexovique JARVIS is a React/Vite desktop assistant with an Electron shell and an Express API.

## Requirements

- Node.js and npm
- MongoDB connection string
- Gemini API key

## Setup

From this directory, install the frontend and backend dependencies:

```powershell
npm install
```

For development, create `server\.env` from the example if it does not already exist, then set the required values:

```dotenv
MONGO_URI=mongodb://127.0.0.1:27017/jarvis
GEMINI_API_KEY=your-gemini-api-key
PORT=5000
```

Keep `server\.env` private. It is excluded from Git and packaged application files.
For an installed Windows app, place the same settings in `%APPDATA%\JARVIS AI\.env`.

## Run

```powershell
npm run start
```

This starts the Vite development server and the Electron application. To run only the website, use `npm run dev`. The JARVIS screen is available at `http://localhost:5173/#/jarvis`.

## Validate and package

```powershell
npm run lint
npm run build
npm run dist
```
