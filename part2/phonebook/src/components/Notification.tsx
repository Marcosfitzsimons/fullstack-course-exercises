type NotificationProps = {
  message: string | null;
  type: "error" | "success";
};

const Notification = ({ message, type }: NotificationProps) => {
  if (message === null) {
    return null;
  }

  return (
    <div className={`${type === "success" ? "success" : "error"}`}>
      {message}
    </div>
  );
};

export default Notification;
