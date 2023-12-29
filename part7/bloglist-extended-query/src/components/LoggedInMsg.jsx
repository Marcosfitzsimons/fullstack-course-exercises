import { useNavigate } from "react-router-dom";
import loginService from "../services/login";
import { useUserDispatch } from "../context/LoginContext";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const LoggedInMsg = ({ name }) => {
  const navigate = useNavigate();

  const dispatch = useUserDispatch();

  const handleLogOut = () => {
    loginService.logout();
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="flex items-center gap-2">
      <p>
        <span className="font-bold italic">{name}</span> you&apos;re logged in
      </p>
      <Separator orientation="vertical" className="h-3" />
      <Button variant="secondary" size="sm" onClick={handleLogOut}>
        log out
      </Button>
    </div>
  );
};

export default LoggedInMsg;
