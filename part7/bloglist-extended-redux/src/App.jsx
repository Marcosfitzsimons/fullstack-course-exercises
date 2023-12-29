import { useState, useEffect } from "react";
import Login from "./components/Login";
import LoggedInMsg from "./components/LoggedInMsg";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import { initializeBlogs } from "./reducers/blogReducer";
import BlogList from "./components/BlogList";
import { useDispatch, useSelector } from "react-redux";
import { getUserFromLocal } from "./reducers/loginReducer";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isNewBlogForm, setIsNewBlogForm] = useState(false);

  const user = useSelector(({ login }) => login);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserFromLocal());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs());
    }
  }, [user]);

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null ? (
        <>
          {isLogin ? (
            <Login setIsLogin={setIsLogin} />
          ) : (
            <button onClick={() => setIsLogin(true)}>Log In</button>
          )}
        </>
      ) : (
        <>
          <LoggedInMsg name={user.name} />
          {isNewBlogForm ? (
            <NewBlogForm setIsNewBlogForm={setIsNewBlogForm} />
          ) : (
            <button onClick={() => setIsNewBlogForm(true)}>Add New Blog</button>
          )}
          <BlogList />
        </>
      )}
    </div>
  );
};

export default App;
