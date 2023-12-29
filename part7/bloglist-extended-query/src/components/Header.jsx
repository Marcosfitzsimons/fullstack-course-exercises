import React from "react";
import NavBar from "./NavBar";
import { useUserValue } from "../context/LoginContext";
import LoggedInMsg from "./LoggedInMsg";

const Header = () => {
  const user = useUserValue();

  return (
    <header className="w-8/12 mx-auto">
      {user && (
        <div className="flex items-center justify-between px-2 my-2">
          <NavBar />
          <LoggedInMsg name={user.name} />
        </div>
      )}
      <h2 className="text-2xl font-bold text-center">Blog app</h2>
    </header>
  );
};

export default Header;
