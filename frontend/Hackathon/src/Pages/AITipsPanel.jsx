import React, { useState, useEffect } from 'react';
import TipCard from './TipCard';
import LoadingTips from './LoadingTips';
import './AITipsPanel.css';

const AITipsPanel = ({ studentId }) => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    generateTips();
  }, [studentId]);

  const generateTips = async () => {
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockTips = [
      {
        id: 1,
        type: 'schedule',
        title: 'Optimize Your Schedule',
        content: 'Your heaviest day is March 15th with a load of 9.5. Consider:\n• Starting the Data Structures assignment early\n• Breaking the Physics project into smaller chunks\n• Reviewing Calculus notes in advance',
        helpful: false
      },
      {
        id: 2,
        type: 'warning',
        title: 'Deadline Cluster Alert',
        content: 'You have 4 major deadlines within 3 days (March 12-14). This could cause stress. Recommend spacing out work over the next week.',
        helpful: false
      },
      {
        id: 3,
        type: 'suggestion',
        title: 'Study Strategy',
        content: 'Based on your difficulty ratings:\n• Focus 60% of study time on high-difficulty items\n• Use active recall for exam preparation\n• Schedule breaks between intensive tasks',
        helpful: false
      },
      {
        id: 4,
        type: 'insight',
        title: 'Pattern Detected',
        content: 'Your load tends to peak on Thursdays and Fridays. Consider negotiating deadline extensions or starting work earlier in the week.',
        helpful: false
      }
    ];

    setTips(mockTips);
    setLoading(false);
    setLastRefresh(new Date());
  };

  const handleRefresh = () => {
    generateTips();
  };

  const handleMarkHelpful = (tipId) => {
    setTips(prev => prev.map(tip => 
      tip.id === tipId ? { ...tip, helpful: !tip.helpful } : tip
    ));
  };

  const handleDismiss = (tipId) => {
    setTips(prev => prev.filter(tip => tip.id !== tipId));
  };

  return (
    <div className="ai-tips-panel">
      <div className="panel-header">
        <div className="header-title">
          <span className="robot-icon">🤖</span>
          <h2>AI Insights</h2>
        </div>
        <button 
          className="refresh-btn"
          onClick={handleRefresh}
          disabled={loading}
          title="Refresh tips"
        >
          🔄
        </button>
      </div>

      <div className="last-updated">
        Last updated: {lastRefresh.toLocaleTimeString()}
      </div>

      <div className="tips-container">
        {loading ? (
          <LoadingTips />
        ) : tips.length > 0 ? (
          tips.map(tip => (
            <TipCard
              key={tip.id}
              tip={tip}
              onMarkHelpful={handleMarkHelpful}
              onDismiss={handleDismiss}
            />
          ))
        ) : (
          <div className="no-tips">
            <p>No tips available right now.</p>
            <button onClick={handleRefresh}>Generate Tips</button>
          </div>
        )}
      </div>

      <div className="panel-footer">
        <p className="disclaimer">
          💡 AI suggestions are based on your schedule patterns and may not account for all factors.
        </p>
      </div>
    </div>
  );
};

export default AITipsPanel;