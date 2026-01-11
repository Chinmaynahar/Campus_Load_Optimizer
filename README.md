# Cognitive Load Management System (CLMS)

A comprehensive smart scheduling assistant that prevents students from being overwhelmed by too many deadlines at once. The system calculates cognitive load scores for each day and provides AI-powered recommendations to optimize academic workload distribution.

## 🎯 Core Concept

**Cognitive Load** is a stress score (0-100) calculated for each day based on:
- Number of upcoming deadlines
- Difficulty level of tasks
- Proximity to due dates
- Grade weightage importance

### Load Zones
- 🟢 **Safe (0-40)**: Relaxed, manageable workload
- 🟡 **Moderate (41-60)**: Getting busy but manageable
- 🟠 **High (61-80)**: Stressful, requires planning
- 🔴 **Critical (81-100)**: DANGER! Immediate action needed

## 🚀 Features

### For Students
- **14-Day Color-Coded Calendar**: Visual stress level indicators
- **AI-Powered Recommendations**: Personalized study strategies
- **Deadline Timeline**: Upcoming assignments with difficulty ratings
- **Personal Event Integration**: Add study sessions, meetings, activities
- **Real-time Load Calculation**: Instant updates when deadlines change

### For Professors
- **Class Load Overview**: See how stressed your entire class is
- **Conflict Detection**: Identify when multiple deadlines cluster
- **AI Scheduling Assistant**: Get suggestions to reduce student overload
- **Student Risk Monitoring**: Track students in danger zones
- **Deadline Impact Analysis**: See how new deadlines affect students

### For Administrators
- **System-wide Statistics**: Department stress comparisons
- **Configuration Management**: Adjust load calculation formulas
- **Professor Activity Monitoring**: Track scheduling conflicts
- **Threshold Management**: Customize danger zone boundaries

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Quick Start

1. **Clone/Download the repository**
   ```bash
   cd Student-Dashboard-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Access the application**
   Open your browser and go to: `http://localhost:3000`

### Demo Accounts

The system comes with pre-configured demo accounts:

| Role | Email | Password | Access |
|------|-------|----------|---------|
| Student | student@university.edu | password | Student Dashboard |
| Professor | prof@university.edu | password | Professor Dashboard |
| Admin | admin@university.edu | password | Admin Dashboard |

## 📊 How Load Calculation Works

### Formula
```
Load Score = (Difficulty × 10) + (Weightage ÷ 2) + (EstimatedHours × 2) + Proximity Bonus
```

### Proximity Bonus
- Same day: +30 points
- 1 day before: +20 points
- 2 days before: +15 points
- 3 days before: +10 points
- 4-7 days before: +5 points

### Example Calculation
Student has 3 items due on Jan 18:
- **Math Exam**: (5×10) + (40÷2) + (8×2) + 30 = 116 points (capped at 100)
- **Physics Assignment**: (3×10) + (15÷2) + (4×2) + 30 = 75 points
- **Club Meeting**: (2×10) + 0 + (2×2) + 30 = 54 points

**Total Day Load**: 100 (capped) → 🔴 **RED ALERT!**

## 🎮 Usage Scenarios

### Scenario 1: Student Discovers Overload
1. Student logs in Monday morning
2. Sees Friday is RED (load score 87)
3. Clicks Friday, sees 3 major deadlines
4. Reads AI tip: "Start Project X today"
5. Uses Tuesday/Wednesday (green days) to work ahead
6. Avoids panic on Friday

### Scenario 2: Professor Prevents Crisis
1. Professor tries to set exam on Jan 20
2. System shows: "32 students will be in danger zone"
3. Professor sees AI suggestion: "Move to Jan 23"
4. Professor checks Jan 23 - only 5 students at moderate load
5. Changes date, saves 27 students from overload

### Scenario 3: Cross-Department Coordination
1. Three professors schedule exams same week
2. Admin dashboard shows "Critical overload detected"
3. System sends alert to all three professors
4. They coordinate and spread exams across two weeks
5. Student stress reduced by 40%

## 🏗️ System Architecture

### Backend (Node.js/Express)
- RESTful API endpoints
- In-memory data storage (easily replaceable with database)
- Real-time load calculation engine
- Conflict detection algorithms
- AI recommendation generator

### Frontend (Vanilla JavaScript)
- Role-based dashboards (Student/Professor/Admin)
- Responsive design with dark/light themes
- Interactive calendar components
- Real-time data updates
- Modal-based interactions

### Key API Endpoints
- `POST /api/login` - User authentication
- `GET /api/student/:id/dashboard` - Student dashboard data
- `GET /api/professor/:id/dashboard` - Professor dashboard data
- `POST /api/deadlines` - Create new deadline
- `GET /api/student/:id/day/:date` - Day-specific load details
- `POST /api/student/:id/events` - Add personal events

## 🔧 Configuration

### Admin Configuration Options
- **Load Thresholds**: Customize safe/moderate/high/critical boundaries
- **Formula Weights**: Adjust difficulty, weightage, and hours multipliers
- **Proximity Bonuses**: Modify how deadline proximity affects load
- **Department Settings**: Configure department-specific parameters

### Environment Variables
```bash
PORT=3000                    # Server port (default: 3000)
NODE_ENV=development         # Environment mode
```

## 📈 Benefits

### For Students
- ✅ See stress coming before it hits
- ✅ Plan study time better
- ✅ Reduce anxiety from surprise overloads
- ✅ Get AI-powered study strategies

### For Professors
- ✅ Understand student workload beyond their own course
- ✅ Make informed scheduling decisions
- ✅ Reduce student complaints
- ✅ Improve course completion rates

### For Institution
- ✅ Better academic outcomes
- ✅ Happier students
- ✅ Data-driven scheduling
- ✅ Reduced dropouts due to stress

## 🚧 Development Mode

For development with auto-restart:
```bash
npm run dev
```

This uses nodemon to automatically restart the server when files change.

## 📝 Future Enhancements

- **Database Integration**: Replace in-memory storage with MongoDB/PostgreSQL
- **Real-time Notifications**: WebSocket-based live updates
- **Mobile App**: React Native companion app
- **Machine Learning**: Advanced AI for personalized recommendations
- **Integration APIs**: Connect with existing LMS systems
- **Advanced Analytics**: Detailed reporting and insights
- **Multi-language Support**: Internationalization
- **Email Notifications**: Automated alerts and reminders

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the demo accounts are working
2. Ensure Node.js is properly installed
3. Verify port 3000 is available
4. Check browser console for JavaScript errors

For additional support, please create an issue in the repository.

---

**Made with ❤️ for better academic experiences**