import React from 'react';
import './DayCell.css';

const DayCell = ({ day, load, deadlines, isToday, isCurrentMonth, onClick }) => {
  const getLoadColor = (loadValue) => {
    if (!loadValue) return '#f3f4f6';
    if (loadValue <= 4) return '#10b981';
    if (loadValue <= 7) return '#f59e0b';
    if (loadValue <= 9) return '#f97316';
    return '#ef4444';
  };

  const getTextColor = (loadValue) => {
    return loadValue > 4 ? '#ffffff' : '#1f2937';
  };

  const cellClass = `day-cell ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}`;

  return (
    <div
      className={cellClass}
      style={{
        backgroundColor: isCurrentMonth ? getLoadColor(load) : '#f9fafb',
        color: isCurrentMonth ? getTextColor(load) : '#9ca3af'
      }}
      onClick={() => isCurrentMonth && onClick(day)}
    >
      <div className="day-number">{day}</div>
      {isCurrentMonth && load > 0 && (
        <div className="day-load">
          <div className="load-score">{load.toFixed(1)}</div>
          {deadlines > 0 && (
            <div className="deadline-count">{deadlines} 📌</div>
          )}
        </div>
      )}
      {isToday && <div className="today-indicator">•</div>}
    </div>
  );
};

export default DayCell;