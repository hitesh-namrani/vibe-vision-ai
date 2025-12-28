# 🔮 Vibe Crypto Bot — VibeVision AI

## Real-Time Crypto Market Prediction & Vibe Analysis

**VibeVision AI** is a full-stack cryptocurrency prediction system built for hackathon demonstration.  
It combines live market data, technical analysis, and a trained TensorFlow neural network to generate **CALL / PUT signals with confidence** — all wrapped inside a cyberpunk-styled React interface.

---

## 🚀 Key Features

### 🧠 AI Prediction Engine
- Live market data from **yfinance**
- Indicators via **pandas_ta** (RSI, EMA, MACD, Bollinger Bands, etc.)
- Deep learning inference using `universal_vibe_model.h5`

### 💎 Vibe Economy Simulation
- Users start with credits
- Spend credits to generate predictions
- Mock payment system to top-up credits

### 🔐 Authentication System
- Secure login / signup
- Password hashing
- SQLite database

### ⚡ Vibe UI
- Cyberpunk / Neon Glassmorphism
- Built with React

---

## 🛠️ Tech Stack

| Layer     | Technology            |
|-----------|-----------------------|
| Frontend  | React.js, CSS3        |
| Backend   | Python, Flask         |
| ML        | TensorFlow / Keras    |
| Database  | SQLite                |
| Data      | yfinance, pandas-ta   |

---

## 📂 Project Structure
```
vibe-crypto-bot/
│
├── backend/
│ ├── app.py
│ ├── database.db
│ ├── universal_vibe_model.h5
│ ├── scaler.pkl
│ └── requirements.txt
│
├── frontend/
│ ├── node_modules/
│ ├── public/
│ ├── src/
│ ├── package.json
│ └── package-lock.json
│
├── training/
│ └── model_training.ipynb
│
├── setup.bat # One-click environment setup
├── run.bat # One-click full project launcher
├── .gitignore
└── README.md
```

---

## ⚙️ How to Run

### 🧪 Method 1 — Manual Setup

#### Backend
```
cd backend
pip install -r requirements.txt
python app.py
```
Server starts at: http://localhost:5000

#### Frontend (new terminal)
```
cd frontend
npm install
npm start
```
App opens at: http://localhost:3000
### ⚡ Method 2 — One-Click Launch (Recommended)
#### Step 1 — Setup (Run Once)

Double-click:

setup.bat

#### Step 2 — Run Project

Double-click:

run.bat


✔ Backend launches
✔ Frontend launches
✔ Browser opens automatically

## 🕹️ Usage Guide

Register — Create an account and receive welcome credits

Predict — Select BTC / ETH / SOL → Click Check Vibe

Top Up — Use mock payment system to add credits

Logout — Secure your session anytime

## 🛡️ Disclaimer

This project is created only for educational and hackathon demonstration.
Predictions are not financial advice.

## 💜 Made with passion by Hitesh Namrani