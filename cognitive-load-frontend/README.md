# Campus Load Optimizer - Frontend

Modern React frontend for the Campus Load Optimizer application. Built with React 19, Vite, Tailwind CSS, and Framer Motion to provide an intuitive interface for students, professors, and administrators to manage academic workloads.

## Quick Start

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=http://localhost:5000
```

### Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── App.jsx                   # Main app component
├── main.jsx                  # React entry point
├── apis/
│   └── api.js               # Axios API client configuration
├── assets/                  # Images, fonts, etc.
├── components/
│   ├── admin/               # Admin dashboard components
│   │   ├── analytics/
│   │   │   └── SystemAnalytics.jsx
│   │   ├── dashboard/
│   │   │   └── AdminDashboard.jsx
│   │   ├── reports/
│   │   │   └── Reports.jsx
│   │   ├── settings/
│   │   │   └── SystemSettings.jsx
│   │   └── users/
│   │       └── UserManagement.jsx
│   ├── auth/
│   │   └── AuthCallback.jsx # OAuth callback handler
│   ├── professor/           # Professor-specific components
│   │   ├── ai/
│   │   │   └── AIRecommendations.jsx
│   │   ├── analytics/
│   │   │   └── ClassAnalytics.jsx
│   │   ├── conflicts/
│   │   │   └── ConflictDetection.jsx
│   │   ├── dashboard/
│   │   │   └── ProfessorDashboard.jsx
│   │   └── deadlines/
│   │       └── DeadlineManagement.jsx
│   ├── student/             # Student-specific components
│   │   ├── ai/
│   │   │   └── AITipsView.jsx
│   │   ├── calendar/
│   │   │   └── CalendarView.jsx
│   │   ├── dashboard/
│   │   │   └── StudentDashboard.jsx
│   │   ├── notifications/
│   │   │   └── NotificationsView.jsx
│   │   ├── personal/
│   │   │   └── PersonalEventsView.jsx
│   │   └── timeline/
│   │       └── TimelineView.jsx
│   └── shared/              # Reusable components
│       ├── ErrorMessage.jsx
│       ├── HomeRedirect.jsx
│       ├── LoadingSpinner.jsx
│       ├── Navbar.jsx
│       ├── ProtectedRoute.jsx
│       └── Sidebar.jsx
├── config/
│   └── supabase.js          # Supabase client configuration
├── context/
│   ├── AuthContext.jsx      # Authentication state management
│   └── ThemeContext.jsx     # Theme (light/dark) management
├── pages/
│   ├── AdminHome.jsx        # Admin main page
│   ├── ProfessorHome.jsx    # Professor main page
│   ├── StudentHome.jsx      # Student main page
│   ├── Landing.jsx          # Landing/home page
│   ├── Login.jsx            # Login page
│   ├── Signup.jsx           # Signup page
│   └── NotFound.jsx         # 404 page
├── services/
│   ├── adminService.js      # Admin API calls
│   ├── googleCalendarService.js # Google Calendar API
│   ├── professorService.js  # Professor API calls
│   ├── studentService.js    # Student API calls
│   └── mockData.js          # Mock data for testing
├── styles/
│   ├── global.css           # Global styles
│   ├── App.css              # App-specific styles
│   └── index.css            # Index styles
└── utils/
    ├── dateUtils.js         # Date manipulation helpers
    └── loadCalculator.js    # Client-side load calculations
```

## Technology Stack

- **React 19** - Latest UI library
- **Vite 7.2** - Next-generation build tool
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **React Router v6** - Client-side routing with hooks
- **Framer Motion** - Smooth animations and transitions
- **Recharts** - Data visualization library
- **Lucide React** - Icon library (400+ icons)
- **Axios** - HTTP client for API calls
- **date-fns** - Modern date utility library
- **React Hot Toast** - Toast notifications
- **Supabase JS** - Authentication client

## Core Features

### Authentication

**AuthContext.jsx** - Manages user authentication state:

```javascript
const { user, loading, login, logout, signUp } = useAuth();
```

Features:
- Supabase-based authentication
- JWT token management
- Auto-logout on token expiration
- Role-based access control

### Routing

**React Router v6** with protected routes:

```javascript
<ProtectedRoute>
  <StudentHome />
</ProtectedRoute>
```

Routes by role:
- **Students**: `/student/*`
- **Professors**: `/professor/*`
- **Admins**: `/admin/*`
- **Public**: `/`, `/login`, `/signup`

### State Management

Two context providers:

1. **AuthContext** - User authentication and authorization
2. **ThemeContext** - Dark/light theme preference

```javascript
const { user, role } = useContext(AuthContext);
const { isDark, toggleTheme } = useContext(ThemeContext);
```

## Component Library

### Shared Components

#### Navbar
Top navigation bar with:
- User profile menu
- Theme toggle
- Logout button
- Role indicator

#### Sidebar
Role-based navigation sidebar with:
- Icon-labeled menu items
- Active route highlighting
- Collapsible on mobile

#### ProtectedRoute
Route protection based on authentication:

```javascript
<ProtectedRoute requiredRole="student">
  <StudentHome />
</ProtectedRoute>
```

#### LoadingSpinner
Loading state indicator with animation

#### ErrorMessage
Error display with dismiss button

### Student Components

#### StudentDashboard
Overview page showing:
- Upcoming deadlines summary
- Current cognitive load score
- Risk level indicator
- Quick action buttons

#### CalendarView
Visual calendar displaying:
- Deadline dates (color-coded by difficulty)
- Personal events
- Load score per day
- Click to view details

