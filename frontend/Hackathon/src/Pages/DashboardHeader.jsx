import React from 'react';
import './DashboardHeader.css';

const DashboardHeader = ({ studentName, todayLoad }) => {
  const getCurrentDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  const getLoadColor = (load) => {
    if (load <= 4) return '#10b981';
    if (load <= 7) return '#f59e0b';
    if (load <= 9) return '#f97316';
    return '#ef4444';
  };

  const getLoadLabel = (load) => {
    if (load <= 4) return 'Light';
    if (load <= 7) return 'Moderate';
    if (load <= 9) return 'Heavy';
    return 'Extreme';
  };

  return (
    <div className="dashboard-header">
      <div className="header-welcome">
        <h1>Hello, {studentName}! 👋</h1>
        <p className="current-date">{getCurrentDate()}</p>
      </div>

      <div className="header-load-score">
        <div className="load-score-container">
          <span className="load-label">Today's Load</span>
          <div className="load-value" style={{ color: getLoadColor(todayLoad) }}>
            {todayLoad.toFixed(1)}
            <span className="load-status">{getLoadLabel(todayLoad)}</span>
          </div>
        </div>
      </div>

      <nav className="quick-nav">
        <a href="#calendar" className="nav-link">Calendar</a>
        <a href="#deadlines" className="nav-link">Deadlines</a>
        <a href="#courses" className="nav-link">Courses</a>
        <a href="#settings" className="nav-link">Settings</a>
      </nav>
    </div>
  );
};

export default DashboardHeader;