import React from 'react';
import './QuickStats.css';

const QuickStats = ({ weekDeadlines, avgLoad, dangerDays, completedTasks }) => {
  const stats = [
    {
      id: 1,
      icon: '📅',
      label: 'Deadlines This Week',
      value: weekDeadlines,
      color: '#3b82f6'
    },
    {
      id: 2,
      icon: '📊',
      label: 'Average Load',
      value: avgLoad.toFixed(1),
      color: '#8b5cf6'
    },
    {
      id: 3,
      icon: '⚠️',
      label: 'Days in Danger Zone',
      value: dangerDays,
      color: '#ef4444'
    },
    {
      id: 4,
      icon: '✅',
      label: 'Completed Tasks',
      value: completedTasks,
      color: '#10b981'
    }
  ];

  return (
    <div className="quick-stats">
      {stats.map(stat => (
        <div key={stat.id} className="stat-card" style={{ borderLeftColor: stat.color }}>
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-content">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;