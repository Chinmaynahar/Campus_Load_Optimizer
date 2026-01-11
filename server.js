const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// In-memory data store (replace with database in production)
let users = [
    { id: 1, email: 'student@university.edu', password: 'password', role: 'student', name: 'John Doe', studentId: '12102030' },
    { id: 2, email: 'prof@university.edu', password: 'password', role: 'professor', name: 'Dr. Smith', courses: ['CS201', 'CS301'] },
    { id: 3, email: 'admin@university.edu', password: 'password', role: 'admin', name: 'Admin User' }
];

let courses = [
    { id: 'CS201', name: 'Data Structures', professor: 2, students: [1], enrollmentCount: 45 },
    { id: 'CS301', name: 'Algorithms', professor: 2, students: [1], enrollmentCount: 38 },
    { id: 'CS401', name: 'Database Systems', professor: 2, students: [1], enrollmentCount: 52 }
];

let deadlines = [
    {
        id: 1,
        courseId: 'CS201',
        title: 'Assignment 1: Data Structures Basics',
        type: 'assignment',
        dueDate: '2026-01-15',
        difficulty: 3,
        weightage: 15,
        estimatedHours: 4,
        createdBy: 2
    },
    {
        id: 2,
        courseId: 'CS201',
        title: 'Mid-term Exam',
        type: 'exam',
        dueDate: '2026-01-20',
        difficulty: 5,
        weightage: 30,
        estimatedHours: 8,
        createdBy: 2
    },
    {
        id: 3,
        courseId: 'CS201',
        title: 'Programming Project: Binary Trees',
        type: 'project',
        dueDate: '2026-01-18',
        difficulty: 4,
        weightage: 25,
        estimatedHours: 12,
        createdBy: 2
    },
    {
        id: 4,
        courseId: 'CS301',
        title: 'Algorithm Analysis Quiz',
        type: 'quiz',
        dueDate: '2026-01-16',
        difficulty: 2,
        weightage: 10,
        estimatedHours: 2,
        createdBy: 2
    },
    {
        id: 5,
        courseId: 'CS301',
        title: 'Dynamic Programming Assignment',
        type: 'assignment',
        dueDate: '2026-01-22',
        difficulty: 5,
        weightage: 20,
        estimatedHours: 8,
        createdBy: 2
    }
];

let personalEvents = [
    {
        id: 1,
        studentId: 1,
        title: 'Study Group - Data Structures',
        date: '2026-01-14',
        estimatedHours: 3,
        type: 'study'
    },
    {
        id: 2,
        studentId: 1,
        title: 'Programming Club Meeting',
        date: '2026-01-17',
        estimatedHours: 2,
        type: 'activity'
    }
];

// Cognitive Load Calculation Function
function calculateCognitiveLoad(studentId, date) {
    const targetDate = new Date(date);
    let totalLoad = 0;
    
    // Get all deadlines for student's courses
    const studentCourses = courses.filter(course => course.students.includes(studentId));
    const relevantDeadlines = deadlines.filter(deadline => 
        studentCourses.some(course => course.id === deadline.courseId)
    );
    
    // Get personal events for the student
    const studentPersonalEvents = personalEvents.filter(event => event.studentId === studentId);
    
    relevantDeadlines.forEach(deadline => {
        const dueDate = new Date(deadline.dueDate);
        const daysDiff = Math.ceil((dueDate - targetDate) / (1000 * 60 * 60 * 24));
        
        if (daysDiff >= 0 && daysDiff <= 7) {
            // Calculate base points
            let points = (deadline.difficulty * 10) + (deadline.weightage / 2) + (deadline.estimatedHours * 2);
            
            // Add proximity bonus
            if (daysDiff === 0) points += 30;
            else if (daysDiff === 1) points += 20;
            else if (daysDiff === 2) points += 15;
            else if (daysDiff === 3) points += 10;
            else if (daysDiff <= 7) points += 5;
            
            totalLoad += points;
        }
    });
    
    // Add personal events load
    studentPersonalEvents.forEach(event => {
        const eventDate = new Date(event.date);
        if (eventDate.toDateString() === targetDate.toDateString()) {
            totalLoad += event.estimatedHours * 3; // Personal events have lower weight
        }
    });
    
    return Math.min(totalLoad, 100); // Cap at 100
}

// Get load color based on score
function getLoadColor(score) {
    if (score <= 40) return 'green';
    if (score <= 60) return 'yellow';
    if (score <= 80) return 'orange';
    return 'red';
}

