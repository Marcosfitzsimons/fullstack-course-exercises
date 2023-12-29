import { useState } from "react";
import { getUserId } from "../lib/utils";
import { useDispatch } from "react-redux";
import { addLike, deleteBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

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
    dispatch(addLike(newBlog));
  };

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog));
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
