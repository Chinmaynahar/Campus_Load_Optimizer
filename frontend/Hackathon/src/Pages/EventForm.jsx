import React, { useState } from 'react';
import './EventForm.css';

const EventForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    date: '',
    hours: '',
    type: 'other',
    difficulty: 1
  });

  const [errors, setErrors] = useState({});

  const eventTypes = [
    { value: 'appointment', label: 'Appointment' },
    { value: 'social', label: 'Social' },
    { value: 'health', label: 'Health/Fitness' },
    { value: 'work', label: 'Work' },
    { value: 'other', label: 'Other' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.hours || formData.hours <= 0) {
      newErrors.hours = 'Hours must be greater than 0';
    } else if (formData.hours > 24) {
      newErrors.hours = 'Hours cannot exceed 24';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const eventData = {
        ...formData,
        hours: parseFloat(formData.hours),
        difficulty: parseInt(formData.difficulty),
        date: new Date(formData.date)
      };

      onSubmit(eventData);
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Event Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Dentist Appointment"
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="date">Date *</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={errors.date ? 'error' : ''}
        />
        {errors.date && <span className="error-message">{errors.date}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="hours">Estimated Hours *</label>
          <input
            type="number"
            id="hours"
            name="hours"
            value={formData.hours}
            onChange={handleChange}
            placeholder="2.5"
            step="0.5"
            min="0"
            max="24"
            className={errors.hours ? 'error' : ''}
          />
          {errors.hours && <span className="error-message">{errors.hours}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            {eventTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="difficulty">
          Difficulty (Optional)
          <span className="difficulty-label">
            {formData.difficulty === 1 && ' - Very Easy'}
            {formData.difficulty === 2 && ' - Easy'}
            {formData.difficulty === 3 && ' - Moderate'}
            {formData.difficulty === 4 && ' - Hard'}
            {formData.difficulty === 5 && ' - Very Hard'}
          </span>
        </label>
        <input
          type="range"
          id="difficulty"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          min="1"
          max="5"
          step="1"
          className="difficulty-slider"
        />
        <div className="difficulty-marks">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="submit-btn">
          {initialData ? 'Update Event' : 'Add Event'}
        </button>
      </div>
    </form>
  );
};

export default EventForm;