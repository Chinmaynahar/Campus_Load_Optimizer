# Campus Load Optimizer - Backend

Express.js backend server for the Campus Load Optimizer application. Handles authentication, course management, deadline tracking, cognitive load calculations, and AI-powered recommendations.

## Quick Start

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
# MongoDB
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/campus_load_optimizer

# Supabase Authentication
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key

# OpenAI API
OPENAI_API_KEY=sk-your-key

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/google/callback

# Server
PORT=5000
NODE_ENV=development
```

### Running the Server

**Development (with auto-reload):**

```bash
npm run dev
```

**Production:**

```bash
npm start
```

The server will be available at `http://localhost:5000`

## Project Structure

```
src/
├── app.js                    # Express app setup and middleware
├── server.js                 # Server entry point and database connection
├── config/                   # Configuration files
│   ├── db.js                # MongoDB connection
│   ├── openai.config.js     # OpenAI client setup
│   └── supabase.js          # Supabase initialization
├── controllers/             # Request handlers
│   ├── auth.controller.js
│   ├── course.controller.js
│   ├── deadline.controller.js
│   └── load.controller.js
├── middleware/
│   └── authMiddleware.js    # JWT/Supabase auth verification
├── models/                  # Mongoose schemas
│   ├── user.js
│   ├── course.js
│   ├── deadline.js
│   ├── studentLoad.js
│   └── aiTip.js
├── routes/                  # API route definitions
│   ├── auth.routes.js
│   ├── course.routes.js
│   ├── deadline.routes.js
│   ├── load.routes.js
│   ├── aiRoutes.js
│   ├── googleAuth.routes.js
│   └── calendar.routes.js
├── services/                # Business logic
│   ├── aiService.js         # AI recommendation generation
│   ├── loadCalculator.js    # Cognitive load algorithm
│   ├── conflictDetector.js  # Scheduling conflict detection
│   ├── googleCalendar.js    # Google Calendar integration
│   ├── deadlineSync.js
│   ├── dailyLoadCalculation.js
│   └── professorService.js
├── utils/
│   └── aiPrompts.js         # AI prompt templates
└── tests/
    └── test-ai-setup.js
```

## Core Features

### 1. Authentication (`auth.routes.js`)

- User registration and login via Supabase
- JWT token management
- Role-based access (student, professor, admin)
- Google OAuth integration

**Endpoints:**
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login and receive token
- `POST /auth/logout` - Logout user
- `GET /auth/profile` - Get current user profile

### 2. Course Management (`course.routes.js`)

- Create and manage courses
- Enroll students in courses
- Get course details and analytics

**Endpoints:**
- `GET /courses` - List all courses
- `POST /courses` - Create new course
- `GET /courses/:id` - Get course details
- `PUT /courses/:id` - Update course
- `DELETE /courses/:id` - Delete course
- `POST /courses/:id/students` - Enroll students

### 3. Deadline Management (`deadline.routes.js`)

- Create course deadlines
- Track deadline properties (difficulty, type, estimated hours)
- Update and delete deadlines

**Endpoints:**
- `GET /deadlines` - List deadlines
- `POST /deadlines` - Create deadline
- `GET /deadlines/:id` - Get deadline details
- `PUT /deadlines/:id` - Update deadline
- `DELETE /deadlines/:id` - Delete deadline

### 4. Cognitive Load Calculation (`load.routes.js`)

Real-time calculation of student workload based on:

- Days until deadline (proximity factor)
- Assignment difficulty (1-5 scale)
- Task type (assignment, project, exam)
- Multiple deadlines on same date

**Endpoints:**
- `GET /load/:studentId` - Get student's current load
- `GET /load/:studentId/range?days=30` - Get load projection
- `GET /load/class/:courseId` - Get class average load

**Load Scoring:**

The algorithm weighs multiple factors:

```
Load = Base Points × Type Multiplier × Proximity Factor

Base Points (by difficulty):
  1: 10 points
  2: 15 points
  3: 20 points
  4: 25 points
  5: 30 points

Type Multiplier:
  assignment: 1.0x
  project: 1.5x
  exam: 2.0x

Proximity Factor:
  0 days (today): 3.0x
  1 day: 2.5x
  2-3 days: 2.0x
  4-7 days: 1.5x
  8+ days: 14/(days+1)

Risk Levels:
  Low: 0-30
  Medium: 31-60
  High: 61-80
  Danger: 81-100+
```

### 5. AI Services (`aiRoutes.js`)

Uses OpenAI GPT-4 to provide:

- **Student Tips**: Personalized productivity recommendations based on high-load periods
- **Professor Recommendations**: Suggestions to balance class workload
- **Workload Analysis**: Detailed insights into load patterns

**Endpoints:**
- `GET /ai/tip/:studentId` - Generate personalized tip
- `GET /ai/recommendation/:professorId` - Get professor recommendations
- `POST /ai/analyze` - Analyze workload patterns

**AI Features:**

- Fallback tips if API fails
- Contextual recommendations based on load peaks
- Encouragement for well-managed students
- Risk-level aware suggestions

### 6. Conflict Detection

Service to identify scheduling conflicts:

- Multiple deadlines on same date
- High-difficulty task clustering
- Exam scheduling conflicts
- Cross-course overlaps

**Output:**

```javascript
{
  date: "2024-06-15",
  count: 3,
  risk_level: "high",
  deadlines: [
    {
      id: "...",
      title: "Math Project",
      course: "MATH 101",
      difficulty: 4,
      type: "project"
    },
    // ...
  ]
}
```

### 7. Google Calendar Integration (`googleAuth.routes.js`, `calendar.routes.js`)

- Authenticate users with Google OAuth
- Sync deadlines to Google Calendar
- Pull calendar events
- Check availability

