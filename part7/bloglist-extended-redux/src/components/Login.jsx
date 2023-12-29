import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { loginUser } from "../reducers/loginReducer";
import { useField } from "../hooks";

const Login = ({ setIsLogin }) => {
  const username = useField("text");
  const password = useField("password");

  const dispatch = useDispatch();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    dispatch(loginUser(username.attributes.value, password.attributes.value));
  };

  return (
    <div>
      <h1>Welcome back!</h1>
      <h2>Log in to see your blogs.</h2>
      <form onSubmit={handleOnSubmit}>
        <div>
          <label htmlFor="username">username</label>
          <input {...username.attributes} name="username" id="username" />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input name="password" id="password" {...password.attributes} />{" "}
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
