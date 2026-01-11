// Student Dashboard JavaScript
let currentUser = null;
let dashboardData = null;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', async () => {
    // Check authentication
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
        window.location.href = 'login.html';
        return;
    }
    
    currentUser = JSON.parse(userData);
    if (currentUser.role !== 'student') {
        window.location.href = 'login.html';
        return;
    }
    
    // Initialize theme
    initializeTheme();
    
    // Load dashboard data
    await loadDashboardData();
    
    // Set up event listeners
    setupEventListeners();
});

// Theme functionality
function initializeTheme() {
    const themeToggler = document.querySelector('.theme-toggler');
    const applySavedTheme = () => {
        const isDarkMode = localStorage.getItem('dark-theme') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-theme');
            themeToggler.querySelector('span:nth-child(1)').classList.remove('active');
            themeToggler.querySelector('span:nth-child(2)').classList.add('active');
        } else {
            document.body.classList.remove('dark-theme');
            themeToggler.querySelector('span:nth-child(1)').classList.add('active');
            themeToggler.querySelector('span:nth-child(2)').classList.remove('active');
        }
    };
    
    themeToggler.onclick = function() {
        document.body.classList.toggle('dark-theme');
        const isDarkMode = document.body.classList.contains('dark-theme');
        localStorage.setItem('dark-theme', isDarkMode);
        applySavedTheme();
    };
    
    applySavedTheme();
}

// Load dashboard data from API
async function loadDashboardData() {
    try {
        const response = await fetch(`/api/student/${currentUser.id}/dashboard`);
        dashboardData = await response.json();
        
        // Update UI
        updateStudentInfo();
        renderLoadCalendar();
        renderAIRecommendations();
        renderUpcomingDeadlines();
        renderTodaySchedule();
        renderStudyProgress();
        updateNotificationSystem();
        
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showError('Failed to load dashboard data. Please refresh the page.');
    }
}

// Update student information
function updateStudentInfo() {
    document.getElementById('studentName').textContent = dashboardData.student.name;
    document.getElementById('studentId').textContent = `ID: ${dashboardData.student.studentId}`;
}

// Render cognitive load calendar
function renderLoadCalendar() {
    const calendar = document.getElementById('loadCalendar');
    calendar.innerHTML = '';
    
    dashboardData.loadData.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = `calendar-day ${day.color}`;
        dayElement.onclick = () => showDayDetails(day.date);
        
        const date = new Date(day.date);
        const dayNumber = date.getDate();
        const monthName = date.toLocaleDateString('en-US', { month: 'short' });
        
        dayElement.innerHTML = `
            <div class="day-date">${dayNumber}</div>
            <div class="day-name">${day.dayName.substring(0, 3)}</div>
            <div class="load-score">${day.score}</div>
            <div class="load-indicator">${getLoadLabel(day.score)}</div>
        `;
        
        calendar.appendChild(dayElement);
    });
}

// Get load label based on score
function getLoadLabel(score) {
    if (score <= 40) return 'Safe';
    if (score <= 60) return 'Moderate';
    if (score <= 80) return 'High';
    return 'Critical';
}

