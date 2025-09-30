# AI Web Generator

A comprehensive AI-powered web application generator that creates custom websites based on user prompts. This project consists of three main components: an AI-powered app builder frontend, a generated user application, and a backend service.

## Project Structure

```
AI_WEB_GENERATOR/
├── App_Builder_Backend/          # Backend API with AI integration
├── App_Builder_frontend/         # Main app builder interface
├── User_App_AI/                 # Generated user application
└── README.md
```

## Features

- **AI-Powered Generation**: Uses Google's Gemini AI to generate app structures from user prompts
- **Dynamic UI Creation**: Automatically creates user interfaces 
- **Role-Based Architecture**: Generates role-specific features and entities
- **Real-time Theming**: Dynamic header and background gradients
- **User Authentication**: Complete signup/login system


##  Components Overview

### 1. App Builder Backend (App_Builder_Backend)

**Tech Stack**: Node.js, Express, MongoDB, Google Generative AI, Jest(unitest)

**Key Features**:
- RESTful API endpoints for user authentication
- AI prompt processing with Google Gemini
- MongoDB integration for data persistence
- CORS configuration for cross-origin requests

**API Endpoints**:
- `POST /signup` - User registration
- `POST /login` - User authentication  
- `POST /query-prompt` - AI content generation
- `GET /saved-prompts` - Retrieve generated content

### 2. App Builder Frontend (App_Builder_frontend)

**Tech Stack**: React 19.1.1, React Router, CSS3

### 3. User App AI (User_App_AI)

**Tech Stack**: React 19.1.1, React Router, Vitest(unitest)

**Key Features**:
- Dynamic header that adapts to AI-generated content
- Role-based navigation menu
- Feature-driven page generation
- Form creation based on AI-analyzed entities

**Dynamic Components**:
- **Header** - Adapts to AI responses
- **Feature** - Displays generated features
- **Form** - Creates forms from entities

## Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB
- Google AI API Key

### 1. Clone the Repository
```bash
git clone <https://github.com/Nhi-tran11/ai_app_builder.git>
cd AI_WEB_GENERATOR
```

### 2. Backend Setup
```bash
cd App_Builder_Backend
npm install
```

Create `.env` file:
```env
MONGODB_URI=add your mongoDB URI
API_KEY=your_google_ai_api_key
PORT=5000
```

Start backend:
```bash
npm start
```

### 3. App Builder Frontend Setup
```bash
cd App_Builder_frontend
npm install
npm start
```
Access at: [http://localhost:3000](http://localhost:3000)

### 4. User App Setup
```bash
cd User_App_AI
npm install
npm start
```
Access at: [http://localhost:3001](http://localhost:3001)

## How It Works

1. **Prompt Input**: User enters a description of their desired application
2. **AI Processing**: Google Gemini analyzes the prompt and extracts:
   - App name and emoji
   - User roles (e.g., admin, teacher, student)
   - Features for each role
   - Entities with attributes
   - Custom theme colors
3. **Dynamic Generation**: The user app adapts its interface based on AI output
4. **Interactive Navigation**: Generated roles become navigation menu items
5. **Form Creation**: Entities become interactive forms with proper validation

## Example Workflow

**Input Prompt**: 
```
"I want an app to manage student courses and grades. Teachers add courses, students enroll, and admins manage reports."
```

**AI Analysis Results**:
- **App Name**: Course Manager  
- **Roles**: Teacher, Student, Admin  
- **Features**:  
  - **Teacher**: Add Courses, Grade Students  
  - **Student**: Enroll in Courses, View Grades  
  - **Admin**: Generate Reports, Manage Users  
- **Entities**:  
  - **Student** (Name, Email, Age)  
  - **Course** (Title, Code, Credits)  
  - **Grade** (Student, Course, Score)  
- **emoji**: 📚  
- **--header-bg**: `linear-gradient(135deg, #ffeb3b 0%, #ffc107 100%)`  
- **--main-bg**: `linear-gradient(135deg, #fef9e7 0%, #fff8e1 50%, #f3e5f5 100%)`  

## Testing

Both frontend applications include comprehensive test suites:

```bash
# Backend tests
cd App_Builder_Backend
npm test

# Frontend tests  
cd App_Builder_frontend
npm test

# User app tests
cd User_App_AI  
npm test
```
