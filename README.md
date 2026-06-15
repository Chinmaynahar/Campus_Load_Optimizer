# Campus Load Optimizer

A comprehensive web application designed to help students and professors manage academic workload effectively. This platform provides cognitive load analysis, deadline management, conflict detection, and AI-powered recommendations to optimize campus schedules.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Frontend Components](#frontend-components)
- [Database Models](#database-models)
- [Services](#services)
- [Contributing](#contributing)

## Overview

Campus Load Optimizer is a full-stack application that helps academic institutions manage student workload distribution. It analyzes course deadlines, calculates cognitive load scores, detects scheduling conflicts, and provides personalized recommendations using AI to help both students and professors maintain healthy academic workload balance.

### Key User Roles

- **Students**: Track assignments, view cognitive load predictions, receive AI tips, manage personal events
- **Professors**: Set deadlines, analyze class workload, detect scheduling conflicts, get AI recommendations
- **Admins**: System analytics, user management, settings configuration

## Features

### For Students

- **Dashboard**: Overview of upcoming deadlines and workload summary
- **Calendar View**: Visual representation of deadlines and personal events
- **Timeline View**: Chronological view of tasks and deadlines
- **Cognitive Load Tracking**: Real-time load score calculations with risk levels
- **AI Tips**: Personalized productivity recommendations based on workload analysis
- **Notifications**: Alerts for approaching deadlines and high-load days
- **Personal Events**: Add and manage personal commitments
- **Google Calendar Integration**: Sync deadlines with Google Calendar

### For Professors

- **Dashboard**: Class overview and student workload statistics
- **Deadline Management**: Create, edit, and manage course deadlines
- **Class Analytics**: Visualize class-wide workload distribution and trends
- **Conflict Detection**: Identify overlapping deadlines across courses
- **AI Recommendations**: Get suggestions to balance student workload
- **Student Workload Insights**: Monitor and analyze individual student loads

### For Admins

- **System Analytics**: Platform-wide statistics and usage metrics
- **User Management**: Manage accounts and user roles
- **System Settings**: Configure application parameters

## Project Structure

```
Campus_Load_Optimizer/
├── backend/                          # Express.js Node.js backend
│   ├── src/
│   │   ├── app.js                   # Express app configuration
│   │   ├── server.js                # Server entry point
│   │   ├── config/
│   │   │   ├── db.js                # MongoDB connection
│   │   │   ├── openai.config.js     # OpenAI API configuration
│   │   │   └── supabase.js          # Supabase configuration
│   │   ├── controllers/             # Request handlers
│   │   │   ├── auth.controller.js
│   │   │   ├── course.controller.js
│   │   │   ├── deadline.controller.js
│   │   │   └── load.controller.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js    # Authentication middleware
│   │   ├── models/                  # Mongoose schemas
│   │   │   ├── user.js
│   │   │   ├── course.js
│   │   │   ├── deadline.js
│   │   │   ├── studentLoad.js
│   │   │   └── aiTip.js
│   │   ├── routes/                  # API route handlers
│   │   │   ├── auth.routes.js
│   │   │   ├── course.routes.js
│   │   │   ├── deadline.routes.js
│   │   │   ├── load.routes.js
│   │   │   ├── aiRoutes.js
│   │   │   ├── googleAuth.routes.js
│   │   │   └── calendar.routes.js
│   │   ├── services/                # Business logic
│   │   │   ├── aiService.js         # AI tip generation
│   │   │   ├── loadCalculator.js    # Cognitive load calculation
│   │   │   ├── conflictDetector.js  # Deadline conflict detection
│   │   │   ├── dailyLoadCalculation.js
│   │   │   ├── deadlineSync.js
│   │   │   ├── googleCalendar.js    # Google Calendar integration
│   │   │   └── professorService.js
│   │   ├── utils/
│   │   │   └── aiPrompts.js         # AI prompt templates
│   │   └── tests/
│   │       └── test-ai-setup.js
│   ├── migrations/
│   │   └── create_google_tokens_table.sql
│   ├── package.json
│   └── readme.md
│
└── cognitive-load-frontend/         # React frontend
    ├── src/
    │   ├── App.jsx                  # Main app component
    │   ├── main.jsx                 # Entry point
    │   ├── apis/
    │   │   └── api.js               # API client
    │   ├── components/
    │   │   ├── admin/               # Admin dashboard components
    │   │   │   ├── analytics/
    │   │   │   ├── dashboard/
    │   │   │   ├── reports/
    │   │   │   ├── settings/
    │   │   │   └── users/
    │   │   ├── professor/           # Professor dashboard components
    │   │   │   ├── ai/
    │   │   │   ├── analytics/
    │   │   │   ├── conflicts/
    │   │   │   ├── dashboard/
    │   │   │   └── deadlines/
    │   │   ├── student/             # Student dashboard components
    │   │   │   ├── ai/
    │   │   │   ├── calendar/
    │   │   │   ├── dashboard/
    │   │   │   ├── notifications/
    │   │   │   ├── personal/
    │   │   │   └── timeline/
    │   │   ├── auth/
    │   │   │   └── AuthCallback.jsx
    │   │   └── shared/
    │   │       ├── ErrorMessage.jsx
    │   │       ├── HomeRedirect.jsx
    │   │       ├── LoadingSpinner.jsx
    │   │       ├── Navbar.jsx
    │   │       ├── ProtectedRoute.jsx
    │   │       └── Sidebar.jsx
    │   ├── config/
    │   │   └── supabase.js          # Supabase client config
    │   ├── context/
    │   │   ├── AuthContext.jsx      # Authentication context
    │   │   └── ThemeContext.jsx     # Theme management
    │   ├── pages/
    │   │   ├── AdminHome.jsx
    │   │   ├── ProfessorHome.jsx
    │   │   ├── StudentHome.jsx
    │   │   ├── Landing.jsx
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   └── NotFound.jsx
    │   ├── services/                # API service helpers
    │   │   ├── adminService.js
    │   │   ├── googleCalendarService.js
    │   │   ├── professorService.js
    │   │   ├── studentService.js
    │   │   └── mockData.js
    │   ├── utils/
    │   │   ├── dateUtils.js
    │   │   └── loadCalculator.js
    │   └── styles/
    │       ├── global.css
    │       ├── App.css
    │       └── index.css
    ├── public/
    ├── vite.config.js
    ├── tailwind.config.js
    ├── eslint.config.js
    ├── postcss.config.js
    ├── package.json
    └── README.md
```

## Technology Stack

### Backend

- **Node.js & Express.js** - Server framework
- **MongoDB** - Primary database with Mongoose ODM
- **Supabase** - Authentication and user management
- **OpenAI API** - AI-powered recommendations and tips
- **Google APIs** - Google Calendar integration
- **node-cron** - Scheduled tasks
- **CORS & dotenv** - Configuration and security

### Frontend

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Framer Motion** - Animation library
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **Axios** - HTTP client
- **date-fns** - Date manipulation
- **React Hot Toast** - Toast notifications

### Infrastructure

- **MongoDB Atlas** - Cloud database hosting
- **Supabase** - Authentication & backend services

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account
- Supabase account
- OpenAI API key
- Google OAuth credentials

### Backend Setup

1. Clone the repository and navigate to the backend directory:

```bash
cd backend
npm install
```

2. Create a `.env` file in the backend directory:

```env
MONGO_URI=your_mongodb_connection_string
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
OPENAI_API_KEY=your_openai_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/google/callback
PORT=5000
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd cognitive-load-frontend
npm install
```

2. Create a `.env.local` file in the frontend directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:5000
```

## Configuration

### Environment Variables

#### Backend (.env)

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB connection string |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_KEY` | Supabase anonymous key |
| `OPENAI_API_KEY` | OpenAI API key for GPT-4 |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `GOOGLE_CALLBACK_URL` | Google OAuth callback URL |
| `PORT` | Server port (default: 5000) |

#### Frontend (.env.local)

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `VITE_API_URL` | Backend API base URL |

## Running the Application

### Development Mode

**Backend:**

```bash
cd backend
npm run dev
```

The server will start at `http://localhost:5000`

**Frontend:**

```bash
cd cognitive-load-frontend
npm run dev
```

The app will open at `http://localhost:5173`

### Production Build

**Backend:**

```bash
cd backend
npm start
```

**Frontend:**

```bash
cd cognitive-load-frontend
npm run build
npm run preview
```

## API Endpoints

### Authentication Routes (`/auth`)

- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `GET /auth/profile` - Get current user profile

### Course Routes (`/courses`)

- `GET /courses` - Get all courses
- `POST /courses` - Create a new course
- `GET /courses/:id` - Get course details
- `PUT /courses/:id` - Update course
- `DELETE /courses/:id` - Delete course
- `POST /courses/:id/enroll` - Enroll student in course

### Deadline Routes (`/deadlines`)

- `GET /deadlines` - Get all deadlines
- `POST /deadlines` - Create new deadline
- `GET /deadlines/:id` - Get deadline details
- `PUT /deadlines/:id` - Update deadline
- `DELETE /deadlines/:id` - Delete deadline

### Load Routes (`/load`)

- `GET /load/:studentId` - Get student's cognitive load
- `GET /load/:studentId/range` - Get load range for period
- `GET /load/class/:courseId` - Get class average load

### AI Routes (`/ai`)

- `GET /ai/tip/:studentId` - Get personalized AI tip
- `GET /ai/recommendation/:professorId` - Get professor recommendations
- `POST /ai/analyze` - Analyze workload and get insights

### Google Calendar Routes (`/api/calendar` & `/api/google`)

- `POST /api/google/auth` - Authenticate with Google
- `GET /api/calendar/events` - Get calendar events
- `POST /api/calendar/sync` - Sync deadlines to Google Calendar

## Frontend Components

### Shared Components

- `Navbar` - Navigation bar with user menu
- `Sidebar` - Navigation sidebar with role-based items
- `ProtectedRoute` - Route protection based on authentication
- `LoadingSpinner` - Loading indicator
- `ErrorMessage` - Error display component

### Student Components

- `StudentDashboard` - Overview of workload and upcoming deadlines
- `CalendarView` - Visual calendar of events and deadlines
- `TimelineView` - Chronological timeline of tasks
- `AITipsView` - Personalized AI recommendations
- `NotificationsView` - Alert management
- `PersonalEventsView` - Personal event management

### Professor Components

- `ProfessorDashboard` - Class overview and statistics
- `DeadlineManagement` - Create and manage deadlines
- `ClassAnalytics` - Visualize class workload distribution
- `ConflictDetection` - View and resolve scheduling conflicts
- `AIRecommendations` - Receive workload balancing suggestions

### Admin Components

- `AdminDashboard` - System overview
- `UserManagement` - Manage users and roles
- `SystemAnalytics` - Platform statistics
- `SystemSettings` - Configure system parameters

## Database Models

### User Schema

```javascript
{
  supabase_id: String,
  email: String,
  name: String,
  role: String (enum: ["student", "professor", "admin"])
}
```

### Course Schema

```javascript
{
  name: String,
  code: String,
  professor_id: ObjectId,
  student_ids: [ObjectId],
  credits: Number,
  semester: String,
  description: String
}
```

### Deadline Schema

```javascript
{
  title: String,
  description: String,
  course_id: ObjectId,
  deadline_date: Date,
  type: String (enum: ["assignment", "project", "exam"]),
  difficulty: Number (1-5),
  estimated_hours: Number
}
```

### StudentLoad Schema

```javascript
{
  student_id: ObjectId,
  date: Date,
  load_score: Number (0-100),
  risk_level: String (enum: ["low", "medium", "high", "danger"]),
  deadlines: [Object]
}
```

### AITip Schema

```javascript
{
  user_id: ObjectId,
  tip_text: String,
  tip_type: String,
  metadata: Object,
  created_at: Date
}
```

## Services

### Load Calculator Service

Calculates cognitive load based on:

- **Difficulty Weight**: 1-5 scale (10-30 points)
- **Type Multiplier**: Assignment (1.0x), Project (1.5x), Exam (2.0x)
- **Proximity Factor**: Based on days until deadline
  - Due today: 3.0x
  - Due tomorrow: 2.5x
  - Due in 2-3 days: 2.0x
  - Due in 4-7 days: 1.5x
  - Due later: 14/(days+1)

Risk Levels:
- **Low**: 0-30 points
- **Medium**: 31-60 points
- **High**: 61-80 points
- **Danger**: 81-100 points

### AI Service

Uses OpenAI GPT-4 to generate:

- **Student Tips**: Personalized productivity recommendations based on high-load days
- **Professor Suggestions**: Recommendations to balance student workload
- **Positive Reinforcement**: Encouragement for well-managed students

### Conflict Detector Service

Identifies:

- Overlapping deadlines on the same date
- Days with multiple high-difficulty tasks
- Exam clustering
- Course conflicts

### Google Calendar Integration

Syncs with Google Calendar to:

- Display calendar events alongside deadlines
- Create calendar events for deadlines
- Pull calendar events to calculate availability
- Check for scheduling conflicts

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Support

For issues, bugs, or feature requests, please create an issue in the repository.