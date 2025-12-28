@echo off
echo 🚀 Installing Requirements Globally...
cd backend
pip install -r requirements.txt
cd ..
cd frontend
call npm install
cd ..
echo ✅ Global Setup Complete!
pause