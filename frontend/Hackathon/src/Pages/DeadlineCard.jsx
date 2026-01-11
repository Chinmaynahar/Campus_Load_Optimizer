import React, { useState } from 'react';
import './DeadlineCard.css';

const DeadlineCard = ({ deadline }) => {
  const [completed, setCompleted] = useState(deadline.completed);

  const getTypeIcon = (type) => {
    const icons = {
      assignment: '📝',
      exam: '📚',
      project: '🎯',
      lab: '🔬',
      quiz: '❓'
    };
    return icons[type] || '📌';
  };

  const getTimeRemaining = (dueDate) => {
    const now = new Date();
    const diff = dueDate - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (diff < 0) {
      return { text: 'Overdue', color: '#ef4444', urgent: true };
    } else if (hours < 24) {
      return { text: `${hours}h left`, color: '#ef4444', urgent: true };
    } else if (days < 3) {
      return { text: `${days}d left`, color: '#f97316', urgent: true };
    } else if (days < 7) {
      return { text: `${days}d left`, color: '#f59e0b', urgent: false };
    } else {
      return { text: `${days}d left`, color: '#10b981', urgent: false };
    }
  };

  const getBorderColor = (difficulty) => {
    if (difficulty <= 2) return '#10b981';
    if (difficulty === 3) return '#f59e0b';
    if (difficulty === 4) return '#f97316';
    return '#ef4444';
  };

  const handleComplete = (e) => {
    e.stopPropagation();
    setCompleted(!completed);
    // API call to update completion status
  };

  const timeRemaining = getTimeRemaining(deadline.dueDate);

  return (
    <div 
      className={`deadline-card ${completed ? 'completed' : ''}`}
      style={{ borderLeftColor: getBorderColor(deadline.difficulty) }}
    >
      <div className="card-header">
        <div className="course-info">
          <span className="course-icon">{getTypeIcon(deadline.type)}</span>
          <span className="course-name">{deadline.course}</span>
        </div>
        <input
          type="checkbox"
          checked={completed}
          onChange={handleComplete}
          className="complete-checkbox"
        />
      </div>

      <h3 className="deadline-title">{deadline.title}</h3>

      <div className="card-meta">
        <div className="difficulty-stars">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < deadline.difficulty ? 'star-filled' : 'star-empty'}>
              ⭐
            </span>
          ))}
        </div>
        <span className="estimated-hours">{deadline.estimatedHours}h</span>
      </div>

      <div className="card-footer">
        <span 
          className={`time-badge ${timeRemaining.urgent ? 'urgent' : ''}`}
          style={{ backgroundColor: timeRemaining.color }}
        >
          {timeRemaining.text}
        </span>
        <span className="deadline-type">{deadline.type}</span>
      </div>
    </div>
  );
};

export default DeadlineCard;