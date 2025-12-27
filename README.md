🔮 VibeVision AI

VibeVision AI is a real-time, full-stack cryptocurrency market predictor built for the Hackathon.

Unlike static dashboards, VibeVision uses a TensorFlow Neural Network to analyze live market data (RSI, Bollinger Bands, EMA, MACD) and generate instant "CALL" or "PUT" signals with a confidence score. It features a complete credit-based economy simulation with a secure payment gateway integration.

🚀 Key Features

🧠 Real-Time AI Inference: Fetches live market data via yfinance, calculates technical indicators using pandas_ta, and runs them through a trained .h5 Deep Learning model.

💎 VibeEconomy: Implements a token-based system. Users start with 50 credits and spend them on predictions.

💳 VibeVision Pay: A fully functional mock payment gateway (Glassmorphism UI) to "top up" credits securely.

🔐 Secure Authentication: Complete Login/Signup system with SHA-256 password hashing and SQLite storage.

⚡ "Vibe" UI: A premium, Dark/Cyberpunk interface built with React and CSS Glassmorphism.

🛠️ Tech Stack

Frontend

React.js (Hooks, State Management)

CSS3 (Animations, Glassmorphism, Responsive Grid)

Fetch API (Async/Await for backend communication)

Backend

Python (Flask) (REST API)

TensorFlow / Keras (AI Model Inference)

YFinance (Live Market Data Stream)

Pandas-TA (Technical Analysis Feature Engineering)

SQLite (Database for Users & Credits)

⚙️ Installation & Setup

Follow these steps to run the project locally.

Prerequisites

Node.js & npm installed.

Python 3.8+ installed.

1. Backend Setup

Navigate to the backend folder and install the Python dependencies.

cd backend

# Install required libraries
pip install -r requirements.txt

# Start the Flask Server
python app.py



The server will start on http://localhost:5000.

2. Frontend Setup

Open a new terminal, navigate to the frontend folder, and start the React app.

cd frontend

# Install Node modules
npm install

# Start the Development Server
npm start



The application will open automatically at http://localhost:3000.

🕹️ How to Use

Register: Create a new account. You will receive a 50 Diamond Welcome Bonus.

Select Asset: Choose a crypto coin (BTC, ETH, SOL, etc.) from the dropdown.

Check Vibe: Click the purple button.

The AI analyzes the last 3 months of hourly data.

It calculates trends (MACD, RSI) in real-time.

It delivers a CALL (Buy) or PUT (Sell) signal.

Top Up: Run out of credits? Click "Add Funds" to open the secure VibeVision Pay modal and simulate a transaction.

Logout: Use the red logout button to secure your session.

🧠 The AI Model

The heart of VibeVision is a Sequential Neural Network trained on 1 Year of Hourly Data for top cryptocurrencies.

Input Features:

RSI (14): Relative Strength Index

EMA Ratio: Exponential Moving Average (20/50) divergence

Bollinger Bandwidth: Volatility measurement

MACD Normal: Trend momentum

Architecture: Dense Layers with Dropout (to prevent overfitting) and Batch Normalization.

Fallback Protocol: If live data shapes mismatch (e.g., API changes), the system automatically switches to a robust Algorithmic Trend-Following logic so the service never fails.

📂 Project Structure

vibe-vision-ai/
├── backend/
│   ├── app.py                 # Main Flask Application
│   ├── database.db            # SQLite User Database (Auto-generated)
│   ├── universal_vibe_model.h5 # Trained TensorFlow Model
│   ├── scaler.pkl             # Scikit-learn Data Scaler
│   └── requirements.txt       # Python Dependencies
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js             # Main React Logic
│   │   ├── App.css            # Cyberpunk Styling
│   │   └── index.js           # Entry Point
│   └── package.json           # Node Dependencies
│
└── README.md                  # Documentation



🛡️ License

This project is created for educational purposes and hackathon demonstration.
Disclaimer: This is not financial advice. The AI predictions are for entertainment only.

Made with 💜 by Hitesh Namrani
