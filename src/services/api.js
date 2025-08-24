// frontend/src/services/api.js
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";

/**
 * Create a new notification event
 * @param {string} userId - ID of the user
 * @param {string} type - Notification type (EMAIL, SMS, PUSH)
 * @param {string} message - Message content
 * @returns {Object} - Created notification data
 */
export const createEvent = async (userId, type, message) => {
  try {
    const res = await axios.post(`${API_BASE}/notify`, {
      userId,
      type,
      message,
    });
    return res.data;
  } catch (err) {
    console.error(" createEvent failed:", err.message);
    throw err;
  }
};

/**
 * Get status of a specific notification by ID
 * @param {string} id - Notification ID
 * @returns {Object} - Notification status data
 */
export const getNotificationStatus = async (id) => {
  try {
    const res = await axios.get(`${API_BASE}/notify/${id}`);
    return res.data;
  } catch (err) {
    console.error("❌ getNotificationStatus failed:", err.message);
    throw err;
  }
};