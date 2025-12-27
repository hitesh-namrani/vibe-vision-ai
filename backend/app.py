from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import joblib
import yfinance as yf
import pandas as pd
import pandas_ta as ta
import numpy as np
import sqlite3
import time
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# --- 1. SETUP DATABASE ---
def init_db():
    with sqlite3.connect("database.db") as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS users (
                username TEXT PRIMARY KEY,
                password_hash TEXT,
                credits INTEGER DEFAULT 0
            )
        """)
init_db()

# --- 2. LOAD AI MODEL ---
model = None
scaler = None

try:
    model = tf.keras.models.load_model("universal_vibe_model.h5")
    scaler = joblib.load("scaler.pkl")
    print(f"✅ AI Loaded! Expected Features: 4") 
except Exception as e:
    print(f"⚠️ Critical AI Error: {e}")

# --- 3. AUTH ROUTES ---
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    hashed_pw = generate_password_hash(data.get('password'))
    try:
        with sqlite3.connect("database.db") as conn:
            conn.execute("INSERT INTO users VALUES (?, ?, ?)", (data.get('username'), hashed_pw, 50))
        return jsonify({"username": data.get('username'), "credits": 50})
    except:
        return jsonify({"error": "Username taken"}), 409

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    with sqlite3.connect("database.db") as conn:
        res = conn.execute("SELECT password_hash, credits FROM users WHERE username = ?", (data.get('username'),)).fetchone()
        if res and check_password_hash(res[0], data.get('password')):
            return jsonify({"username": data.get('username'), "credits": res[1]})
    return jsonify({"error": "Invalid"}), 401

@app.route('/mock_add_funds', methods=['POST'])
def mock_add_funds():
    data = request.json
    with sqlite3.connect("database.db") as conn:
        conn.execute("UPDATE users SET credits = credits + ? WHERE username = ?", (data.get('amount'), data.get('username')))
    return jsonify({"status": "success"})

# --- 4. PREDICTION ROUTE (MATCHING YOUR TRAINING SCRIPT) ---
@app.route('/predict', methods=['GET'])
def predict():
    username = request.args.get('username')
    coin_symbol = request.args.get('coin', 'BTC-USD')
    
    # Check Credits
    with sqlite3.connect("database.db") as conn:
        res = conn.execute("SELECT credits FROM users WHERE username = ?", (username,)).fetchone()
        if not res or res[0] < 2: return jsonify({"error": "Insufficient Credits"}), 402
        conn.execute("UPDATE users SET credits = credits - 2 WHERE username = ?", (username,))
        new_balance = res[0] - 2

    try:
        # A. Fetch Data (Need ~2 months for EMA_50 to warm up)
        print(f"Fetching {coin_symbol}...")
        df = yf.download(coin_symbol, period="3mo", interval="1h", progress=False)
        
        # Flatten Multi-Index Columns (Fixes the .str error)
        if isinstance(df.columns, pd.MultiIndex):
            df.columns = df.columns.get_level_values(0)

        if df.empty: return jsonify({"error": "No Data"}), 500

        # B. FEATURE ENGINEERING (Must match Training Script exactly!)
        
        # 1. RSI
        df['RSI'] = df.ta.rsi(close=df['Close'], length=14)

        # 2. EMA Ratio
        df['EMA_20'] = df.ta.ema(close=df['Close'], length=20)
        df['EMA_50'] = df.ta.ema(close=df['Close'], length=50)
        df['EMA_Ratio'] = df['EMA_20'] / df['EMA_50']

        # 3. Bollinger Bands (Width)
        bb = df.ta.bbands(close=df['Close'], length=20, std=2)
        if bb is not None:
             # Rename columns to match standard output
            bb.columns = ['Lower', 'Mid', 'Upper', 'Bandwidth', 'Percent']
            df['BB_Width'] = bb['Bandwidth']
        else:
            df['BB_Width'] = 0

        # 4. MACD Norm
        macd = df.ta.macd(close=df['Close'], fast=12, slow=26, signal=9)
        if macd is not None:
            macd.columns = ['MACD', 'Histogram', 'Signal']
            df['MACD_Norm'] = macd['MACD'] / df['Close']
        else:
            df['MACD_Norm'] = 0

        # Clean NaN values
        df.dropna(inplace=True)

        # C. SELECT EXACT FEATURES
        # Your training script used these 4 features in this order:
        feature_cols = ['RSI', 'EMA_Ratio', 'BB_Width', 'MACD_Norm']
        
        # Get the very last row (Live Market State)
        last_row = df[feature_cols].tail(1).values
        current_price = float(df['Close'].iloc[-1])

        # D. AI PREDICTION
        if model and scaler:
            # Scale inputs (Using the loaded scaler)
            scaled_input = scaler.transform(last_row)
            
            # Predict
            print("🧠 Running Real AI Model...")
            prediction = model.predict(scaled_input)[0][0]
            
            # Interpret (Sigmoid 0-1)
            if prediction > 0.5:
                signal = "CALL 🚀"
                confidence = prediction * 100
            else:
                signal = "PUT 📉"
                confidence = (1 - prediction) * 100
        else:
            # Fallback (Should not happen if files are present)
            signal = "NEUTRAL 😐"
            confidence = 0

        return jsonify({
            "coin": coin_symbol,
            "signal": signal,
            "confidence": f"{confidence:.1f}%",
            "price": current_price,
            "credits_left": new_balance
        })

    except Exception as e:
        print(f"Error: {e}")
        # Graceful error handling for demo
        return jsonify({
            "coin": coin_symbol,
            "signal": "HOLD ✋",
            "confidence": "50%", 
            "price": 0,
            "error": "Calculation Error"
        })

if __name__ == '__main__':
    app.run(debug=True, port=5000)