// Generate AI recommendations with enhanced logic
function generateAIRecommendations(studentId, highLoadDays) {
    const recommendations = [];
    
    highLoadDays.forEach(day => {
        if (day.score > 80) {
            // Critical overload recommendations
            recommendations.push({
                type: 'critical',
                message: `🚨 Critical overload detected on ${day.date}! Your cognitive load is ${day.score}/100.`,
                suggestions: [
                    'Start working on major assignments immediately',
                    'Consider requesting extensions for non-critical deadlines',
                    'Break large tasks into smaller, manageable chunks',
                    'Use active study techniques to maximize efficiency',
                    'Seek help from professors or tutoring services'
                ]
            });
        } else if (day.score > 60) {
            // High load recommendations
            recommendations.push({
                type: 'warning',
                message: `⚠️ High cognitive load on ${day.date} (${day.score}/100). Plan your time carefully.`,
                suggestions: [
                    'Start preparation 2-3 days early',
                    'Create a detailed study schedule',
                    'Identify your most productive hours',
                    'Eliminate distractions during study time'
                ]
            });
        }
    });
    
    // Add general productivity tips
    if (recommendations.length > 0) {
        recommendations.push({
            type: 'info',
            message: '💡 General productivity tips for high-load periods:',
            suggestions: [
                'Use the Pomodoro Technique (25-min focused sessions)',
                'Take regular breaks to maintain concentration',
                'Stay hydrated and maintain good nutrition',
                'Get adequate sleep (7-8 hours) for optimal performance',
                'Exercise regularly to reduce stress and improve focus'
            ]
        });
    }
    
    return recommendations;
}

// Authentication endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        const { password: _, ...userWithoutPassword } = user;
        res.json({ success: true, user: userWithoutPassword });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Student dashboard data
app.get('/api/student/:id/dashboard', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = users.find(u => u.id === studentId && u.role === 'student');
    
    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }
    
    // Calculate load for next 14 days
    const loadData = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        
        const score = calculateCognitiveLoad(studentId, dateStr);
        loadData.push({
            date: dateStr,
            score,
            color: getLoadColor(score),
            dayName: date.toLocaleDateString('en-US', { weekday: 'long' })
        });
    }
    
    // Get upcoming deadlines
    const studentCourses = courses.filter(course => course.students.includes(studentId));
    const upcomingDeadlines = deadlines
        .filter(deadline => studentCourses.some(course => course.id === deadline.courseId))
        .filter(deadline => new Date(deadline.dueDate) >= today)
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 10);
    
    // Generate AI recommendations
    const highLoadDays = loadData.filter(day => day.score > 60);
    const aiRecommendations = generateAIRecommendations(studentId, highLoadDays);
    
    res.json({
        student,
        loadData,
        upcomingDeadlines,
        aiRecommendations,
        courses: studentCourses
    });
});

// Professor dashboard data
app.get('/api/professor/:id/dashboard', (req, res) => {
    const professorId = parseInt(req.params.id);
    const professor = users.find(u => u.id === professorId && u.role === 'professor');
    
    if (!professor) {
        return res.status(404).json({ error: 'Professor not found' });
    }
    
    const professorCourses = courses.filter(course => course.professor === professorId);
    const courseDeadlines = deadlines.filter(deadline => 
        professorCourses.some(course => course.id === deadline.courseId)
    );
    
    // Calculate class load statistics
    const classStats = professorCourses.map(course => {
        const courseStudents = course.students;
        const today = new Date();
        const weekData = [];
        
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const dateStr = date.toISOString().split('T')[0];
            
            const studentLoads = courseStudents.map(studentId => 
                calculateCognitiveLoad(studentId, dateStr)
            );
            
            const avgLoad = studentLoads.reduce((sum, load) => sum + load, 0) / studentLoads.length;
            const safeStudents = studentLoads.filter(load => load <= 40).length;
            const moderateStudents = studentLoads.filter(load => load > 40 && load <= 60).length;
            const highRiskStudents = studentLoads.filter(load => load > 60).length;
            
            weekData.push({
                date: dateStr,
                avgLoad: Math.round(avgLoad),
                safeStudents,
                moderateStudents,
                highRiskStudents,
                totalStudents: courseStudents.length
            });
        }
        
        return {
            course,
            weekData,
            deadlines: courseDeadlines.filter(d => d.courseId === course.id)
        };
    });
    
    res.json({
        professor,
        courses: professorCourses,
        classStats,
        deadlines: courseDeadlines
    });
});

