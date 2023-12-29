import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { createBlog } from "../reducers/blogReducer";

const NewBlogForm = ({ setIsNewBlogForm }) => {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const dispatch = useDispatch();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(
        createBlog({
          title: title.attributes.value,
          author: author.attributes.value,
          url: url.attributes.value,
        })
      );
      dispatch(
        setNotification(
          "success",
          `A new blog ${title.attributes.value} by ${author.attributes.value} successfully added`,
          5
        )
      );
      setIsNewBlogForm(false);
    } catch (exception) {
      const errorMsg = exception.response?.data?.error
        ? exception.response?.data?.error
        : "An error has occurred, try again later";
      dispatch(setNotification("error", errorMsg, 5));
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input name="title" id="title" {...title.attributes} />
      </div>{" "}
      <div>
        <label htmlFor="author">Author</label>
        <input name="author" id="author" {...author.attributes} />
      </div>
      <div>
        <label htmlFor="url">Url</label>
        <input name="url" id="url" {...url.attributes} />
      </div>
      <button type="submit">Create</button>
      <button type="button" onClick={() => setIsNewBlogForm(false)}>
        Cancel
      </button>
    </form>
  );
};

export default NewBlogForm;
