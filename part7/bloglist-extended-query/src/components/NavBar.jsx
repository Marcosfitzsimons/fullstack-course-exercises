import { Link } from "react-router-dom";
import { useUserValue } from "../context/LoginContext";

const NavBar = () => {
  const user = useUserValue();

  if (!user) return null;

  return (
    <header>
      <nav>
        <ul className="flex items-center gap-3">
          <li>
            <Link to="/" className="underline">
              Blogs
            </Link>
          </li>
          <li>
            <Link to="/users" className="underline">
              Users
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
