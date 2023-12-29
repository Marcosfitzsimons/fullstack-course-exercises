import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "../context/NotificationContext";
import { useField } from "../hooks";
import blogService from "../services/blogs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const NewCommentForm = ({ blog }) => {
  const comment = useField("text");

  const dispatch = useNotificationDispatch();

  const queryClient = useQueryClient();

  const newCommentMutation = useMutation({
    mutationFn: blogService.createComment,
    onSuccess: (newComment) => {
      queryClient.setQueryData(["blog", newComment.blog], {
        ...blog,
        comments: blog.comments.concat(newComment),
      }); // Optimistic update
      dispatch({
        type: "SHOW",
        payload: {
          content: `A new comment ${newComment.content} successfully added`,
          type: "success",
        },
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE" });
      }, 5000);
    },
    onError: (err) => {
      const errorMsg = err.response?.data?.error
        ? err.response?.data?.error
        : "An error has occurred, try again later";

      dispatch({
        type: "SHOW",
        payload: {
          content: errorMsg,
          type: "error",
        },
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE" });
      }, 5000);
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
