import React, { useState } from 'react';
import './TipCard.css';

const TipCard = ({ tip, onMarkHelpful, onDismiss }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const getTypeIcon = (type) => {
    const icons = {
      schedule: '📅',
      warning: '⚠️',
      suggestion: '💡',
      insight: '🔍',
      reminder: '⏰'
    };
    return icons[type] || '💡';
  };

  const getTypeColor = (type) => {
    const colors = {
      schedule: '#3b82f6',
      warning: '#ef4444',
      suggestion: '#10b981',
      insight: '#8b5cf6',
      reminder: '#f59e0b'
    };
    return colors[type] || '#6b7280';
  };

  const formatContent = (content) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('•')) {
        return <li key={index}>{line.substring(1).trim()}</li>;
      }
      return <p key={index}>{line}</p>;
    });
  };

  return (
    <div 
      className="tip-card"
      style={{ borderLeftColor: getTypeColor(tip.type) }}
    >
      <div className="tip-header">
        <div className="tip-title-row">
          <span className="tip-icon">{getTypeIcon(tip.type)}</span>
          <h3>{tip.title}</h3>
        </div>
        <button
          className="collapse-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      {isExpanded && (
        <>
          <div className="tip-content">
            {formatContent(tip.content)}
          </div>

          <div className="tip-actions">
            <button
              className={`helpful-btn ${tip.helpful ? 'active' : ''}`}
              onClick={() => onMarkHelpful(tip.id)}
            >
              {tip.helpful ? '✓ Helpful' : '👍 Mark as Helpful'}
            </button>
            <button
              className="dismiss-btn"
              onClick={() => onDismiss(tip.id)}
            >
              Dismiss
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TipCard;