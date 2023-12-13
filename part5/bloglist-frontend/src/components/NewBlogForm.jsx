import { useState } from "react";
import blogService from "../services/blogs";
import Notification from "./Notification";

const NewBlogForm = ({ setBlogs, setIsNewBlogForm }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [notificationType, setNotificationType] = useState("error");
  const [notificationMessage, setNotificationMessage] = useState(null);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBlog = await blogService.create({ title, author, url });

      setBlogs((prev) => [...prev, newBlog]);
      setTitle("");
      setAuthor("");
      setUrl("");
      setNotificationMessage(
        `A new blog ${newBlog.title} by ${newBlog.author} successfully added`
      );
      setNotificationType("success");
      setIsNewBlogForm(false);
    } catch (exception) {
      const errorMsg = exception.response?.data?.error
        ? exception.response?.data?.error
        : "An error has occurred, try again later";
      setNotificationMessage(errorMsg);
      setNotificationType("error");
    }
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Notification type={notificationType} message={notificationMessage} />
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={title}
          name="title"
          id="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>{" "}
      <div>
        <label htmlFor="author">Author</label>
        <input
          type="text"
          value={author}
          name="author"
          id="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">Url</label>
        <input
          type="text"
          value={url}
          name="url"
          id="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Create</button>
      <button type="button" onClick={() => setIsNewBlogForm(false)}>
        Cancel
      </button>
    </form>
  );
};

export default NewBlogForm;