// Render AI recommendations
function renderAIRecommendations() {
    const container = document.getElementById('aiRecommendations');
    
    if (!dashboardData.aiRecommendations || dashboardData.aiRecommendations.length === 0) {
        container.innerHTML = `
            <div class="ai-recommendation">
                <div class="recommendation-type">All Good!</div>
                <p>Your workload looks manageable. Keep up the great work! 🎉</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    dashboardData.aiRecommendations.forEach(rec => {
        const recElement = document.createElement('div');
        recElement.className = 'ai-recommendation';
        
        const typeClass = rec.type === 'critical' ? 'danger' : 'warning';
        
        recElement.innerHTML = `
            <div class="recommendation-type ${typeClass}">${rec.type.toUpperCase()}</div>
            <p>${rec.message}</p>
            ${rec.suggestions ? `
                <ul class="recommendation-suggestions">
                    ${rec.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
                </ul>
            ` : ''}
        `;
        
        container.appendChild(recElement);
    });
}

// Render upcoming deadlines with enhanced timeline
function renderUpcomingDeadlines() {
    const container = document.getElementById('upcomingDeadlinesList');
    
    if (!dashboardData.upcomingDeadlines || dashboardData.upcomingDeadlines.length === 0) {
        container.innerHTML = '<div class="free-day">No upcoming deadlines. Enjoy your free time! 😊</div>';
        return;
    }
    
    // Group deadlines by date
    const deadlinesByDate = groupDeadlinesByDate(dashboardData.upcomingDeadlines);
    
    container.innerHTML = '';
    
    // Generate timeline for next 14 days
    const today = new Date();
    for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        
        const dayElement = createTimelineDay(date, dateStr, deadlinesByDate[dateStr] || []);
        container.appendChild(dayElement);
    }
    
    updateQuickStats();
}

// Group deadlines by date
function groupDeadlinesByDate(deadlines) {
    const grouped = {};
    deadlines.forEach(deadline => {
        const dateStr = deadline.dueDate;
        if (!grouped[dateStr]) {
            grouped[dateStr] = [];
        }
        grouped[dateStr].push(deadline);
    });
    return grouped;
}

// Create timeline day element
function createTimelineDay(date, dateStr, deadlines) {
    const dayElement = document.createElement('div');
    dayElement.className = 'timeline-day';
    
    const dayData = dashboardData.loadData.find(d => d.date === dateStr);
    const loadScore = dayData ? dayData.score : 0;
    
    // Create date header
    const dateHeader = document.createElement('div');
    dateHeader.className = 'timeline-date';
    
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dateDisplay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    let loadWarning = '';
    if (loadScore > 80) {
        loadWarning = ' 🔴 CRITICAL OVERLOAD!';
    } else if (loadScore > 60) {
        loadWarning = ' ⚠️ High Load Warning';
    }
    
    dateHeader.innerHTML = `${dayName}, ${dateDisplay} (Load: ${loadScore})${loadWarning}`;
    dayElement.appendChild(dateHeader);
    
    // Create items container
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'timeline-items';
    
    if (deadlines.length === 0) {
        const freeDay = document.createElement('div');
        freeDay.className = 'free-day';
        freeDay.textContent = 'Free day - No deadlines! 🎉';
        itemsContainer.appendChild(freeDay);
    } else {
        deadlines.forEach(deadline => {
            const itemElement = createTimelineItem(deadline);
            itemsContainer.appendChild(itemElement);
        });
        
        // Add load warning if high
        if (loadScore > 60) {
            const warning = document.createElement('div');
            warning.className = loadScore > 80 ? 'load-warning critical' : 'load-warning';
            warning.innerHTML = `
                <span class="material-icons-sharp">warning</span>
                ${loadScore > 80 ? 'Critical overload detected!' : 'High cognitive load - plan accordingly'}
            `;
            itemsContainer.appendChild(warning);
        }
    }
    
    dayElement.appendChild(itemsContainer);
    return dayElement;
}

// Create timeline item element
function createTimelineItem(deadline) {
    const itemElement = document.createElement('div');
    
    // Determine priority class
    let priorityClass = '';
    if (deadline.difficulty >= 4 && deadline.weightage >= 25) {
        priorityClass = 'high-priority';
    } else if (deadline.difficulty >= 3 || deadline.weightage >= 15) {
        priorityClass = 'medium-priority';
    }
    
    itemElement.className = `timeline-item ${priorityClass}`;
    
    const course = dashboardData.courses.find(c => c.id === deadline.courseId);
    const difficultyStars = '★'.repeat(deadline.difficulty) + '☆'.repeat(5 - deadline.difficulty);
    
    itemElement.innerHTML = `
        <div class="timeline-item-header">
            <div class="timeline-item-title">${deadline.title}</div>
            <div class="timeline-item-type">${deadline.type}</div>
        </div>
        <div class="timeline-item-meta">
            <span>📚 ${course ? course.name : deadline.courseId}</span>
            <span>⭐ ${difficultyStars}</span>
            <span>📊 ${deadline.weightage}% of grade</span>
            <span>⏱️ ${deadline.estimatedHours}h estimated</span>
        </div>
    `;
    
    return itemElement;
}

// Update quick stats
function updateQuickStats() {
    const totalDeadlines = dashboardData.upcomingDeadlines.length;
    const avgLoad = Math.round(dashboardData.loadData.slice(0, 7).reduce((sum, day) => sum + day.score, 0) / 7);
    const freeDays = dashboardData.loadData.filter(day => day.score <= 20).length;
    
    document.getElementById('totalDeadlines').textContent = totalDeadlines;
    document.getElementById('avgLoad').textContent = avgLoad;
    document.getElementById('freeDays').textContent = freeDays;
}

// Enhanced notification system
function updateNotificationSystem() {
    const notifications = generateNotifications();
    const count = notifications.length;
    
    document.getElementById('notificationCount').textContent = count;
    document.getElementById('notificationCount').style.display = count > 0 ? 'flex' : 'none';
    
    renderNotificationDropdown(notifications);
}

// Generate notifications based on current data
function generateNotifications() {
    const notifications = [];
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    // Critical overload notifications
    dashboardData.loadData.forEach(day => {
        if (day.score > 80) {
            notifications.push({
                type: 'critical',
                title: 'Critical Overload Alert',
                message: `${day.date === today ? 'Today' : new Date(day.date).toLocaleDateString()} has critical overload (${day.score})`,
                time: 'Now',
                icon: 'error'
            });
        }
    });
    
    // Deadline reminders
    dashboardData.upcomingDeadlines.forEach(deadline => {
        if (deadline.dueDate === today) {
            notifications.push({
                type: 'urgent',
                title: 'Due Today!',
                message: `${deadline.title} is due today`,
                time: 'Now',
                icon: 'today'
            });
        } else if (deadline.dueDate === tomorrowStr) {
            notifications.push({
                type: 'warning',
                title: 'Due Tomorrow',
                message: `${deadline.title} is due tomorrow`,
                time: 'Now',
                icon: 'schedule'
            });
        }
    });
    
    // AI recommendation notifications
    if (dashboardData.aiRecommendations && dashboardData.aiRecommendations.length > 0) {
        notifications.push({
            type: 'info',
            title: 'New AI Suggestions',
            message: `${dashboardData.aiRecommendations.length} new study recommendations available`,
            time: 'Now',
            icon: 'psychology'
        });
    }
    
    return notifications;
}

// Render notification dropdown
function renderNotificationDropdown(notifications) {
    const container = document.getElementById('notificationList');
    
    if (notifications.length === 0) {
        container.innerHTML = '<div class="notification-item">No new notifications</div>';
        return;
    }
    
    container.innerHTML = '';
    notifications.forEach(notification => {
        const notificationElement = document.createElement('div');
        notificationElement.className = 'notification-item';
        
        notificationElement.innerHTML = `
            <div class="notification-title">
                <span class="material-icons-sharp">${notification.icon}</span>
                ${notification.title}
            </div>
            <div class="notification-message">${notification.message}</div>
            <div class="notification-time">${notification.time}</div>
        `;
        
        container.appendChild(notificationElement);
    });
}

// Render today's schedule
function renderTodaySchedule() {
    const container = document.getElementById('todaySchedule');
    const today = new Date().toISOString().split('T')[0];
    
    const todayDeadlines = dashboardData.upcomingDeadlines.filter(d => d.dueDate === today);
    const todayLoad = dashboardData.loadData.find(d => d.date === today);
    
    if (todayDeadlines.length === 0) {
        container.innerHTML = '<div class="free-day">No deadlines today! Perfect day to get ahead. 🌟</div>';
        return;
    }
    
    container.innerHTML = `
        <div class="today-load">
            <strong>Today's Load: ${todayLoad ? todayLoad.score : 0}</strong>
            <span class="load-indicator ${todayLoad ? todayLoad.color : 'green'}">${getLoadLabel(todayLoad ? todayLoad.score : 0)}</span>
        </div>
    `;
    
    todayDeadlines.forEach(deadline => {
        const course = dashboardData.courses.find(c => c.id === deadline.courseId);
        const deadlineElement = document.createElement('div');
        deadlineElement.className = 'progress-item';
        
        deadlineElement.innerHTML = `
            <div>
                <strong>${deadline.title}</strong><br>
                <small>${course ? course.name : deadline.courseId} • ${deadline.type}</small>
            </div>
            <div class="timeline-item-type">${deadline.difficulty}/5</div>
        `;
        
        container.appendChild(deadlineElement);
    });
}

// Render study progress
function renderStudyProgress() {
    const container = document.getElementById('studyProgress');
    
    // Mock progress data - in real implementation, this would track actual progress
    const progressItems = [
        { name: 'Weekly Goals', progress: 65 },
        { name: 'Assignment Completion', progress: 80 },
        { name: 'Study Time Target', progress: 45 },
        { name: 'Load Management', progress: 90 }
    ];
    
    container.innerHTML = '';
    progressItems.forEach(item => {
        const progressElement = document.createElement('div');
        progressElement.className = 'progress-item';
        
        progressElement.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                <small>${item.progress}% complete</small>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${item.progress}%"></div>
            </div>
        `;
        
        container.appendChild(progressElement);
    });
}