#### TimelineView
Chronological timeline of:
- All upcoming deadlines
- Personal events
- Sorted by date
- With load impact indicators

#### AITipsView
AI-generated recommendations:
- Personalized productivity tips
- Based on high-load periods
- Motivational messages
- Refresh button for new tips

#### NotificationsView
Alert management:
- Deadline reminders
- High-load day warnings
- Upcoming exam alerts
- Mark as read/dismiss

#### PersonalEventsView
Personal commitment tracking:
- Add personal events
- Set priorities
- Sync with calendar
- View alongside deadlines

### Professor Components

#### ProfessorDashboard
Class overview showing:
- Course list
- Average class load
- Student statistics
- Quick deadline creation

#### DeadlineManagement
Deadline CRUD interface:
- Create new deadlines
- Set difficulty (1-5 scale)
- Select deadline type (assignment, project, exam)
- Estimated hours
- Bulk actions

#### ClassAnalytics
Data visualizations:
- Load distribution chart
- Student comparison
- Time-series load trends
- Peak day identification
- Risk level breakdown

#### ConflictDetection
Conflict analysis:
- Identified scheduling conflicts
- Conflict severity indicators
- Suggested resolution
- Affected students list

#### AIRecommendations
AI-powered suggestions:
- Deadline adjustment recommendations
- Load balancing tips
- Student support alerts
- Personalized professor tips

### Admin Components

#### AdminDashboard
System overview:
- Total users count
- Course statistics
- System health
- Recent activity

#### UserManagement
User administration:
- User list with filters
- Role assignment
- Account status
- Bulk actions

#### SystemAnalytics
Platform-wide analytics:
- User growth trends
- Most-used features
- Performance metrics
- Load distribution analysis

#### SystemSettings
Configuration interface:
- System parameters
- Feature toggles
- Notification settings
- Integration status

## API Integration

### API Client (apis/api.js)

Configured Axios instance with:

```javascript
// Base URL from environment
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// Auto-attach auth token
api.interceptors.request.use(config => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Service Layers

Each role has a service file for API calls:

```javascript
// studentService.js
export const getStudentLoad = async (studentId, days = 30) => {
  return api.get(`/load/${studentId}?days=${days}`);
};

export const getAITip = async (studentId) => {
  return api.get(`/ai/tip/${studentId}`);
};

// professorService.js
export const createDeadline = async (courseId, deadline) => {
  return api.post(`/deadlines`, { ...deadline, course_id: courseId });
};

export const getClassAnalytics = async (courseId) => {
  return api.get(`/load/class/${courseId}`);
};
```

## Styling

### Tailwind CSS

Utility-first CSS framework with custom configuration:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6'
      }
    }
  }
};
```

### Dark Mode

Built-in dark mode support via ThemeContext:

```jsx
<div className="bg-white dark:bg-gray-900">
  Content
</div>
```

## Animations

### Framer Motion

Smooth transitions and animations:

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

Common patterns:
- Page entry animations
- Component fade-ins
- Load state transitions
- Toast notifications

## Data Visualization

### Recharts

Interactive charts for analytics:

```jsx
<LineChart data={loadData}>
  <CartesianGrid />
  <XAxis dataKey="date" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Line type="monotone" dataKey="load_score" stroke="#8b5cf6" />
</LineChart>
```

Charts used:
- Line charts for load trends
- Bar charts for comparisons
- Pie charts for distribution
- Area charts for time-series data

## Utilities

### Date Utilities (utils/dateUtils.js)

```javascript
import { format, differenceInDays, parseISO } from 'date-fns';

// Format dates
format(new Date(), 'MMM dd, yyyy');

// Calculate days until deadline
differenceInDays(deadline.date, new Date());
```

### Load Calculation (utils/loadCalculator.js)

Client-side load calculation:

```javascript
export const calculateLoadScore = (deadlines, date) => {
  // Mirrors backend calculation
  // Used for offline calculations and instant feedback
};
```

## Development

### ESLint

Configured with:
- React plugin
- React hooks plugin
- React refresh plugin

Run linter:

```bash
npm run lint
```

### Code Style

- Use functional components with hooks
- Prefer composition over inheritance
- Keep components focused and reusable
- Use context for global state

## Build and Deployment

### Development Build

```bash
npm run dev
```

Hot Module Replacement (HMR) for instant updates.

### Production Build

```bash
npm run build
```

Optimized bundle with:
- Code splitting
- Tree shaking
- Minification
- Asset optimization

### Preview Build

Test production build locally:

```bash
npm run preview
```

## Deployment Options

### Vercel

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
# Deploy the dist folder
```

### Traditional Server

```bash
npm run build
# Copy dist folder to server
# Configure web server to serve from dist
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Supabase project URL | `https://xxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhbG...` |
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000` |

## Performance Optimization

1. **Code Splitting**: Lazy-load route components
2. **Image Optimization**: Use modern formats (WebP)
3. **Bundle Analysis**: Monitor bundle size
4. **Caching**: Browser and API response caching
5. **Memoization**: Use React.memo for expensive components

## Troubleshooting

### Hot Module Replacement Not Working

Restart dev server:

```bash
npm run dev
```

### Supabase Auth Errors

Verify environment variables are correctly set in `.env.local`

### API Connection Failed

Check that backend server is running at `VITE_API_URL`

### Build Errors

Clear node_modules and reinstall:

```bash
rm -rf node_modules
npm install
npm run build
```

## Contributing

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Create a pull request

## License

ISC
