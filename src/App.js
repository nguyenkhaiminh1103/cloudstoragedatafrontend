import React, { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>CloudStorage</h1>
        <p className="subtitle">Upload and share files securely</p>
        <div className="auth-area">
          {token ? (
            <button className="btn" onClick={() => setToken(null)}>
              Logout
            </button>
          ) : null}
        </div>
      </header>

      <main className="app-main">
        {!token ? (
          <div className="panes">
            <div className="pane">
              <h2>Create account</h2>
              <Register onRegister={() => {}} />
            </div>
            <div className="pane">
              <h2>Sign in</h2>
              <Login onLogin={(t) => setToken(t)} />
            </div>
          </div>
        ) : (
          <Dashboard />
        )}
      </main>

      <footer className="app-footer">Simple demo • Not for production use</footer>
    </div>
  );
}

export default App;
