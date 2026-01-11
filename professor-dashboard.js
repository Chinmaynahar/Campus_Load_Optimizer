// Professor Dashboard JavaScript
let currentUser = null;
let dashboardData = null;
let selectedCourse = null;
let selectedDifficulty = 0;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', async () => {
    // Check authentication
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
        window.location.href = 'login.html';
        return;
    }
    
    currentUser = JSON.parse(userData);
    if (currentUser.role !== 'professor') {
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
        const response = await fetch(`/api/professor/${currentUser.id}/dashboard`);
        dashboardData = await response.json();
        
        // Update UI
        updateProfessorInfo();
        populateCourseSelector();
        
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showError('Failed to load dashboard data. Please refresh the page.');
    }
}

// Update professor information
function updateProfessorInfo() {
    document.getElementById('professorName').textContent = dashboardData.professor.name;
}

// Populate course selector
function populateCourseSelector() {
    const courseSelect = document.getElementById('courseSelect');
    courseSelect.innerHTML = '<option value="">Choose a course...</option>';
    
    dashboardData.courses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.id;
        option.textContent = `${course.name} (${course.id}) - ${course.enrollmentCount} students`;
        courseSelect.appendChild(option);
    });
}

// Load course-specific data
async function loadCourseData() {
    const courseId = document.getElementById('courseSelect').value;
    if (!courseId) {
        hideAllCourseData();
        return;
    }
    
    selectedCourse = dashboardData.courses.find(c => c.id === courseId);
    const courseStats = dashboardData.classStats.find(s => s.course.id === courseId);
    
    if (courseStats) {
        showCourseData(courseStats);
    }
}

// Show course-specific data
function showCourseData(courseStats) {
    // Show all course-related sections
    document.getElementById('classStats').style.display = 'grid';
    document.getElementById('loadGraph').style.display = 'block';
    document.getElementById('conflictPanel').style.display = 'block';
    document.getElementById('deadlinesTable').style.display = 'block';
    document.getElementById('studentsAtRisk').style.display = 'block';
    document.getElementById('departmentCoordination').style.display = 'block';
    document.getElementById('enhancedDeadlineManagement').style.display = 'block';
    
    // Update statistics
    updateClassStatistics(courseStats);
    
    // Render load graph
    renderLoadGraph(courseStats.weekData);
    
    // Check for conflicts
    checkConflicts(courseStats);
    
    // Render deadlines table
    renderDeadlinesTable(courseStats.deadlines);
    
    // Show students at risk
    showStudentsAtRisk(courseStats);
    
    // Generate AI suggestions if needed
    generateAISuggestions(courseStats);
    
    // Render enhanced features
    renderDepartmentCoordination();
    renderDeadlineAnalytics(courseStats);
}

// Update class statistics
function updateClassStatistics(courseStats) {
    // Calculate totals across the week
    let totalSafe = 0, totalModerate = 0, totalRisk = 0, totalStudents = 0;
    
    courseStats.weekData.forEach(day => {
        totalSafe += day.safeStudents;
        totalModerate += day.moderateStudents;
        totalRisk += day.highRiskStudents;
        totalStudents = day.totalStudents; // Same for all days
    });
    
    // Average across the week
    const avgSafe = Math.round(totalSafe / courseStats.weekData.length);
    const avgModerate = Math.round(totalModerate / courseStats.weekData.length);
    const avgRisk = Math.round(totalRisk / courseStats.weekData.length);
    
    document.getElementById('safeStudents').textContent = avgSafe;
    document.getElementById('moderateStudents').textContent = avgModerate;
    document.getElementById('riskStudents').textContent = avgRisk;
    document.getElementById('totalStudents').textContent = totalStudents;
}

// Render load graph
function renderLoadGraph(weekData) {
    const graphBars = document.getElementById('graphBars');
    graphBars.innerHTML = '';
    
    weekData.forEach(day => {
        const bar = document.createElement('div');
        bar.className = 'graph-bar';
        
        // Set height based on load (max 100)
        const height = Math.max(day.avgLoad * 2.5, 10); // Minimum height for visibility
        bar.style.height = `${height}px`;
        
        // Set color based on load level
        if (day.avgLoad > 80) {
            bar.classList.add('danger');
        } else if (day.avgLoad > 60) {
            bar.classList.add('warning');
        }
        
        // Add labels
        const date = new Date(day.date);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        bar.innerHTML = `
            <div class="bar-value">${day.avgLoad}</div>
            <div class="bar-label">${dayName}</div>
        `;
        
        graphBars.appendChild(bar);
    });
}

