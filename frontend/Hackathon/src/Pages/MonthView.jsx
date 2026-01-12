import React from 'react';
import DayCell from './DayCell';
import './MonthView.css';

const MonthView = ({ currentDate, loadData, onDayClick }) => {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    let firstDayOfWeek = firstDay.getDay();
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    const daysInMonth = lastDay.getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    
    const days = [];
    
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        load: 0,
        deadlines: 0
      });
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        load: loadData[i]?.load || 0,
        deadlines: loadData[i]?.deadlines || 0,
        isToday: isToday(year, month, i)
      });
    }
    
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        load: 0,
        deadlines: 0
      });
    }
    
    return days;
  };

  const isToday = (year, month, day) => {
    const today = new Date();
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="month-view">
      <div className="week-headers">
        {weekDays.map(day => (
          <div key={day} className="week-header">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {calendarDays.map((dayData, index) => (
          <DayCell
            key={index}
            day={dayData.day}
            load={dayData.load}
            deadlines={dayData.deadlines}
            isToday={dayData.isToday}
            isCurrentMonth={dayData.isCurrentMonth}
            onClick={onDayClick}
          />
        ))}
      </div>
    </div>
  );
};

export default MonthView;