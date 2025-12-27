# 🔮 VibeVision AI

**Real-Time Crypto Market Prediction & Vibe Analysis**

VibeVision AI is a full-stack cryptocurrency market predictor built for the Hackathon. Unlike static dashboards, it uses a **TensorFlow Neural Network** to analyze live market data (RSI, Bollinger Bands, EMA, MACD) and generate instant "CALL" or "PUT" signals with a confidence score.

It features a complete credit-based economy simulation with secure mock payments.

---

## 🚀 Key Features

* **🧠 Real-Time AI:** Fetches live data via `yfinance`, calculates indicators via `pandas_ta`, and runs inference on a `.h5` deep learning model.
* **💎 VibeEconomy:** A token system where users start with 50 credits and spend them on predictions.
* **💳 VibeVision Pay:** A functional mock payment gateway to "top up" credits.
* **🔐 Secure Auth:** Login/Signup system with password hashing and SQLite storage.
* **⚡ Vibe UI:** Cyberpunk/Neon aesthetic built with React.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, CSS3 (Glassmorphism)
* **Backend:** Python (Flask), TensorFlow/Keras, SQLite
* **Data:** YFinance (Live Stream), Pandas-TA (Analysis)

---

## ⚙️ How to Run

### 1. Backend Setup

Navigate to the backend folder, install dependencies, and start the server.

```bash
cd backend
pip install -r requirements.txt
python app.py
```
Note: The server will start on http://localhost:5000.
2. Frontend Setup
Open a new terminal, navigate to the frontend folder, install dependencies, and start the app.

```Bash

cd frontend
npm install
npm start
```
Note: The application will open automatically at http://localhost:3000.

🕹️ Usage Guide
Register: Create a new account to receive your 50 Diamond Welcome Bonus.

Predict: Select a coin (BTC, ETH, SOL) from the dropdown and click Check Vibe.

The AI analyzes the last 3 months of hourly data.

It gives a Buy (CALL) or Sell (PUT) signal.

Top Up: Click Add Funds to simulate a secure payment via VibeVision Pay.

Logout: Secure your session using the red logout button in the header.

📂 Project Structure
```
vibe-vision-ai/
├── backend/
│   ├── app.py                 # Main Flask Application (API & Logic)
│   ├── database.db            # SQLite User Database (Auto-generated)
│   ├── universal_vibe_model.h5 # Trained TensorFlow Neural Network
│   ├── scaler.pkl             # Scikit-learn Data Scaler
│   ├── .env                   # Environment Secrets (API Keys)
│   └── requirements.txt       # Python Dependencies
│
├── frontend/
│   ├── public/
│   │   └── index.html         # HTML Entry Point
│   ├── src/
│   │   ├── App.js             # Main React Component & Logic
│   │   ├── App.css            # Cyberpunk/Glassmorphism Styling
│   │   └── index.js           # React DOM Renderer
│   ├── .env                   # Frontend Environment Variables
│   └── package.json           # Node Dependencies & Scripts
│
└── README.md                  # Project Documentation
```
🛡️ Disclaimer
This project is created for educational purposes and hackathon demonstration only. The AI predictions are for entertainment and do not constitute financial advice.

Made with 💜 by Hitesh Namrani