**Endpoints:**
- `POST /api/google/auth` - Initiate Google OAuth
- `GET /api/google/callback` - OAuth callback
- `GET /api/calendar/events` - Retrieve calendar events
- `POST /api/calendar/sync` - Sync deadlines to calendar

## Database Models

### User

```javascript
{
  _id: ObjectId,
  supabase_id: String (unique),
  email: String,
  name: String,
  role: String (enum: ["student", "professor", "admin"]),
  createdAt: Date,
  updatedAt: Date
}
```

### Course

```javascript
{
  _id: ObjectId,
  name: String,
  code: String,
  professor_id: ObjectId (ref: User),
  student_ids: [ObjectId] (ref: User),
  credits: Number,
  semester: String,
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Deadline

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  course_id: ObjectId (ref: Course),
  deadline_date: Date,
  type: String (enum: ["assignment", "project", "exam"]),
  difficulty: Number (1-5),
  estimated_hours: Number,
  is_completed: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### StudentLoad

```javascript
{
  _id: ObjectId,
  student_id: ObjectId (ref: User),
  date: Date,
  load_score: Number (0-100),
  risk_level: String,
  deadlines_count: Number,
  deadlines: [Object],
  createdAt: Date,
  updatedAt: Date
}
```

### AITip

```javascript
{
  _id: ObjectId,
  user_id: ObjectId (ref: User),
  tip_text: String,
  tip_type: String,
  metadata: {
    load_score: Number,
    risk_level: String,
    affected_dates: [Date],
    priority: String
  },
  createdAt: Date
}
```

## Middleware

### Authentication Middleware

Validates Supabase tokens and populates `req.user`:

```javascript
const authMiddleware = require('./middleware/authMiddleware');

app.use('/protected-route', authMiddleware, controllerFunction);
```

Provides:
- `req.user.id` - User ID
- `req.user.email` - User email
- `req.user.role` - User role

## Services

### LoadCalculator Service

Main calculation engine for cognitive load:

```javascript
const loadCalculator = require('./services/loadCalculator');

// Calculate daily load
const dailyLoad = loadCalculator.calculateDailyLoad(deadlines, date);
// Returns: { load_score, risk_level, deadlines_count, deadlines }

// Calculate load range
const loadRange = loadCalculator.calculateLoadRange(deadlines, startDate, days);
// Returns: [{ date, load_score, risk_level, ... }, ...]

// Find peak days
const peaks = loadCalculator.findPeakLoadDays(loadData);
```

### AIService

AI recommendation generation:

```javascript
const aiService = require('./services/aiService');

// Generate student tip
const tip = await aiService.generateStudentTip(studentData, loadData);
// Returns: { tip, tip_id, priority }

// Generate professor recommendation
const recommendation = await aiService.generateProfessorRecommendation(
  professorData,
  classData
);
```

### ConflictDetector

Identifies scheduling conflicts:

```javascript
const conflictDetector = require('./services/conflictDetector');

const conflicts = conflictDetector.detectConflicts(deadlines);
// Returns: [{ date, count, deadlines }, ...]
```

### GoogleCalendar Service

Manages Google Calendar integration:

```javascript
const googleCalendar = require('./services/googleCalendar');

// Get user's calendar
const events = await googleCalendar.getCalendarEvents(userId);

// Add deadline to calendar
await googleCalendar.addEventToCalendar(userId, deadline);

// Sync all deadlines
await googleCalendar.syncDeadlinesToCalendar(userId, deadlines);
```

## Error Handling

The application implements centralized error handling:

```javascript
// Global error handler in app.js
app.use((err, req, res, next) => {
  console.error('Global Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.originalUrl}` });
});
```

## Configuration Files

### `config/db.js`

MongoDB connection management:

```javascript
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB Error:", error.message);
    process.exit(1);
  }
};
```

### `config/openai.config.js`

OpenAI API client initialization with GPT-4 support.

### `config/supabase.js`

Supabase client initialization for authentication.

## Testing

Run tests with:

```bash
npm test
```

Test file: `src/tests/test-ai-setup.js`

Tests AI service functionality and prompt generation.

## Dependencies

### Core

- **express** ^5.2.1 - Web framework
- **mongoose** ^9.1.2 - MongoDB ODM
- **cors** ^2.8.5 - CORS middleware
- **dotenv** ^17.2.3 - Environment variables

### External APIs

- **@supabase/supabase-js** ^2.90.1 - Supabase client
- **openai** ^6.15.0 - OpenAI API
- **googleapis** ^170.0.0 - Google APIs

### Utilities

- **node-cron** ^4.2.1 - Scheduled tasks

### Development

- **nodemon** ^3.1.11 - Auto-reload during development

## Logging

The application logs important events:

- Database connection status
- Authentication events
- API errors
- Load calculations
- AI generation results
- Conflict detections

## Performance Considerations

1. **Load Calculation**: Cached for 1 hour per student
2. **AI Generation**: Throttled to prevent API rate limiting
3. **Database Queries**: Indexed on frequently queried fields
4. **Google Calendar**: Rate-limited API calls

## Deployment

### Heroku

```bash
heroku login
heroku create campus-load-optimizer
git push heroku main
heroku config:set MONGO_URI="..."
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## Troubleshooting

### MongoDB Connection Error

Ensure `MONGO_URI` is correct and the IP is whitelisted in MongoDB Atlas.

### OpenAI API Errors

Check that `OPENAI_API_KEY` is valid and has sufficient credits.

### Google Calendar Sync Not Working

Verify `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and callback URL are correctly configured.

### Supabase Authentication Issues

Ensure `SUPABASE_URL` and `SUPABASE_KEY` are correct for your project.

## Contributing

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Create a pull request

## License

ISC
