import React, { useState, useEffect } from 'react';
import './DayDetailModal.css';

const DayDetailModal = ({ day, onClose }) => {
  const [deadlines, setDeadlines] = useState([]);
  const [loadBreakdown, setLoadBreakdown] = useState({});

  useEffect(() => {
    fetchDayDetails();
  }, [day]);

  const fetchDayDetails = async () => {
    // Simulate API call
    const mockDeadlines = [
      { id: 1, course: 'Data Structures', title: 'Assignment 3', type: 'assignment', difficulty: 4, hours: 5 },
      { id: 2, course: 'Calculus II', title: 'Midterm Exam', type: 'exam', difficulty: 5, hours: 3 },
      { id: 3, course: 'Physics', title: 'Lab Report', type: 'lab', difficulty: 3, hours: 2 }
    ];
    
    setDeadlines(mockDeadlines);
    calculateLoadBreakdown(mockDeadlines);
  };

  const calculateLoadBreakdown = (items) => {
    const breakdown = {
      totalHours: items.reduce((sum, item) => sum + item.hours, 0),
      avgDifficulty: items.reduce((sum, item) => sum + item.difficulty, 0) / items.length,
      count: items.length
    };
    setLoadBreakdown(breakdown);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getLoadExplanation = () => {
    if (day.load <= 4) {
      return "This is a light day. You have minimal commitments and should have plenty of free time.";
    } else if (day.load <= 7) {
      return `This is a moderate day with ${loadBreakdown.count} deadline(s) requiring approximately ${loadBreakdown.totalHours} hours of work.`;
    } else if (day.load <= 9) {
      return `This is a heavy day. You have ${loadBreakdown.count} significant deadline(s) with an average difficulty of ${loadBreakdown.avgDifficulty.toFixed(1)}/5. Consider starting work early.`;
    } else {
      return `⚠️ This is an extremely heavy day with ${loadBreakdown.count} deadline(s) requiring ${loadBreakdown.totalHours}+ hours. We strongly recommend redistributing some tasks or seeking extensions.`;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="day-detail-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{formatDate(day.date)}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-load-summary">
          <div className="load-badge" style={{ 
            backgroundColor: day.load > 7 ? '#ef4444' : day.load > 4 ? '#f59e0b' : '#10b981' 
          }}>
            Load Score: {day.load.toFixed(1)}
          </div>
          <p className="load-explanation">{getLoadExplanation()}</p>
        </div>

        <div className="modal-deadlines">
          <h3>Deadlines ({deadlines.length})</h3>
          {deadlines.length > 0 ? (
            <div className="deadline-list">
              {deadlines.map(deadline => (
                <div key={deadline.id} className="deadline-item">
                  <div className="deadline-header-row">
                    <span className="course-name">{deadline.course}</span>
                    <span className="deadline-type">{deadline.type}</span>
                  </div>
                  <div className="deadline-title">{deadline.title}</div>
                  <div className="deadline-meta">
                    <span className="difficulty">
                      {'⭐'.repeat(deadline.difficulty)}
                    </span>
                    <span className="hours">{deadline.hours}h estimated</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-deadlines">No deadlines for this day! 🎉</p>
          )}
        </div>

        <div className="modal-breakdown">
          <h3>Why is this day {day.load > 7 ? 'heavy' : 'like this'}?</h3>
          <ul>
            <li>Total estimated hours: <strong>{loadBreakdown.totalHours}h</strong></li>
            <li>Average difficulty: <strong>{loadBreakdown.avgDifficulty?.toFixed(1)}/5</strong></li>
            <li>Number of deadlines: <strong>{loadBreakdown.count}</strong></li>
            <li>Concurrent deadlines increase cognitive load</li>
          </ul>
        </div>

        <button className="modal-close-footer" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default DayDetailModal;