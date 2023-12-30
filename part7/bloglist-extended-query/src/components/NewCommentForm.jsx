import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useField } from "../hooks";
import blogService from "../services/blogs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

const NewCommentForm = ({ blog }) => {
  const comment = useField("text");

  const queryClient = useQueryClient();

  const newCommentMutation = useMutation({
    mutationFn: blogService.createComment,
    onSuccess: (newComment) => {
      queryClient.setQueryData(["blog", newComment.blog], {
        ...blog,
        comments: blog.comments.concat(newComment),
      }); // Optimistic update
      comment.reset();
      toast.success(`New comment "${newComment.content}" succesfully added`);
    },

    onError: (err) => {
      const errorMsg = err.response?.data
        ? err.response?.data
        : "An error has occurred, try again later";
      toast.error(errorMsg);
    },
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    newCommentMutation.mutate({
      content: comment.attributes.value,
      blogId: blog.id,
    });
  };

  return (
    <form onSubmit={handleOnSubmit} className="flex items-center gap-2">
      <Input
        {...comment.attributes}
        placeholder="Add new comment..."
        name="comment"
        id="comment"
      />
      <Button>Add</Button>
    </form>
  );
};

export default NewCommentForm;
