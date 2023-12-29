import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { useNotificationDispatch } from "../context/NotificationContext";
import { Button } from "./ui/button";

const BlogLikes = ({ blog }) => {
  const queryClient = useQueryClient();

  const dispatch = useNotificationDispatch();

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(["blog", updatedBlog.id], {
        ...blog,
        likes: blog.likes + 1,
      }); // Optimistic update
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.filter((blog) => blog.id !== updatedBlog.id).concat(updatedBlog)
      );
    },
  });

  const increaseLikes = () => {
    const commentsWithOnlyId = blog.comments.map((comment) => comment.id);
    updateBlogMutation.mutate({
      ...blog,
      comments: commentsWithOnlyId,
      likes: blog.likes + 1,
    });
    dispatch({
      type: "SHOW",
      payload: {
        content: `${blog.title} successfully liked`,
        type: "success",
      },
    });
    setTimeout(() => {
      dispatch({ type: "REMOVE" });
    }, 5000);
  };

  return (
    <div className="flex items-center gap-2">
      <p>
        {blog.likes} {blog.likes === 1 ? "like" : "likes"}
      </p>
      <Button size="sm" va onClick={increaseLikes}>
        Like
      </Button>
    </div>
  );
};

export default BlogLikes;
