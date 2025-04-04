import Notification from "../models/notificationModel.js";

// Get Notifications
export const getNotifications = async (req, res) => {
  const userId = req.session.user.id;

  try {
    const notifications = await Notification.find({ userId });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error });
  }
};

//  Mark Notification as Read
export const markAsRead = async (req, res) => {
  const { id } = req.params;

  try {
    await Notification.findByIdAndUpdate(id, { isRead: true });
    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Error marking notification as read", error });
  }
};
