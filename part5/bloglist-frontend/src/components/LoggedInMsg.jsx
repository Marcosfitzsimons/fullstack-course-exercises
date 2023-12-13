import loginService from "../services/login";

const LoggedInMsg = ({ name, setUser }) => {
  return (
    <p>
      {name} logged in
      <button onClick={() => loginService.logout(setUser)}>log out</button>
    </p>
  );
};

export default LoggedInMsg;
