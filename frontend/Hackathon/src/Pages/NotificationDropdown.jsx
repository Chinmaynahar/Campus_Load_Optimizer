import React, { useRef, useEffect } from 'react';
import NotificationItem from './NotificationItem';
import './NotificationDropdown.css';

const NotificationDropdown = ({ 
  notifications, 
  onClose, 
  onMarkAllRead, 
  onMarkRead, 
  onDismiss 
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notification-dropdown" ref={dropdownRef}>
      <div className="dropdown-header">
        <h3>Notifications</h3>
        {unreadCount > 0 && (
          <button 
            className="mark-all-read-btn"
            onClick={onMarkAllRead}
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="notification-list">
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkRead={onMarkRead}
              onDismiss={onDismiss}
            />
          ))
        ) : (
          <div className="empty-notifications">
            <span className="empty-icon">🔔</span>
            <p>No notifications</p>
            <span className="empty-subtitle">You're all caught up!</span>
          </div>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="dropdown-footer">
          <a href="#all-notifications" className="see-all-link">
            See all notifications
          </a>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;