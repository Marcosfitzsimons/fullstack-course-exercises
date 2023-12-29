import { useSelector } from "react-redux";

const Notification = () => {
  const { message, type } = useSelector(({ notification }) => notification);

  if (message === "" || type === "") return null;

  return (
    <div className={`${type === "success" ? "success" : "error"}`}>
      {message}
    </div>
  );
};

export default Notification;
