import { useNotificationValue } from "../context/NotificationContext";

const Notification = () => {
  const notification = useNotificationValue();

  const style =
    notification.type === "error"
      ? {
          border: "solid",
          borderColor: "red",
          color: "red",
          padding: 10,
          borderWidth: 1,
          marginBottom: 5,
        }
      : {
          border: "solid",
          borderColor: "green",
          color: "green",
          padding: 10,
          borderWidth: 1,
          marginBottom: 5,
        };

  if (!notification.content) return null;

  return <div style={style}>{notification.content}</div>;
};

export default Notification;
