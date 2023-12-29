import { Link } from "react-router-dom";
import { Link as Link2 } from "lucide-react";

const Blog = ({ title, id }) => {
  return (
    <Link to={`/blogs/${id}`} className="underline flex items-center gap-1">
      {title} <Link2 className="w-3.5" />
    </Link>
  );
};

export default Blog;