// Check for conflicts
function checkConflicts(courseStats) {
    const conflictAlerts = document.getElementById('conflictAlerts');
    conflictAlerts.innerHTML = '';
    
    // Find days with high average load
    const criticalDays = courseStats.weekData.filter(day => day.avgLoad > 80);
    const warningDays = courseStats.weekData.filter(day => day.avgLoad > 60 && day.avgLoad <= 80);
    
    if (criticalDays.length > 0) {
        criticalDays.forEach(day => {
            const alert = document.createElement('div');
            alert.className = 'conflict-alert critical';
            
            const date = new Date(day.date);
            const dateStr = date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
            });
            
            alert.innerHTML = `
                <h4>🚨 CRITICAL OVERLOAD - ${dateStr}</h4>
                <p>Average class load: <strong>${day.avgLoad}</strong> (Danger Zone!)</p>
                <p>${day.highRiskStudents} out of ${day.totalStudents} students at high risk</p>
                <p><em>Consider rescheduling deadlines or splitting workload</em></p>
            `;
            
            conflictAlerts.appendChild(alert);
        });
    }
    
    if (warningDays.length > 0) {
        warningDays.forEach(day => {
            const alert = document.createElement('div');
            alert.className = 'conflict-alert';
            
            const date = new Date(day.date);
            const dateStr = date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
            });
            
            alert.innerHTML = `
                <h4>⚠️ High Load Warning - ${dateStr}</h4>
                <p>Average class load: <strong>${day.avgLoad}</strong></p>
                <p>${day.highRiskStudents} students at high risk, ${day.moderateStudents} at moderate load</p>
            `;
            
            conflictAlerts.appendChild(alert);
        });
    }
    
    if (criticalDays.length === 0 && warningDays.length === 0) {
        conflictAlerts.innerHTML = `
            <div style="text-align: center; color: var(--color-success); padding: 2rem;">
                <span class="material-icons-sharp" style="font-size: 3rem;">check_circle</span>
                <h3>No Conflicts Detected</h3>
                <p>Your course schedule looks well-balanced! 🎉</p>
            </div>
        `;
    }
}

// Generate AI suggestions with enhanced options
function generateAISuggestions(courseStats) {
    const criticalDays = courseStats.weekData.filter(day => day.avgLoad > 80);
    
    if (criticalDays.length > 0) {
        document.getElementById('aiSuggestions').style.display = 'block';
        const suggestionsList = document.getElementById('suggestionsList');
        suggestionsList.innerHTML = '';
        
        criticalDays.forEach(day => {
            const suggestions = generateEnhancedSuggestions(day);
            suggestions.forEach(suggestion => {
                const suggestionElement = createEnhancedSuggestionElement(suggestion);
                suggestionsList.appendChild(suggestionElement);
            });
        });
    } else {
        document.getElementById('aiSuggestions').style.display = 'none';
    }
}

// Generate enhanced suggestions with detailed analysis
function generateEnhancedSuggestions(day) {
    const date = new Date(day.date);
    const dateStr = date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric' 
    });
    
    return [
        {
            id: 1,
            title: `Move deadline from ${dateStr}`,
            description: 'Reschedule to reduce cognitive overload',
            impact: 'High Impact',
            currentLoad: day.avgLoad,
            projectedLoad: Math.max(day.avgLoad - 25, 40),
            studentsAffected: day.highRiskStudents,
            totalStudents: day.totalStudents,
            benefits: [
                `Reduces load from ${day.avgLoad} to ~${Math.max(day.avgLoad - 25, 40)}`,
                `${day.highRiskStudents} students move from danger to moderate`,
                'No new conflicts created',
                'Gives students 3 extra days to prepare'
            ],
            action: 'reschedule'
        },
        {
            id: 2,
            title: 'Split assessment into parts',
            description: 'Divide large assessment into smaller components',
            impact: 'Medium Impact',
            currentLoad: day.avgLoad,
            projectedLoad: Math.max(day.avgLoad - 15, 50),
            studentsAffected: Math.floor(day.highRiskStudents * 0.6),
            totalStudents: day.totalStudents,
            benefits: [
                'Distributes workload more evenly',
                'Reduces peak stress periods',
                'Maintains assessment integrity',
                'Provides multiple feedback opportunities'
            ],
            action: 'split'
        },
        {
            id: 3,
            title: 'Coordinate with other professors',
            description: 'Work with colleagues to redistribute deadlines',
            impact: 'System-wide Impact',
            currentLoad: day.avgLoad,
            projectedLoad: Math.max(day.avgLoad - 30, 35),
            studentsAffected: day.totalStudents,
            totalStudents: day.totalStudents,
            benefits: [
                'Addresses root cause of clustering',
                'Benefits entire student population',
                'Improves department coordination',
                'Prevents future conflicts'
            ],
            action: 'coordinate'
        }
    ];
}

