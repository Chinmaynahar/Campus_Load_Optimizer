import React, { useState, useEffect } from 'react';
import DeadlineCard from './DeadlineCard';
import TimelineFilter from './TimelineFilter';
import './UpcomingDeadlines.css';

const UpcomingDeadlines = ({ selectedDate }) => {
  const [deadlines, setDeadlines] = useState([]);
  const [filteredDeadlines, setFilteredDeadlines] = useState([]);
  const [filters, setFilters] = useState({
    course: 'all',
    type: 'all',
    sortBy: 'date'
  });

  useEffect(() => {
    fetchUpcomingDeadlines();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [deadlines, filters, selectedDate]);

  const fetchUpcomingDeadlines = async () => {
    // Simulate API call
    const mockDeadlines = generateMockDeadlines();
    setDeadlines(mockDeadlines);
  };

  const generateMockDeadlines = () => {
    const courses = ['Data Structures', 'Calculus II', 'Physics', 'English Lit', 'Chemistry'];
    const types = ['assignment', 'exam', 'project', 'lab', 'quiz'];
    const titles = ['Assignment', 'Midterm', 'Final Project', 'Lab Report', 'Quiz'];
    
    const items = [];
    for (let i = 0; i < 15; i++) {
      const daysAhead = Math.floor(Math.random() * 14);
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + daysAhead);
      
      items.push({
        id: i + 1,
        course: courses[Math.floor(Math.random() * courses.length)],
        title: `${titles[Math.floor(Math.random() * titles.length)]} ${i + 1}`,
        type: types[Math.floor(Math.random() * types.length)],
        difficulty: Math.floor(Math.random() * 5) + 1,
        dueDate: dueDate,
        estimatedHours: Math.floor(Math.random() * 8) + 1,
        completed: false
      });
    }
    
    return items.sort((a, b) => a.dueDate - b.dueDate);
  };

  const applyFilters = () => {
    let filtered = [...deadlines];

    if (selectedDate) {
      filtered = filtered.filter(d => 
        d.dueDate.toDateString() === selectedDate.toDateString()
      );
    }

    if (filters.course !== 'all') {
      filtered = filtered.filter(d => d.course === filters.course);
    }

    if (filters.type !== 'all') {
      filtered = filtered.filter(d => d.type === filters.type);
    }

    if (filters.sortBy === 'difficulty') {
      filtered.sort((a, b) => b.difficulty - a.difficulty);
    } else if (filters.sortBy === 'date') {
      filtered.sort((a, b) => a.dueDate - b.dueDate);
    }

    setFilteredDeadlines(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const groupByDate = () => {
    const grouped = {};
    
    filteredDeadlines.forEach(deadline => {
      const dateKey = deadline.dueDate.toDateString();
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(deadline);
    });

    return grouped;
  };

  const groupedDeadlines = groupByDate();

  return (
    <div className="upcoming-deadlines">
      <div className="timeline-header">
        <h2>Upcoming Deadlines</h2>
        <span className="deadline-count">{filteredDeadlines.length} items</span>
      </div>

      <TimelineFilter 
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />

      <div className="timeline-content">
        {Object.keys(groupedDeadlines).length > 0 ? (
          Object.entries(groupedDeadlines).map(([date, items]) => (
            <div key={date} className="date-group">
              <div className="date-header">
                <h3>{formatDateHeader(new Date(date))}</h3>
                <span className="items-count">{items.length}</span>
              </div>
              <div className="deadline-cards">
                {items.map(deadline => (
                  <DeadlineCard key={deadline.id} deadline={deadline} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="no-deadlines-message">
            <div className="empty-icon">📅</div>
            <h3>No deadlines found</h3>
            <p>You're all caught up! Enjoy your free time.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const formatDateHeader = (date) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  }
};

export default UpcomingDeadlines;