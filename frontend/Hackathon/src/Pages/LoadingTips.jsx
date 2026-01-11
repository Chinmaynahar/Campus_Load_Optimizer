import React from 'react';
import './LoadingTips.css';

const LoadingTips = () => {
  return (
    <div className="loading-tips">
      <div className="loading-animation">
        <div className="thinking-icon">
          <div className="brain">🧠</div>
          <div className="dots">
            <span className="dot dot-1">.</span>
            <span className="dot dot-2">.</span>
            <span className="dot dot-3">.</span>
          </div>
        </div>
      </div>

      <p className="loading-message">AI is analyzing your schedule...</p>

      <div className="loading-steps">
        <div className="step active">
          <span className="step-icon">✓</span>
          <span>Reviewing deadlines</span>
        </div>
        <div className="step active">
          <span className="step-icon">✓</span>
          <span>Calculating load patterns</span>
        </div>
        <div className="step animating">
          <span className="step-icon">⟳</span>
          <span>Generating insights</span>
        </div>
      </div>

      <div className="skeleton-tips">
        <div className="skeleton-tip"></div>
        <div className="skeleton-tip"></div>
        <div className="skeleton-tip"></div>
      </div>
    </div>
  );
};

export default LoadingTips;