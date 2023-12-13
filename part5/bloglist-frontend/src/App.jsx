import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import LoggedInMsg from "./components/LoggedInMsg";
import NewBlogForm from "./components/NewBlogForm";
import { sortedByMostLiked } from "./lib/utils";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [isNewBlogForm, setIsNewBlogForm] = useState(false);

  useEffect(() => {
    const userFromLocal = window.localStorage.getItem("user");
    if (userFromLocal) {
      const userParsed = JSON.parse(userFromLocal);
      setUser(userParsed);
      blogService.setToken(userParsed.token);
    }
  }, []);

  useEffect(() => {
    if (user) {
      const getBlogs = async () => {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      };
      getBlogs();
    }
  }, [user]);

  return (
    <div>
      <h2>blogs</h2>
      {user === null ? (
        <>
          {isLogin ? (
            <Login setIsLogin={setIsLogin} setUser={setUser} />
          ) : (
            <button onClick={() => setIsLogin(true)}>Log In</button>
          )}
        </>
      ) : (
        <>
          <LoggedInMsg name={user.name} setUser={setUser} />
          {isNewBlogForm ? (
            <NewBlogForm
              setBlogs={setBlogs}
              setIsNewBlogForm={setIsNewBlogForm}
            />
          ) : (
            <button onClick={() => setIsNewBlogForm(true)}>Add New Blog</button>
          )}

          {sortedByMostLiked(blogs).map((blog) => (
            <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
