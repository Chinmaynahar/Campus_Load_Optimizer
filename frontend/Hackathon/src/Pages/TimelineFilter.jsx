import React, { useState } from 'react';
import './TimelineFilter.css';

const TimelineFilter = ({ onFilterChange, currentFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const courses = [
    'All Courses',
    'Data Structures',
    'Calculus II',
    'Physics',
    'English Lit',
    'Chemistry'
  ];

  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'assignment', label: 'Assignments' },
    { value: 'exam', label: 'Exams' },
    { value: 'project', label: 'Projects' },
    { value: 'lab', label: 'Labs' },
    { value: 'quiz', label: 'Quizzes' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Due Date' },
    { value: 'difficulty', label: 'Difficulty' }
  ];

  const handleCourseChange = (e) => {
    const value = e.target.value === 'All Courses' ? 'all' : e.target.value;
    onFilterChange({ course: value });
  };

  const handleTypeChange = (e) => {
    onFilterChange({ type: e.target.value });
  };

  const handleSortChange = (e) => {
    onFilterChange({ sortBy: e.target.value });
  };

  const handleClearFilters = () => {
    onFilterChange({ course: 'all', type: 'all', sortBy: 'date' });
  };

  const hasActiveFilters = currentFilters.course !== 'all' || currentFilters.type !== 'all';

  return (
    <div className="timeline-filter">
      <button 
        className="filter-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        🔍 Filters {hasActiveFilters && <span className="active-indicator">•</span>}
      </button>

      {isExpanded && (
        <div className="filter-controls">
          <div className="filter-group">
            <label htmlFor="course-filter">Course</label>
            <select
              id="course-filter"
              value={currentFilters.course === 'all' ? 'All Courses' : currentFilters.course}
              onChange={handleCourseChange}
              className="filter-select"
            >
              {courses.map(course => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="type-filter">Type</label>
            <select
              id="type-filter"
              value={currentFilters.type}
              onChange={handleTypeChange}
              className="filter-select"
            >
              {types.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sort-filter">Sort By</label>
            <select
              id="sort-filter"
              value={currentFilters.sortBy}
              onChange={handleSortChange}
              className="filter-select"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button 
              className="clear-filters-btn"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TimelineFilter;