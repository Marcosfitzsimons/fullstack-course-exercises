import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useField } from "../hooks";
import { useNotificationDispatch } from "../context/NotificationContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";

const NewBlogDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const dispatch = useNotificationDispatch();

  const queryClient = useQueryClient();

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      setIsOpen(false);
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
      dispatch({
        type: "SHOW",
        payload: {
          content: `A new blog ${newBlog.title} by ${newBlog.author} successfully added`,
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
    newBlogMutation.mutate({
      title: title.attributes.value,
      author: author.attributes.value,
      url: url.attributes.value,
    });
  };
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button className="mt-4">Add New Blog</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex flex-col items-center justify-center gap-2">
          <DrawerTitle>Add New Blog</DrawerTitle>
          <DrawerDescription>Make sure to fill in all fields</DrawerDescription>
        </DrawerHeader>
        <form
          onSubmit={handleOnSubmit}
          className="w-11/12 max-w-xl mx-auto flex flex-col gap-2"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Title</Label>
            <Input {...title.attributes} name="title" id="title" />
          </div>{" "}
          <div className="flex flex-col gap-2">
            <Label htmlFor="author">Author</Label>
            <Input {...author.attributes} name="author" id="author" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="url">Url</Label>
            <Input {...url.attributes} name="url" id="url" />
          </div>
          <DrawerFooter className="flex flex-row items-center justify-between my-1">
            <DrawerClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DrawerClose>
            <Button type="submit">Create</Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default NewBlogDrawer;
