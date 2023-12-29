import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import usersService from "../services/users";
import { useUserDispatch, useUserValue } from "../context/LoginContext";
import loginService from "../services/login";
import Blog from "./Blog";

const SingleUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { token } = useUserValue();
  const userDispatch = useUserDispatch();

  usersService.setToken(token);

  const {
    isLoading,
    error,
    data: user,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: usersService.getUser,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="w-8/12 mx-auto text-center my-2">loading data...</div>
    );
  }

  if (error) {
    if (error.response && error.response.status === 401) {
      loginService.logout();
      userDispatch({ type: "LOGOUT" });
      navigate("/login", { replace: true }); // Redirect to login
    } else {
      return error.message ? (
        <p>{error.message}</p>
      ) : (
        <p>
          User service not available due to specific problems. Try again later
        </p>
      ); // Handle other errors
    }
  }

  return (
    <div className="w-8/12 mx-auto flex flex-col items-center justify-center">
      <h3 className="text-2xl italic my-2">{user.name}</h3>
      {user.blogs.length === 0 && <p>User has not yet created any blogs...</p>}
      <ul className="flex flex-col items-center gap-2">
        {user.blogs.length > 0 && (
          <span className="text-lg">Blogs added by this user:</span>
        )}
        {user.blogs.map((blog) => (
          <Blog key={blog.id} title={blog.title} id={blog.id} />
        ))}
      </ul>
    </div>
  );
};

export default SingleUser;
