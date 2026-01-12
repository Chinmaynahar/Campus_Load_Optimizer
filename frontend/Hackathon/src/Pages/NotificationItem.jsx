import React from 'react';
import './NotificationItem.css';

const NotificationItem = ({ notification, onMarkRead, onDismiss }) => {
  const getTypeIcon = (type) => {
    const icons = {
      warning: '⚠️',
      reminder: '⏰',
      tip: '💡',
      success: '✅',
      info: 'ℹ️'
    };
    return icons[type] || 'ℹ️';
  };

  const getTypeColor = (type) => {
    const colors = {
      warning: '#f59e0b',
      reminder: '#3b82f6',
      tip: '#10b981',
      success: '#22c55e',
      info: '#6b7280'
    };
    return colors[type] || '#6b7280';
  };

  const formatTimeAgo = (timeString) => {
    return timeString;
  };

  const handleClick = () => {
    if (!notification.read) {
      onMarkRead(notification.id);
    }
  };

  return (
    <div 
      className={`notification-item ${notification.read ? 'read' : 'unread'}`}
      onClick={handleClick}
    >
      <div 
        className="notification-icon"
        style={{ backgroundColor: getTypeColor(notification.type) }}
      >
        {getTypeIcon(notification.type)}
      </div>

      <div className="notification-content">
        <p className="notification-message">{notification.message}</p>
        <span className="notification-time">{formatTimeAgo(notification.time)}</span>
      </div>

      <div className="notification-actions">
        {!notification.read && (
          <div className="unread-indicator" title="Unread"></div>
        )}
        <button
          className="dismiss-notification-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDismiss(notification.id);
          }}
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default NotificationItem;