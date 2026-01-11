import React, { useState } from 'react';
import NotificationDropdown from './NotificationDropdown';
import './NotificationBell.css';

const NotificationBell = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationList, setNotificationList] = useState(notifications);

  const unreadCount = notificationList.filter(n => !n.read).length;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMarkAllRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleMarkRead = (id) => {
    setNotificationList(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleDismiss = (id) => {
    setNotificationList(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="notification-bell-container">
      <button 
        className="notification-bell"
        onClick={handleToggle}
        aria-label="Notifications"
      >
        <span className="bell-icon">🔔</span>
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <NotificationDropdown
          notifications={notificationList}
          onClose={() => setIsOpen(false)}
          onMarkAllRead={handleMarkAllRead}
          onMarkRead={handleMarkRead}
          onDismiss={handleDismiss}
        />
      )}
    </div>
  );
};

export default NotificationBell;