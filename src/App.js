
import React, { useState } from "react";
import EventForm from "./components/EventForm";
import NotificationList from "./components/NotificationList";

function App() {
  const [newNotificationId, setNewNotificationId] = useState(null);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Insyd Notification POC</h1>

      {/*  Form below */}
      <EventForm onNewNotification={setNewNotificationId} />
      {/*  Show notifications first */}
      <NotificationList newNotificationId={newNotificationId} />
    </div>
  );
}

export default App;