// Update notification count
function updateNotificationCount() {
    const count = dashboardData.aiRecommendations ? dashboardData.aiRecommendations.length : 0;
    const criticalDays = dashboardData.loadData.filter(day => day.score > 80).length;
    const totalNotifications = count + criticalDays;
    
    document.getElementById('notificationCount').textContent = totalNotifications;
    document.getElementById('notificationCount').style.display = totalNotifications > 0 ? 'flex' : 'none';
}

// Show day details modal
async function showDayDetails(date) {
    try {
        const response = await fetch(`/api/student/${currentUser.id}/day/${date}`);
        const dayData = await response.json();
        
        const modal = document.getElementById('dayDetailsModal');
        const modalDate = document.getElementById('modalDate');
        const modalContent = document.getElementById('modalContent');
        
        const dateObj = new Date(date);
        modalDate.textContent = dateObj.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        modalContent.innerHTML = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <div style="font-size: 3rem; font-weight: bold; color: ${getScoreColor(dayData.loadScore)};">
                    ${dayData.loadScore}
                </div>
                <div style="font-size: 1.2rem; color: var(--color-info);">
                    ${getLoadLabel(dayData.loadScore)} Load Level
                </div>
            </div>
            
            ${dayData.deadlines.length > 0 ? `
                <h3>Contributing Deadlines:</h3>
                <div style="margin-bottom: 1.5rem;">
                    ${dayData.deadlines.map(deadline => `
                        <div style="padding: 1rem; background: var(--color-light); border-radius: var(--border-radius-1); margin-bottom: 0.5rem;">
                            <strong>${deadline.title}</strong><br>
                            <small>Difficulty: ${deadline.difficulty}/5 • Weight: ${deadline.weightage}% • Hours: ${deadline.estimatedHours}</small>
                        </div>
                    `).join('')}
                </div>
            ` : '<p>No deadlines contributing to this day\'s load.</p>'}
            
            ${dayData.breakdown && dayData.breakdown.length > 0 ? `
                <h3>Load Breakdown:</h3>
                <div>
                    ${dayData.breakdown.map(item => `
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--color-light);">
                            <span>${item.title} (${item.course})</span>
                            <span>${item.contribution} points</span>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        `;
        
        modal.style.display = 'block';
    } catch (error) {
        console.error('Error loading day details:', error);
        showError('Failed to load day details.');
    }
}

// Get color for score
function getScoreColor(score) {
    if (score <= 40) return '#4caf50';
    if (score <= 60) return '#ff9800';
    if (score <= 80) return '#ff5722';
    return '#f44336';
}

// Close day modal
function closeDayModal() {
    document.getElementById('dayDetailsModal').style.display = 'none';
}

// Show add event modal
function showAddEventModal() {
    document.getElementById('addEventModal').style.display = 'block';
    // Set default date to today
    document.getElementById('eventDate').value = new Date().toISOString().split('T')[0];
}

// Close add event modal
function closeAddEventModal() {
    document.getElementById('addEventModal').style.display = 'none';
    document.getElementById('addEventForm').reset();
}

// Setup event listeners
function setupEventListeners() {
    // Notification bell toggle
    document.getElementById('notificationBell').addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = document.getElementById('notificationDropdown');
        dropdown.classList.toggle('active');
    });
    
    // Close notification dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('notificationDropdown');
        if (!e.target.closest('#notificationBell')) {
            dropdown.classList.remove('active');
        }
    });
    
    // Add event form submission
    document.getElementById('addEventForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            title: document.getElementById('eventTitle').value,
            date: document.getElementById('eventDate').value,
            estimatedHours: parseInt(document.getElementById('eventHours').value),
            type: document.getElementById('eventType').value
        };
        
        try {
            const response = await fetch(`/api/student/${currentUser.id}/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                closeAddEventModal();
                await loadDashboardData(); // Refresh data
                showSuccess('Personal event added successfully!');
            } else {
                showError('Failed to add event. Please try again.');
            }
        } catch (error) {
            console.error('Error adding event:', error);
            showError('Network error. Please try again.');
        }
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        const dayModal = document.getElementById('dayDetailsModal');
        const eventModal = document.getElementById('addEventModal');
        
        if (e.target === dayModal) {
            closeDayModal();
        }
        if (e.target === eventModal) {
            closeAddEventModal();
        }
    });
    
    // Profile button toggle
    const profileBtn = document.getElementById('profile-btn');
    const aside = document.querySelector('aside');
    
    profileBtn.onclick = function() {
        aside.classList.toggle('active');
    };
    
    // Remove sidebar on scroll
    window.onscroll = () => {
        aside.classList.remove('active');
        if(window.scrollY > 0) {
            document.querySelector('header').classList.add('active');
        } else {
            document.querySelector('header').classList.remove('active');
        }
    };
    
    // Auto-refresh data every 5 minutes
    setInterval(async () => {
        await loadDashboardData();
    }, 5 * 60 * 1000);
}

// Utility functions
function showError(message) {
    // Simple error display - could be enhanced with a proper notification system
    alert('Error: ' + message);
}

function showSuccess(message) {
    // Simple success display - could be enhanced with a proper notification system
    alert('Success: ' + message);
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}