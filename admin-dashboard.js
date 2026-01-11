// Admin Dashboard JavaScript
let currentUser = null;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', async () => {
    // Check authentication
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
        window.location.href = 'login.html';
        return;
    }
    
    currentUser = JSON.parse(userData);
    if (currentUser.role !== 'admin') {
        window.location.href = 'login.html';
        return;
    }
    
    // Initialize theme
    initializeTheme();
    
    // Load dashboard data
    loadDashboardData();
    
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

// Load dashboard data
function loadDashboardData() {
    // Mock data for demonstration
    const mockData = {
        totalStudents: 1247,
        totalProfessors: 89,
        totalCourses: 156,
        criticalAlerts: 12
    };
    
    // Update overview cards
    document.getElementById('totalStudents').textContent = mockData.totalStudents.toLocaleString();
    document.getElementById('totalProfessors').textContent = mockData.totalProfessors;
    document.getElementById('totalCourses').textContent = mockData.totalCourses;
    document.getElementById('criticalAlerts').textContent = mockData.criticalAlerts;
    
    // Update admin name
    document.getElementById('adminName').textContent = currentUser.name;
    
    // Load configuration values
    loadConfiguration();
}

// Load configuration values
function loadConfiguration() {
    // Load from localStorage or use defaults
    const config = JSON.parse(localStorage.getItem('systemConfig')) || {
        safeThreshold: 40,
        moderateThreshold: 60,
        highThreshold: 80,
        difficultyWeight: 10,
        weightageDiv: 2,
        hoursWeight: 2
    };
    
    document.getElementById('safeThreshold').value = config.safeThreshold;
    document.getElementById('moderateThreshold').value = config.moderateThreshold;
    document.getElementById('highThreshold').value = config.highThreshold;
    document.getElementById('difficultyWeight').value = config.difficultyWeight;
    document.getElementById('weightageDiv').value = config.weightageDiv;
    document.getElementById('hoursWeight').value = config.hoursWeight;
    
    updateFormulaDisplay();
}

// Update formula display
function updateFormulaDisplay() {
    const diffWeight = document.getElementById('difficultyWeight').value;
    const weightDiv = document.getElementById('weightageDiv').value;
    const hoursWeight = document.getElementById('hoursWeight').value;
    
    document.getElementById('diffDisplay').textContent = diffWeight;
    document.getElementById('weightDisplay').textContent = weightDiv;
    document.getElementById('hoursDisplay').textContent = hoursWeight;
}

// Save configuration
function saveConfiguration() {
    const config = {
        safeThreshold: parseInt(document.getElementById('safeThreshold').value),
        moderateThreshold: parseInt(document.getElementById('moderateThreshold').value),
        highThreshold: parseInt(document.getElementById('highThreshold').value),
        difficultyWeight: parseInt(document.getElementById('difficultyWeight').value),
        weightageDiv: parseInt(document.getElementById('weightageDiv').value),
        hoursWeight: parseInt(document.getElementById('hoursWeight').value)
    };
    
    // Validate thresholds
    if (config.safeThreshold >= config.moderateThreshold || 
        config.moderateThreshold >= config.highThreshold) {
        showError('Invalid threshold values. Please ensure: Safe < Moderate < High');
        return;
    }
    
    // Save to localStorage (in production, this would be an API call)
    localStorage.setItem('systemConfig', JSON.stringify(config));
    
    showSuccess('Configuration saved successfully! Changes will take effect on next load calculation.');
    
    // Update formula display
    updateFormulaDisplay();
}

// Reset to defaults
function resetToDefaults() {
    if (confirm('Are you sure you want to reset all configuration to default values?')) {
        document.getElementById('safeThreshold').value = 40;
        document.getElementById('moderateThreshold').value = 60;
        document.getElementById('highThreshold').value = 80;
        document.getElementById('difficultyWeight').value = 10;
        document.getElementById('weightageDiv').value = 2;
        document.getElementById('hoursWeight').value = 2;
        
        updateFormulaDisplay();
        showSuccess('Configuration reset to default values.');
    }
}

// Show system configuration section
function showSystemConfig() {
    document.getElementById('systemConfig').scrollIntoView({ behavior: 'smooth' });
}

// Setup event listeners
function setupEventListeners() {
    // Configuration input changes
    const configInputs = document.querySelectorAll('.config-input');
    configInputs.forEach(input => {
        input.addEventListener('input', updateFormulaDisplay);
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
}

// Generate system report (placeholder)
function generateSystemReport() {
    showSuccess('System report generation started. You will receive an email when complete.');
}

// Export data (placeholder)
function exportSystemData() {
    showSuccess('Data export initiated. Download will begin shortly.');
}

// Send system-wide notification (placeholder)
function sendSystemNotification() {
    const message = prompt('Enter notification message for all users:');
    if (message) {
        showSuccess(`Notification sent to all ${document.getElementById('totalStudents').textContent} students and ${document.getElementById('totalProfessors').textContent} professors.`);
    }
}

// Utility functions
function showError(message) {
    alert('Error: ' + message);
}

function showSuccess(message) {
    alert('Success: ' + message);
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Advanced admin functions (placeholders for future implementation)
function viewDetailedAnalytics() {
    showSuccess('Detailed analytics dashboard coming soon!');
}

function manageUserAccounts() {
    showSuccess('User management interface coming soon!');
}

function configureDepartments() {
    showSuccess('Department configuration coming soon!');
}

function viewSystemLogs() {
    showSuccess('System logs viewer coming soon!');
}

function backupSystem() {
    if (confirm('Are you sure you want to create a system backup?')) {
        showSuccess('System backup initiated. This may take several minutes.');
    }
}

function restoreSystem() {
    if (confirm('WARNING: This will restore the system from the last backup. All recent data may be lost. Continue?')) {
        showSuccess('System restore initiated. Please do not close this window.');
    }
}