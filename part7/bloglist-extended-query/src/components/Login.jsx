import { useEffect, useState } from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { useNotificationDispatch } from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import { useUserDispatch, useUserValue } from "../context/LoginContext";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useNotificationDispatch();
  const userDispatch = useUserDispatch();
  const user = useUserValue();

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      userDispatch({ type: "LOGIN", payload: user });
      navigate("/");
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch({
        type: "SHOW",
        payload: {
          content: exception.response.data.error
            ? exception.response.data.error
            : "An error has occurred, try again later",
          type: "error",
        },
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE" });
      }, 5000);
    }
  };

  useEffect(() => {
    if (user) {
      navigate(-1);
    }
  }, [user]);

  return (
    <div className="w-96 mx-auto">
      <h1 className="text-center text-2xl">Welcome back!</h1>
      <h2 className="text-center text-card-foregroud">
        Log in to see your blogs
      </h2>
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-3 mt-2">
        <div className="flex flex-col gap-3">
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            value={username}
            name="username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />{" "}
        </div>{" "}
        <div className="flex flex-col gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            value={password}
            name="password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />{" "}
        </div>{" "}
        <div className="flex items-center justify-center my-2">
          <Button type="submit" id="login-button">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
