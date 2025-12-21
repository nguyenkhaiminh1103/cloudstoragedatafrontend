import api from "./api";

function Login() {
  const login = async () => {
    const res = await api.post("/login", null, {
      params: {
        email: "test@gmail.com",
        password: "123456"
      }
    });
    localStorage.setItem("token", res.data.token);
    alert("Đăng nhập thành công");
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;