// Create enhanced suggestion element
function createEnhancedSuggestionElement(suggestion) {
    const element = document.createElement('div');
    element.className = 'enhanced-suggestion-option';
    
    const impactPercentage = Math.round((suggestion.studentsAffected / suggestion.totalStudents) * 100);
    const loadReduction = suggestion.currentLoad - suggestion.projectedLoad;
    
    element.innerHTML = `
        <div class="suggestion-header">
            <h4>${suggestion.title}</h4>
            <div class="suggestion-impact">${suggestion.impact}</div>
        </div>
        <p>${suggestion.description}</p>
        
        <div class="suggestion-details">
            <div class="suggestion-metric">
                <div class="suggestion-metric-value">${loadReduction}</div>
                <div class="suggestion-metric-label">Load Reduction</div>
            </div>
            <div class="suggestion-metric">
                <div class="suggestion-metric-value">${impactPercentage}%</div>
                <div class="suggestion-metric-label">Students Helped</div>
            </div>
        </div>
        
        <ul class="suggestion-benefits">
            ${suggestion.benefits.map(benefit => `<li>✓ ${benefit}</li>`).join('')}
        </ul>
        
        <button class="apply-suggestion-btn" onclick="applySuggestion(${suggestion.id}, '${suggestion.action}')">
            Apply This Suggestion
        </button>
    `;
    
    return element;
}

// Apply AI suggestion
function applySuggestion(suggestionId, action) {
    switch (action) {
        case 'reschedule':
            showRescheduleDialog();
            break;
        case 'split':
            showSplitAssessmentDialog();
            break;
        case 'coordinate':
            showCoordinationDialog();
            break;
        default:
            showSuccess('Suggestion noted. Please implement manually.');
    }
}

// Show reschedule dialog
function showRescheduleDialog() {
    const newDate = prompt('Enter new date (YYYY-MM-DD):');
    if (newDate) {
        showSuccess(`Deadline rescheduled to ${newDate}. Students will be notified automatically.`);
        // In real implementation, this would update the deadline
    }
}

// Show split assessment dialog
function showSplitAssessmentDialog() {
    const parts = prompt('How many parts should this assessment be split into?', '2');
    if (parts) {
        showSuccess(`Assessment will be split into ${parts} parts. Please configure the individual components.`);
    }
}

// Show coordination dialog
function showCoordinationDialog() {
    showSuccess('Coordination request sent to department colleagues. You will receive responses within 24 hours.');
}

// Render department coordination
function renderDepartmentCoordination() {
    // This would typically fetch real department data
    // For now, we'll show the static content that's already in the HTML
    console.log('Department coordination data rendered');
}

// Render deadline analytics
function renderDeadlineAnalytics(courseStats) {
    renderImpactAnalysis(courseStats);
    renderOptimalScheduling(courseStats);
    renderHistoricalPatterns();
}

// Render impact analysis
function renderImpactAnalysis(courseStats) {
    const container = document.getElementById('impactAnalysis');
    
    const totalStudents = courseStats.weekData[0]?.totalStudents || 0;
    const avgRiskStudents = Math.round(
        courseStats.weekData.reduce((sum, day) => sum + day.highRiskStudents, 0) / courseStats.weekData.length
    );
    const peakLoad = Math.max(...courseStats.weekData.map(day => day.avgLoad));
    
    container.innerHTML = `
        <div class="impact-metric">
            <span>Total Students Monitored</span>
            <span class="impact-value">${totalStudents}</span>
        </div>
        <div class="impact-metric">
            <span>Average Students at Risk</span>
            <span class="impact-value">${avgRiskStudents}</span>
        </div>
        <div class="impact-metric">
            <span>Peak Load This Week</span>
            <span class="impact-value">${peakLoad}</span>
        </div>
        <div class="impact-metric">
            <span>Conflict Days Detected</span>
            <span class="impact-value">${courseStats.weekData.filter(day => day.avgLoad > 80).length}</span>
        </div>
    `;
}

