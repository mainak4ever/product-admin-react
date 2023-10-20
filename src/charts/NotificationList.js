function NotificationList({ notifications }) {
  return (
    <div className="notifications-list">
      <h2>Notifications</h2>
      <div className="notifications-wrapper">
        {notifications.map((notification) => {
          return <Notification notification={notification} />;
        })}
      </div>
    </div>
  );
}
export default NotificationList;

function Notification({ notification }) {
  return (
    <div className="notification">
      <div className="notification-pic">
        <img src={notification.pic} alt="img" />
      </div>
      <div className="notification-details">
        <p>{notification.message}</p>
        <span>{notification.time}</span>
      </div>
    </div>
  );
}
