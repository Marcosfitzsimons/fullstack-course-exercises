import { useState } from "react";
import blogService from "../services/blogs";
import { getUserId } from "../lib/utils";

const Blog = ({ blog, setBlogs }) => {
  const [isOpen, setIsOpen] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const increaseLikes = async () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    try {
      const blogUpdated = await blogService.update(blog.id, newBlog);
      setBlogs((prev) => prev.map((b) => (b.id === blog.id ? blogUpdated : b)));
    } catch (err) {
      console.log(err);
      alert("Error when add like");
    }
  };

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteB(blog.id);
        setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
      } catch (err) {
        console.log(err);
        alert("Error when deleting blog");
      }
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <p className="blogTitle">
        {blog.title} by {blog.author}
      </p>
      <button onClick={() => setIsOpen((prev) => !prev)} className="toggleview">
        {isOpen ? "hide" : "view"}
      </button>{" "}
      {isOpen && (
        <>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={increaseLikes}>Like</button>
          </p>
          <p>by {blog.author}</p>
        </>
      )}
      {blog.user.id === getUserId() && (
        <button onClick={handleRemove}>Remove</button>
      )}
    </div>
  );
};

export default Blog;
