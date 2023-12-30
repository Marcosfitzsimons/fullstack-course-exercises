import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { Button } from "./ui/button";
import { toast } from "sonner";

const BlogLikes = ({ blog }) => {
  const queryClient = useQueryClient();

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(["blog", updatedBlog.id], {
        ...blog,
        likes: blog.likes + 1,
      }); // Optimistic update
      toast.success(`Blog "${blog.title}" liked successfully`);
    },
    onError: (err) => {
      console.log(err);
      const errorMsg = err.response?.data?.error
        ? err.response?.data?.error
        : "An error has occurred, try again later";
      toast.error(errorMsg);
    },
  });

  const increaseLikes = () => {
    const commentsWithOnlyId = blog.comments.map((comment) => comment.id);
    updateBlogMutation.mutate({
      ...blog,
      comments: commentsWithOnlyId,
      likes: blog.likes + 1,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <p>
        {blog.likes} {blog.likes === 1 ? "like" : "likes"}
      </p>
      <Button size="sm" type="button" onClick={increaseLikes}>
        Like
      </Button>
    </div>
  );
};

export default BlogLikes;
