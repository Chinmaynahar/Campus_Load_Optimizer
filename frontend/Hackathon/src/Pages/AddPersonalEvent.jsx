import React, { useState } from 'react';
import EventForm from './EventForm';
import './AddPersonalEvent.css';

const AddPersonalEvent = ({ onEventAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEventSubmit = (eventData) => {
    if (onEventAdded) {
      onEventAdded(eventData);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <button className="add-event-btn" onClick={handleOpenModal}>
        <span className="btn-icon">+</span>
        Add Personal Event
      </button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="add-event-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Personal Event</h2>
              <button className="close-modal-btn" onClick={handleCloseModal}>
                ×
              </button>
            </div>

            <EventForm 
              onSubmit={handleEventSubmit}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AddPersonalEvent;