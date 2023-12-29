import { useDispatch } from "react-redux";
import { logOutUser } from "../reducers/loginReducer";

const LoggedInMsg = ({ name }) => {
  const dispatch = useDispatch();
  return (
    <p>
      {name} logged in
      <button onClick={() => dispatch(logOutUser())}>log out</button>
    </p>
  );
};

export default LoggedInMsg;
