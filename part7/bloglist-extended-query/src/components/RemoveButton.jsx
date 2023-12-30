import React from "react";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RemoveButton = ({ blog }) => {
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
      navigate("/");
      toast.success(`Blog "${blog.title}" deleted successfully`);
    },
    onError: (err) => {
      const errorMsg = err.response?.data?.error
        ? err.response?.data?.error
        : "An error has occurred, try again later";
      toast.error(errorMsg);
    },
  });

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id);
    }
  };
  return (
    <Button variant="destructive" size="sm" onClick={handleRemove}>
      Remove blog
    </Button>
  );
};

export default RemoveButton;
