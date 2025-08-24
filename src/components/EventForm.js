
import React, { useState } from "react";
import { createEvent } from "../services/api";
import "./EventForm.css"; 

function EventForm({ onNewNotification }) {
  const [userId, setUserId] = useState("user1");
  const [type, setType] = useState("EMAIL");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await createEvent(userId, type, message);
      const newId = res?._id || res?.notification?._id;
      if (newId && onNewNotification) {
        onNewNotification(newId);
      }
      setStatus(" Notification sent successfully!");
      setMessage("");
    } catch (err) {
      console.error("Axios Error:", err.message);
      setStatus(" Failed to send notification!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          User ID:
          <input value={userId} onChange={(e) => setUserId(e.target.value)} required />
        </label>

        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="EMAIL">EMAIL</option>
            <option value="SMS">SMS</option>
            <option value="PUSH">PUSH</option>
          </select>
        </label>

        <label>
          Message:
          <input value={message} onChange={(e) => setMessage(e.target.value)} required />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      {status && (
        <p className={`status ${status.includes("❌") ? "error" : "success"}`}>
          {status}
        </p>
      )}
    </div>
  );
}

export default EventForm;