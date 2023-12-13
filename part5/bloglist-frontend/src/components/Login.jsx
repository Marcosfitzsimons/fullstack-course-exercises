import { useState } from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";
import Notification from "./Notification";

const Login = ({ setUser, setIsLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h1>Welcome back!</h1>
      <h2>Log in to see your blogs.</h2>
      <form onSubmit={handleOnSubmit}>
        <Notification type="error" message={errorMessage} />
        <div>
          {" "}
          <label htmlFor="username">username</label>
          <input
            type="text"
            value={username}
            name="username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />{" "}
        </div>{" "}
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            value={password}
            name="password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />{" "}
        </div>{" "}
        <button type="submit" id="login-button">
          login
        </button>
        <button type="button" onClick={() => setIsLogin(false)}>
          cancel
        </button>
      </form>
    </div>
  );
};

export default Login;
