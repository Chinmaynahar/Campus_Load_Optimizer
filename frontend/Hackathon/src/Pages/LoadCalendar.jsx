import React, { useState, useEffect } from 'react';
import MonthView from './MonthView';
import DayDetailModal from './DayDetailModal';
import './LoadCalendar.css';

const LoadCalendar = ({ onDateSelect, personalEvents = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [loadData, setLoadData] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchMonthLoadData(currentDate);
  }, [currentDate, personalEvents]);

  const fetchMonthLoadData = async (date) => {
    const mockData = generateMockLoadData(date);
    setLoadData(mockData);
  };

  const generateMockLoadData = (date) => {
    const data = {};
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    
    for (let i = 1; i <= daysInMonth; i++) {
      data[i] = {
        load: Math.random() * 10,
        deadlines: Math.floor(Math.random() * 5)
      };
    }
    return data;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDayClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDay({ date: clickedDate, ...loadData[day] });
    setShowModal(true);
    if (onDateSelect) onDateSelect(clickedDate);
  };

  const getMonthName = () => {
    return currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="load-calendar">
      <div className="calendar-header">
        <h2>Load Calendar</h2>
        <div className="calendar-controls">
          <button onClick={handlePrevMonth} className="nav-btn">
            ← Prev
          </button>
          <button onClick={handleToday} className="today-btn">
            Today
          </button>
          <button onClick={handleNextMonth} className="nav-btn">
            Next →
          </button>
        </div>
      </div>

      <div className="calendar-month-title">{getMonthName()}</div>

      <MonthView
        currentDate={currentDate}
        loadData={loadData}
        onDayClick={handleDayClick}
      />

      {showModal && selectedDay && (
        <DayDetailModal
          day={selectedDay}
          onClose={() => setShowModal(false)}
        />
      )}

      <div className="calendar-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#10b981' }}></span>
          <span>Light (0-4)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#f59e0b' }}></span>
          <span>Moderate (5-7)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#f97316' }}></span>
          <span>Heavy (8-9)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#ef4444' }}></span>
          <span>Extreme (10+)</span>
        </div>
      </div>
    </div>
  );
};

export default LoadCalendar;