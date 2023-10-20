import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleForgotPassword = () => {
    alert("The username and password must be same");
  };

  const handleLogin = () => {
    if (!username || !password) {
      alert("Enter username and password ");
    } else {
      if (username === password) {
        localStorage.setItem("isLoggedIn", true);
        props.setLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
        navigate("/");
      } else {
        alert("The username and password must be same");
      }
    }
  };
  return (
    <div className="login-form">
      <h3>Welcome to Dashboard, Login</h3>
      <label>
        Username
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleForgotPassword}>Forgot Password</button>
    </div>
  );
}
export default Login;
