@echo off
echo 🔮 Starting VibeVision AI Globally...
start "Backend" cmd /k "cd backend && python app.py"
start "Frontend" cmd /k "cd frontend && npm start"