import React, { useState } from "react";
import api from "./api";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/register", null, { params: { email, password } });
      alert("Đăng ký thành công");
      onRegister && onRegister();
    } catch (err) {
      alert("Lỗi đăng ký");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={register}>
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
        {loading ? "Creating..." : "Create account"}
      </button>
    </form>
  );
}

export default Register;
