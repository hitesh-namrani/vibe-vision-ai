// frontend/src/config.js

const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

// ⚠️ IMPORTANT: Replace 'your-render-url' with the actual URL you get from Render later!
const RENDER_URL = "https://vibe-vision-api.onrender.com"; 

export const API_BASE_URL = isLocal ? "http://localhost:5000" : RENDER_URL;