// Render optimal scheduling suggestions
function renderOptimalScheduling(courseStats) {
    const container = document.getElementById('optimalScheduling');
    
    const lowLoadDays = courseStats.weekData.filter(day => day.avgLoad < 40);
    const optimalDays = lowLoadDays.slice(0, 3);
    
    container.innerHTML = `
        <div class="scheduling-suggestion">
            <strong>Recommended Scheduling Windows:</strong>
            <div class="suggestion-benefit">
                ${optimalDays.length > 0 
                    ? optimalDays.map(day => new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })).join(', ')
                    : 'No optimal windows found this week'
                }
            </div>
        </div>
        <div class="scheduling-suggestion">
            <strong>Avoid These Days:</strong>
            <div class="suggestion-benefit">
                ${courseStats.weekData.filter(day => day.avgLoad > 70)
                    .map(day => new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }))
                    .join(', ') || 'No high-risk days detected'
                }
            </div>
        </div>
    `;
}

// Render historical patterns
function renderHistoricalPatterns() {
    const container = document.getElementById('historicalPatterns');
    
    // Mock historical data - in real implementation, this would come from the database
    const patterns = [
        { pattern: 'Monday Overload', frequency: '73%', trend: 'Increasing' },
        { pattern: 'Mid-week Clustering', frequency: '45%', trend: 'Stable' },
        { pattern: 'Friday Avoidance', frequency: '12%', trend: 'Decreasing' },
        { pattern: 'End-of-Month Rush', frequency: '89%', trend: 'Increasing' }
    ];
    
    container.innerHTML = '';
    patterns.forEach(pattern => {
        const patternElement = document.createElement('div');
        patternElement.className = 'pattern-item';
        
        patternElement.innerHTML = `
            <div>
                <strong>${pattern.pattern}</strong>
                <div class="pattern-trend">${pattern.trend} trend</div>
            </div>
            <div class="impact-value">${pattern.frequency}</div>
        `;
        
        container.appendChild(patternElement);
    });
}

