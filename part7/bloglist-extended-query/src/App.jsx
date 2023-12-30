import Login from "./components/Login";
import Notification from "./components/Notification";
import { Navigate, Route, Routes } from "react-router-dom";
import { useUserValue } from "./context/LoginContext";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import SingleUser from "./components/SingleUser";
import SingleBlog from "./components/SingleBlog";
import Header from "./components/Header";
import { Toaster } from "./components/ui/sonner";

const ProtectedRoute = ({ children }) => {
  const user = useUserValue();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  return (
    <div>
      <Notification />
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Blogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <ProtectedRoute>
              <SingleBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:id"
          element={
            <ProtectedRoute>
              <SingleUser />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
