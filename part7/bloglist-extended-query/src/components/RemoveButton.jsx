import React from "react";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { useNotificationDispatch } from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";

const RemoveButton = ({ blog }) => {
  const dispatch = useNotificationDispatch();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteB,
    onSuccess: () => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.filter((b) => b.id !== blog.id)
      );
    },
  });

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id);
      navigate("/");
      dispatch({
        type: "SHOW",
        payload: {
          content: `${blog.title} successfully removed`,
          type: "success",
        },
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE" });
      }, 5000);
    }
  };
  return (
    <Button variant="destructive" size="sm" onClick={handleRemove}>
      Remove blog
    </Button>
  );
};

export default RemoveButton;