// Create new deadline
app.post('/api/deadlines', (req, res) => {
    const { courseId, title, type, dueDate, difficulty, weightage, estimatedHours, createdBy } = req.body;
    
    const newDeadline = {
        id: deadlines.length + 1,
        courseId,
        title,
        type,
        dueDate,
        difficulty: parseInt(difficulty),
        weightage: parseInt(weightage),
        estimatedHours: parseInt(estimatedHours),
        createdBy: parseInt(createdBy)
    };
    
    deadlines.push(newDeadline);
    
    // Check for conflicts and generate warnings
    const course = courses.find(c => c.id === courseId);
    const affectedStudents = course.students;
    const conflictWarnings = [];
    
    affectedStudents.forEach(studentId => {
        const loadScore = calculateCognitiveLoad(studentId, dueDate);
        if (loadScore > 80) {
            const student = users.find(u => u.id === studentId);
            conflictWarnings.push({
                studentId,
                studentName: student.name,
                loadScore,
                message: `High load detected for ${student.name}`
            });
        }
    });
    
    res.json({
        success: true,
        deadline: newDeadline,
        warnings: conflictWarnings
    });
});

// Get day details for student
app.get('/api/student/:id/day/:date', (req, res) => {
    const studentId = parseInt(req.params.id);
    const date = req.params.date;
    
    const loadScore = calculateCognitiveLoad(studentId, date);
    const studentCourses = courses.filter(course => course.students.includes(studentId));
    
    // Get deadlines affecting this day
    const relevantDeadlines = deadlines.filter(deadline => {
        if (!studentCourses.some(course => course.id === deadline.courseId)) return false;
        
        const dueDate = new Date(deadline.dueDate);
        const targetDate = new Date(date);
        const daysDiff = Math.ceil((dueDate - targetDate) / (1000 * 60 * 60 * 24));
        
        return daysDiff >= 0 && daysDiff <= 7;
    });
    
    res.json({
        date,
        loadScore,
        color: getLoadColor(loadScore),
        deadlines: relevantDeadlines,
        breakdown: relevantDeadlines.map(deadline => ({
            title: deadline.title,
            course: courses.find(c => c.id === deadline.courseId)?.name,
            contribution: Math.min(
                (deadline.difficulty * 10) + (deadline.weightage / 2) + (deadline.estimatedHours * 2),
                30
            )
        }))
    });
});

// Add personal event
app.post('/api/student/:id/events', (req, res) => {
    const studentId = parseInt(req.params.id);
    const { title, date, estimatedHours, type } = req.body;
    
    const newEvent = {
        id: personalEvents.length + 1,
        studentId,
        title,
        date,
        estimatedHours: parseInt(estimatedHours),
        type
    };
    
    personalEvents.push(newEvent);
    res.json({ success: true, event: newEvent });
});

// Get notifications for student
app.get('/api/student/:id/notifications', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = users.find(u => u.id === studentId && u.role === 'student');
    
    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }
    
    const notifications = [];
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    // Get student's deadlines
    const studentCourses = courses.filter(course => course.students.includes(studentId));
    const upcomingDeadlines = deadlines
        .filter(deadline => studentCourses.some(course => course.id === deadline.courseId))
        .filter(deadline => new Date(deadline.dueDate) >= new Date(today));
    
    // Critical overload notifications
    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        const score = calculateCognitiveLoad(studentId, dateStr);
        
        if (score > 80) {
            notifications.push({
                id: notifications.length + 1,
                type: 'critical',
                title: 'Critical Overload Alert',
                message: `${dateStr === today ? 'Today' : date.toLocaleDateString()} has critical overload (${score}/100)`,
                date: dateStr,
                read: false
            });
        }
    }
    
    // Deadline reminders
    upcomingDeadlines.forEach(deadline => {
        if (deadline.dueDate === today) {
            notifications.push({
                id: notifications.length + 1,
                type: 'urgent',
                title: 'Due Today!',
                message: `${deadline.title} is due today`,
                date: today,
                read: false
            });
        } else if (deadline.dueDate === tomorrowStr) {
            notifications.push({
                id: notifications.length + 1,
                type: 'warning',
                title: 'Due Tomorrow',
                message: `${deadline.title} is due tomorrow`,
                date: tomorrowStr,
                read: false
            });
        }
    });
    
    res.json({ notifications });
});

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.listen(PORT, () => {
    console.log(`Cognitive Load Management System running on port ${PORT}`);
    console.log(`Access the application at: http://localhost:${PORT}`);
});