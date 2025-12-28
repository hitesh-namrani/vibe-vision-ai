import React, { useState } from 'react';
import './App.css';

import React, { useState } from 'react';
import './App.css';
import { API_BASE_URL } from './config'; // <--- NEW IMPORT

// const BACKEND_URL = "http://localhost:5000"; // <--- DELETE THIS LINE

function App() {
  const BACKEND_URL = API_BASE_URL; // <--- ADD THIS (Keeps your existing code working)

  // ... rest of your code stays exactly the same ...
function App() {
  // --- STATE MANAGEMENT ---
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(0);
  const [prediction, setPrediction] = useState(null);
  const [msg, setMsg] = useState(null);

  // Auth States
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // App Features States
  const [selectedCoin, setSelectedCoin] = useState("BTC-USD");
  const [showPayModal, setShowPayModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [amount, setAmount] = useState(100);

  const coins = [
    { label: "Bitcoin (BTC)", value: "BTC-USD" },
    { label: "Ethereum (ETH)", value: "ETH-USD" },
    { label: "Solana (SOL)", value: "SOL-USD" },
    { label: "Binance Coin (BNB)", value: "BNB-USD" },
    { label: "Ripple (XRP)", value: "XRP-USD" },
    { label: "Dogecoin (DOGE)", value: "DOGE-USD" }
  ];

  // --- 1. LOGOUT ---
  const handleLogout = () => {
    setUser(null);
    setCredits(0);
    setPrediction(null);
    setMsg(null);
    setUsername("");
    setPassword("");
  };

  // --- 2. AUTHENTICATION ---
  const handleAuth = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    const endpoint = isSignup ? "/register" : "/login";

    try {
      const res = await fetch(`${BACKEND_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (res.ok) {
        setUser(data.username);
        setCredits(data.credits);
      } else {
        setMsg(data.error || "Authentication Failed");
      }
    } catch (err) {
      setMsg("Server Offline. Check Python Console.");
    }
    setLoading(false);
  };

  // --- 3. MOCK PAYMENT (VibeVision Pay) ---
  const handleMockPayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const res = await fetch(`${BACKEND_URL}/mock_add_funds`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, amount: parseInt(amount) })
      });

      if (res.ok) {
        setCredits(prev => prev + parseInt(amount));
        setMsg(`Success! +${amount} Credits Added 💎`);
        setShowPayModal(false); // Close Modal
      } else {
        setMsg("Transaction Failed");
      }
    } catch (err) {
      setMsg("Payment Gateway Error");
    }
    setProcessing(false);
  };

  // --- 4. GET PREDICTION ---
  const getVibe = async () => {
    if (credits < 2) {
      setMsg("Insufficient Credits! Please Top Up.");
      return;
    }
    
    setLoading(true);
    setMsg(null);
    setPrediction(null);

    try {
      const res = await fetch(`${BACKEND_URL}/predict?username=${user}&coin=${selectedCoin}`);
      
      if (res.status === 402) {
        setMsg("Insufficient Credits! Please Top Up.");
      } else {
        const data = await res.json();
        setPrediction(data);
        setCredits(data.credits_left);
      }
    } catch (err) {
      setMsg("AI Model is waking up... Try again in 10s.");
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      
      {/* --- PAYMENT MODAL (OVERLAY) --- */}
      {showPayModal && (
        <div className="modal-overlay">
          <div className="payment-card">
            <div className="card-header">
              {/* RENAMED HERE */}
              <h3>VibeVision Pay</h3>
              <div className="card-logo">VISA</div>
            </div>
            
            <form onSubmit={handleMockPayment}>
              <div className="amount-group">
                <label>Amount (INR)</label>
                <input 
                  type="number" 
                  className="amount-input"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="10"
                />
              </div>

              <div className="card-details">
                <input type="text" value="4242 4242 4242 4242" className="pay-input" readOnly />
                <div className="row">
                  <input type="text" placeholder="MM/YY" className="pay-input half" required />
                  <input type="text" placeholder="CVV" className="pay-input half" required />
                </div>
              </div>

              <button type="submit" className="pay-btn" disabled={processing}>
                {processing ? "Processing..." : `Pay ₹${amount}`}
              </button>
            </form>
            
            <button className="close-btn" onClick={() => setShowPayModal(false)}>
              Cancel Transaction
            </button>
          </div>
        </div>
      )}

      {/* --- MAIN GLASS CARD --- */}
      <div className="glass-card">
        
        {!user ? (
          /* AUTH SCREEN */
          <div className="auth-box">
             {/* RENAMED HERE */}
             <h1>🔮 VibeVision AI</h1>
             <p>{isSignup ? "Join the Inner Circle" : "Welcome Back"}</p>
             
             <form onSubmit={handleAuth} className="auth-form">
               <input 
                 type="text" 
                 placeholder="Username" 
                 className="vibe-input" 
                 value={username}
                 onChange={e=>setUsername(e.target.value)} 
                 required
               />
               <input 
                 type="password" 
                 placeholder="Password" 
                 className="vibe-input" 
                 value={password}
                 onChange={e=>setPassword(e.target.value)} 
                 required
               />
               <button className="login-btn" disabled={loading}>
                 {loading ? "Initializing..." : (isSignup ? "Create ID" : "Enter System")}
               </button>
             </form>

             <div className="toggle" onClick={()=> {setIsSignup(!isSignup); setMsg(null)}}>
               {isSignup ? "Already have an account? Login" : "No account? Create one"}
             </div>
             
             {msg && <div className="error">{msg}</div>}
          </div>
        ) : (
          /* DASHBOARD SCREEN */
          <>
            <div className="header">
               <div className="user-info">
                 <h2>👋 {user}</h2>
                 <div className="credits-pill">💎 {credits}</div>
               </div>
               
               <button onClick={handleLogout} className="logout-btn">
                 LOGOUT
               </button>
            </div>

            <div className="coin-selector">
              <label>Target Asset</label>
              <select value={selectedCoin} onChange={(e) => setSelectedCoin(e.target.value)} className="vibe-select">
                {coins.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>

            <button 
              onClick={getVibe} 
              className="action-btn"
              disabled={loading}
            >
              {loading ? "Scanning Blockchain..." : "Check Vibe (2 Credits)"}
            </button>
            
            <button onClick={() => setShowPayModal(true)} className="topup-btn">
              + Add Funds
            </button>

            {/* PREDICTION RESULT */}
            {prediction && (
                <div className="result-card animate-pop">
                    <div className="coin-badge">{prediction.coin}</div>
                    
                    <div className={`signal ${prediction.signal.includes("CALL") ? "green" : "red"}`}>
                        {prediction.signal}
                    </div>
                    
                    <div className="stats">
                      <span>Confidence: <strong>{prediction.confidence}</strong></span>
                      <span>Price: <strong>${prediction.price.toLocaleString()}</strong></span>
                    </div>
                </div>
            )}

            {msg && <div className="toast">{msg}</div>}
          </>
        )}
      </div>
    </div>
  );
}

export default App;