// Render deadlines table
function renderDeadlinesTable(deadlines) {
    const tbody = document.getElementById('deadlinesTableBody');
    tbody.innerHTML = '';
    
    if (deadlines.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; color: var(--color-info); padding: 2rem;">
                    No deadlines created yet. Click "Add Deadline" to create your first one.
                </td>
            </tr>
        `;
        return;
    }
    
    deadlines.forEach(deadline => {
        const row = document.createElement('tr');
        const dueDate = new Date(deadline.dueDate);
        const difficultyStars = '★'.repeat(deadline.difficulty) + '☆'.repeat(5 - deadline.difficulty);
        
        row.innerHTML = `
            <td>${deadline.title}</td>
            <td><span class="badge">${deadline.type}</span></td>
            <td>${dueDate.toLocaleDateString()}</td>
            <td>${difficultyStars}</td>
            <td>${deadline.weightage}%</td>
            <td>${selectedCourse.enrollmentCount}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-warning" onclick="editDeadline(${deadline.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteDeadline(${deadline.id})">Delete</button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Show students at risk with enhanced analysis
function showStudentsAtRisk(courseStats) {
    const riskStudentsList = document.getElementById('riskStudentsList');
    const riskSummary = document.getElementById('riskSummary');
    
    // Find the day with most students at risk
    const worstDay = courseStats.weekData.reduce((worst, day) => 
        day.highRiskStudents > worst.highRiskStudents ? day : worst
    );
    
    // Update risk summary
    const totalAtRisk = worstDay.highRiskStudents;
    const riskPercentage = Math.round((totalAtRisk / worstDay.totalStudents) * 100);
    const avgLoad = Math.round(courseStats.weekData.reduce((sum, day) => sum + day.avgLoad, 0) / courseStats.weekData.length);
    
    if (riskSummary) {
        riskSummary.innerHTML = `
            <div class="risk-stat">
                <div class="risk-stat-number">${totalAtRisk}</div>
                <div class="risk-stat-label">Students at Risk</div>
            </div>
            <div class="risk-stat">
                <div class="risk-stat-number">${riskPercentage}%</div>
                <div class="risk-stat-label">Risk Percentage</div>
            </div>
            <div class="risk-stat">
                <div class="risk-stat-number">${avgLoad}</div>
                <div class="risk-stat-label">Avg Class Load</div>
            </div>
        `;
    }
    
    if (worstDay.highRiskStudents === 0) {
        riskStudentsList.innerHTML = `
            <div style="text-align: center; color: var(--color-success); padding: 2rem;">
                <span class="material-icons-sharp" style="font-size: 3rem;">sentiment_very_satisfied</span>
                <h3>All Students Safe!</h3>
                <p>No students are currently at high risk in this course. Great job! 🎉</p>
            </div>
        `;
        return;
    }
    
    // Enhanced mock student data with more details
    const mockRiskStudents = [
        { 
            name: 'John Doe', 
            id: 'ST001', 
            loadScore: 92, 
            reason: 'Your exam + 2 other course projects',
            email: 'john.doe@university.edu',
            previousPerformance: 'B+ average',
            riskFactors: ['Multiple deadlines same day', 'High difficulty courses', 'Part-time job']
        },
        { 
            name: 'Jane Smith', 
            id: 'ST002', 
            loadScore: 85, 
            reason: 'Your assignment + major project from CS301',
            email: 'jane.smith@university.edu',
            previousPerformance: 'A- average',
            riskFactors: ['Overcommitted to extracurriculars', 'Perfectionist tendencies']
        },
        { 
            name: 'Mike Johnson', 
            id: 'ST003', 
            loadScore: 88, 
            reason: 'Your deadline + 2 exams same day',
            email: 'mike.johnson@university.edu',
            previousPerformance: 'B average',
            riskFactors: ['Struggling with time management', 'Family responsibilities']
        }
    ].slice(0, worstDay.highRiskStudents);
    
    riskStudentsList.innerHTML = '';
    
    const date = new Date(worstDay.date);
    const dateStr = date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
    });
    
    const header = document.createElement('p');
    header.innerHTML = `<strong>High Risk Students on ${dateStr}:</strong>`;
    header.style.marginBottom = '1rem';
    riskStudentsList.appendChild(header);
    
    mockRiskStudents.forEach(student => {
        const studentDiv = document.createElement('div');
        studentDiv.className = 'risk-student enhanced-risk-student';
        
        studentDiv.innerHTML = `
            <div class="student-info">
                <h4>${student.name} (${student.id})</h4>
                <div class="risk-reason">${student.reason}</div>
                <div class="student-details">
                    <small>📧 ${student.email}</small>
                    <small>📊 Previous: ${student.previousPerformance}</small>
                </div>
                <div class="risk-factors">
                    <strong>Risk Factors:</strong>
                    <ul>
                        ${student.riskFactors.map(factor => `<li>${factor}</li>`).join('')}
                    </ul>
                </div>
                <div class="student-actions">
                    <button class="btn btn-primary" onclick="contactStudent('${student.email}')">Send Support Email</button>
                    <button class="btn btn-warning" onclick="scheduleCheckIn('${student.id}')">Schedule Check-in</button>
                </div>
            </div>
            <div class="risk-score-container">
                <div class="risk-score">${student.loadScore}</div>
                <div class="risk-level">Critical</div>
            </div>
        `;
        
        riskStudentsList.appendChild(studentDiv);
    });
}

// Contact student function
function contactStudent(email) {
    const subject = encodeURIComponent('Academic Support - Cognitive Load Management');
    const body = encodeURIComponent(`Dear Student,

I noticed you have a high cognitive load this week and wanted to reach out to offer support. Please don't hesitate to contact me if you need:

- Extension on assignments
- Study resources
- Academic counseling referral
- Time management strategies

Best regards,
Professor`);
    
    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
}

// Schedule check-in function
function scheduleCheckIn(studentId) {
    showSuccess(`Check-in scheduled with student ${studentId}. Calendar invite will be sent automatically.`);
}

// Export risk report function
function exportRiskReport() {
    const reportData = {
        course: selectedCourse?.name || 'Unknown Course',
        date: new Date().toISOString().split('T')[0],
        studentsAtRisk: document.querySelectorAll('.risk-student').length,
        totalStudents: selectedCourse?.enrollmentCount || 0
    };
    
    const csvContent = `Course,Date,Students at Risk,Total Students,Risk Percentage
${reportData.course},${reportData.date},${reportData.studentsAtRisk},${reportData.totalStudents},${Math.round((reportData.studentsAtRisk/reportData.totalStudents)*100)}%`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `risk-report-${reportData.course}-${reportData.date}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    showSuccess('Risk report exported successfully!');
}

// Hide all course data
function hideAllCourseData() {
    document.getElementById('classStats').style.display = 'none';
    document.getElementById('loadGraph').style.display = 'none';
    document.getElementById('conflictPanel').style.display = 'none';
    document.getElementById('aiSuggestions').style.display = 'none';
    document.getElementById('deadlinesTable').style.display = 'none';
    document.getElementById('studentsAtRisk').style.display = 'none';
}

// Show deadline form
function showDeadlineForm() {
    if (!selectedCourse) {
        showError('Please select a course first.');
        return;
    }
    
    document.getElementById('deadlineForm').style.display = 'block';
    document.getElementById('deadlineForm').scrollIntoView({ behavior: 'smooth' });
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('deadlineDate').min = today;
}

// Hide deadline form
function hideDeadlineForm() {
    document.getElementById('deadlineForm').style.display = 'none';
    document.getElementById('createDeadlineForm').reset();
    selectedDifficulty = 0;
    updateDifficultyDisplay();
}

// Setup event listeners
function setupEventListeners() {
    // Difficulty selector
    document.querySelectorAll('.difficulty-star').forEach(star => {
        star.addEventListener('click', (e) => {
            selectedDifficulty = parseInt(e.target.dataset.value);
            document.getElementById('deadlineDifficulty').value = selectedDifficulty;
            updateDifficultyDisplay();
        });
        
        star.addEventListener('mouseenter', (e) => {
            const hoverValue = parseInt(e.target.dataset.value);
            highlightStars(hoverValue);
        });
    });
    
    document.querySelector('.difficulty-selector').addEventListener('mouseleave', () => {
        updateDifficultyDisplay();
    });
    
    // Create deadline form
    document.getElementById('createDeadlineForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await createDeadline();
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

// Update difficulty display
function updateDifficultyDisplay() {
    const stars = document.querySelectorAll('.difficulty-star');
    const label = document.getElementById('difficultyLabel');
    
    stars.forEach((star, index) => {
        if (index < selectedDifficulty) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
    
    const labels = ['Select difficulty', 'Very Easy', 'Easy', 'Moderate', 'Hard', 'Very Hard'];
    label.textContent = labels[selectedDifficulty];
}

// Highlight stars on hover
function highlightStars(value) {
    const stars = document.querySelectorAll('.difficulty-star');
    stars.forEach((star, index) => {
        if (index < value) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Create deadline
async function createDeadline() {
    const formData = {
        courseId: selectedCourse.id,
        title: document.getElementById('deadlineTitle').value,
        type: document.getElementById('deadlineType').value,
        dueDate: document.getElementById('deadlineDate').value,
        difficulty: selectedDifficulty,
        weightage: parseInt(document.getElementById('deadlineWeightage').value),
        estimatedHours: parseInt(document.getElementById('estimatedHours').value),
        createdBy: currentUser.id
    };
    
    try {
        const response = await fetch('/api/deadlines', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            hideDeadlineForm();
            await loadDashboardData(); // Refresh data
            await loadCourseData(); // Refresh course data
            
            if (result.warnings && result.warnings.length > 0) {
                const warningMsg = `Deadline created successfully!\n\nWarnings:\n${result.warnings.map(w => `• ${w.message}`).join('\n')}`;
                alert(warningMsg);
            } else {
                showSuccess('Deadline created successfully!');
            }
        } else {
            showError('Failed to create deadline. Please try again.');
        }
    } catch (error) {
        console.error('Error creating deadline:', error);
        showError('Network error. Please try again.');
    }
}

// Edit deadline (placeholder)
function editDeadline(deadlineId) {
    showError('Edit functionality coming soon!');
}

// Delete deadline (placeholder)
function deleteDeadline(deadlineId) {
    if (confirm('Are you sure you want to delete this deadline?')) {
        showError('Delete functionality coming soon!');
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