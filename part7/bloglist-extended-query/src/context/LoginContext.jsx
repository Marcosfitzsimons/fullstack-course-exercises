import { createContext, useContext, useEffect, useReducer } from "react";
import blogService from "../services/blogs";

const loginReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

const LoginContext = createContext();

export const useUserValue = () => {
  const loginAndDispatch = useContext(LoginContext);
  return loginAndDispatch[0];
};

export const useUserDispatch = () => {
  const loginAndDispatch = useContext(LoginContext);
  return loginAndDispatch[1];
};

const userFromLocal = window.localStorage.getItem("user");

let initialState = null;

if (userFromLocal) {
  const userParsed = JSON.parse(userFromLocal);
  initialState = userParsed;
  blogService.setToken(userParsed.token);
}

export const LoginContextProvider = (props) => {
  const [user, userDispatch] = useReducer(loginReducer, initialState);

  return (
    <LoginContext.Provider value={[user, userDispatch]}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
