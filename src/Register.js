import api from "./api";

function Register() {
  const register = async () => {
    await api.post("/register", null, {
      params: {
        email: "test@gmail.com",
        password: "123456"
      }
    });
    alert("Đăng ký thành công");
  };

  return <button onClick={register}>Register</button>;
}

export default Register;
