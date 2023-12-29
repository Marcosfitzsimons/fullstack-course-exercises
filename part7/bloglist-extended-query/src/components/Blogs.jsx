import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { useUserDispatch } from "../context/LoginContext";
import loginService from "../services/login";
import { sortedByMostLiked } from "../lib/utils";
import Blog from "./Blog";
import NewBlogDrawer from "./NewBlogDrawer";
import { toast } from "sonner";
import { Button } from "./ui/button";

const Blogs = () => {
  const navigate = useNavigate();

  const userDispatch = useUserDispatch();

  const { isLoading, error, data } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="w-8/12 mx-auto text-center my-5">loading blogs...</div>
    );
  }

  if (error) {
    if (error.response && error.response.status === 401) {
      loginService.logout();
      userDispatch({ type: "LOGOUT" });
      navigate("/login", { replace: true });
    } else {
      return error.message ? (
        <p>{error.message}</p>
      ) : (
        <p>
          Blog service not available due to specific problems. Try again later
        </p>
      );
    }
  }

  const blogs = data;

  return (
    <div className="w-8/12 mx-auto flex flex-col justify-center items-center gap-2 px-2">
      <NewBlogDrawer />
      <Button
        onClick={() =>
          toast("Event has been created", {
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Open toast
      </Button>
      <h3 className="text-xl font-bold my-2">List of blogs</h3>
      {blogs && (
        <div className="max-w-2xl mx-auto flex flex-col items-start gap-2">
          {sortedByMostLiked(blogs).map((blog) => (
            <Blog key={blog.id} title={blog.title} id={blog.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
