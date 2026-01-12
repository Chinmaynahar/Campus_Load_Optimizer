import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import QuickStats from './QuickStats';
import LoadCalendar from './LoadCalendar';
import UpcomingDeadlines from './UpcomingDeadlines';
import AITipsPanel from './AITipsPanel';
import NotificationBell from './NotificationBell';
import AddPersonalEvent from './AddPersonalEvent';
import PersonalEventList from './PersonalEventList';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({
    id: 1,
    name: 'John',
    todayLoad: 7.5,
    weekDeadlines: 8,
    avgLoad: 6.2,
    dangerDays: 3,
    completedTasks: 12
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [personalEvents, setPersonalEvents] = useState([]);
  const [showPersonalEvents, setShowPersonalEvents] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Check authentication on mount
  useEffect(() => {
    const user = localStorage.getItem('studentUser');
    if (!user) {
      // Redirect to login if not authenticated
      navigate('/studentlogin');
      return;
    }

    // Parse user data and set student name
    const userData = JSON.parse(user);
    setStudentData(prev => ({
      ...prev,
      name: userData.username || 'Student'
    }));

    fetchStudentData();
    fetchNotifications();
    fetchPersonalEvents();
  }, [navigate]);

  const fetchStudentData = async () => {
    console.log('Fetching student data...');
  };

  const fetchNotifications = async () => {
    const mockNotifications = [
      { 
        id: 1, 
        type: 'warning', 
        message: 'High load detected on March 15 (9.5/10)', 
        time: '2h ago', 
        read: false 
      },
      { 
        id: 2, 
        type: 'reminder', 
        message: 'Physics assignment due tomorrow', 
        time: '5h ago', 
        read: false 
      },
      { 
        id: 3, 
        type: 'tip', 
        message: 'AI suggests starting Data Structures project early', 
        time: '1d ago', 
        read: true 
      },
      { 
        id: 4, 
        type: 'success', 
        message: 'You completed 5 tasks this week!', 
        time: '2d ago', 
        read: true 
      }
    ];
    setNotifications(mockNotifications);
  };

  const fetchPersonalEvents = async () => {
    const mockEvents = [
      {
        id: 1,
        title: 'Dentist Appointment',
        date: new Date(2024, 2, 18),
        hours: 2,
        type: 'appointment',
        difficulty: 1
      },
      {
        id: 2,
        title: 'Family Dinner',
        date: new Date(2024, 2, 20),
        hours: 3,
        type: 'social',
        difficulty: 1
      }
    ];
    setPersonalEvents(mockEvents);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleEventAdded = (eventData) => {
    const newEvent = {
      id: personalEvents.length + 1,
      ...eventData
    };
    setPersonalEvents(prev => [...prev, newEvent]);
    setRefreshKey(prev => prev + 1);
    
    const notification = {
      id: notifications.length + 1,
      type: 'success',
      message: `Personal event "${eventData.title}" added successfully`,
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const handleEventEdit = (event) => {
    console.log('Editing event:', event);
  };

  const handleEventDelete = (eventId) => {
    setPersonalEvents(prev => prev.filter(e => e.id !== eventId));
    setRefreshKey(prev => prev + 1);
  };

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem('studentUser');
    
    // Add a notification before leaving
    const logoutNotification = {
      id: Date.now(),
      type: 'info',
      message: 'You have been logged out successfully',
      time: 'Just now',
      read: false
    };
    
    // Navigate to login
    navigate('/studentlogin');
  };

  return (
    <div className="student-dashboard">
      <div className="dashboard-nav-bar">
        <div className="nav-left">
          <div className="app-logo">
            <span className="logo-icon">📚</span>
            <span className="logo-text">Student Load Tracker</span>
          </div>
        </div>
        
        <div className="nav-right">
          <AddPersonalEvent onEventAdded={handleEventAdded} />
          <button 
            className="view-events-btn"
            onClick={() => setShowPersonalEvents(!showPersonalEvents)}
          >
            📅 My Events ({personalEvents.length})
          </button>
          <NotificationBell notifications={notifications} />
          <button 
            className="logout-btn"
            onClick={handleLogout}
            title="Logout"
          >
            Logout 🚪
          </button>
        </div>
      </div>

      <DashboardHeader 
        studentName={studentData.name}
        todayLoad={studentData.todayLoad}
      />

      <QuickStats
        weekDeadlines={studentData.weekDeadlines}
        avgLoad={studentData.avgLoad}
        dangerDays={studentData.dangerDays}
        completedTasks={studentData.completedTasks}
      />

      {showPersonalEvents && (
        <div className="personal-events-section">
          <PersonalEventList 
            personalEvents={personalEvents}
            onEdit={handleEventEdit}
            onDelete={handleEventDelete}
          />
        </div>
      )}

      <div className="dashboard-grid">
        <div className="dashboard-column calendar-column">
          <LoadCalendar 
            key={refreshKey}
            onDateSelect={handleDateSelect} 
            personalEvents={personalEvents}
          />
        </div>

        <div className="dashboard-column timeline-column">
          <UpcomingDeadlines selectedDate={selectedDate} />
        </div>

        <div className="dashboard-column tips-column">
          <AITipsPanel studentId={studentData.id} />
        </div>
      </div>

      <footer className="dashboard-footer">
        <p>© 2024 Student Load Tracker | Helping students manage their workload effectively</p>
      </footer>
    </div>
  );
};

export default StudentDashboard;