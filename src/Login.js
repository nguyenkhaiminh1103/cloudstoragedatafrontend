import React, { useState } from "react";
import api from "./api";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/login", null, {
        params: { email, password },
      });
      const token = res.data.token;
      if (token) {
        onLogin && onLogin(token);
        alert("Đăng nhập thành công");
      } else {
        alert("Đăng nhập thất bại");
      }
    } catch (err) {
      alert("Lỗi đăng nhập");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={login}>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button className="btn" type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}

export default Login;

