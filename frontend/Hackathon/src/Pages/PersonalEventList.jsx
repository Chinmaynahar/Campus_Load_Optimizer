import React from 'react';
import './PersonalEventList.css';

const PersonalEventList = ({ personalEvents = [], onEdit, onDelete }) => {
  return (
    <div className="personal-event-list">
      <h3>Personal Events</h3>
      {personalEvents.length === 0 ? (
        <p className="no-events">No personal events.</p>
      ) : (
        <ul className="event-list">
          {personalEvents.map((e) => (
            <li key={e.id} className="event-item">
              <div className="event-main">
                <strong className="event-title">{e.title}</strong>
                <span className="event-date">{e.date && (typeof e.date === 'string' ? new Date(e.date).toLocaleDateString() : (e.date.toLocaleDateString ? e.date.toLocaleDateString() : String(e.date)))}</span>
              </div>
              <div className="event-actions">
                <button className="edit-btn" onClick={() => onEdit && onEdit(e)}>Edit</button>
                <button className="delete-btn" onClick={() => onDelete && onDelete(e.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PersonalEventList;
