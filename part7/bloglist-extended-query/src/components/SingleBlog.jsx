import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import blogService from "../services/blogs";
import { useUserDispatch, useUserValue } from "../context/LoginContext";
import loginService from "../services/login";
import BlogLikes from "./BlogLikes";
import { getUserId } from "../lib/utils";
import RemoveButton from "./RemoveButton";
import NewCommentForm from "./NewCommentForm";
import { ExternalLink } from "lucide-react";

const SingleBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { token } = useUserValue();
  const userDispatch = useUserDispatch();

  blogService.setToken(token);

  const {
    isLoading,
    error,
    data: blog,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: blogService.getBlog,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="w-8/12 mx-auto text-center my-5">loading blog...</div>
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
          Blog service not available due to specific problems. Try again later
        </p>
      ); // Handle other errors
    }
  }

  const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return formattedDate;
  };

  return (
    <div className="w-10/12 mx-auto max-w-2xl flex flex-col items-center gap-3 my-3">
      <h3 className="text-2xl">{blog.title}</h3>
      <div className="flex items-center gap-2 self-end">
        <p className="">
          Added by <span className="italic">{blog.author}</span>
        </p>
        {blog.user === getUserId() && <RemoveButton blog={blog} />}
      </div>
      <div className="w-full flex items-center justify-between">
        <BlogLikes blog={blog} />
        <a
          href={blog.url}
          rel="noreferrer"
          target="_blank"
          className="flex items-center gap-1"
        >
          {blog.url} <ExternalLink className="w-4 h-4 relative top-[0.5px]" />
        </a>
      </div>
      <h4 className="text-xl">Comments</h4>
      <NewCommentForm blog={blog} />
      {blog.comments.length > 0 ? (
        <>
          {blog.comments.map((comment) => (
            <div
              key={comment.id}
              className="flex flex-col gap-1 w-10/12 mx-auto rounded-sm border border-slate-200 p-2"
            >
              <span className="text-xs italic self-end">
                {formatDate(comment.createdAt)}
              </span>
              <p>{comment.content}</p>
            </div>
          ))}
        </>
      ) : (
        <p>There are no comments to view. Add one!</p>
      )}
    </div>
  );
};

export default SingleBlog;
