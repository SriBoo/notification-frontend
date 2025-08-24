
import React, { useEffect, useState } from "react";
import { getNotificationStatus } from "../services/api";
import "./NotificationList.css"; 

const NotificationList = ({ newNotificationId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!newNotificationId) return;

      try {
        const notif = await getNotificationStatus(newNotificationId);
        console.log(" Received notification:", notif);

        if (notif && notif._id) {
          setNotifications((prev) => {
            const exists = prev.some((n) => n._id === notif._id);
            return exists ? prev : [notif, ...prev];
          });
        } else {
          console.warn(" Invalid notification object:", notif);
        }
      } catch (err) {
        console.error(" Failed to fetch notification:", err.message);
      }
    };

    fetchStatus();
  }, [newNotificationId]);

  return (
    <div className="notification-list">
      <h3>Notifications</h3>

      {notifications.length === 0 ? (
        <p className="empty">No notifications yet.</p>
      ) : (
        <ul>
          {notifications.map((n) => (
            <li key={n._id} className="notification-item">
              <div className="type">[{n.type}]</div>
              <div className="message">{n.message}</div>
              <div
                className={`status ${
                  n.status === "SENT" ? "sent" : "pending"
                }`}
              >
                {n.status}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationList;