import { useSelector } from "react-redux";
import { sortedByMostLiked } from "../lib/utils";
import Blog from "./Blog";

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs);
  console.log(blogs);
  return (
    <>
      {blogs &&
        sortedByMostLiked(blogs).map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </>
  );
};

export default BlogList;
