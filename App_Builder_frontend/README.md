# Mini AI App Builder Portal🍋

A modern React-based web application that generates websites using AI technology. This project features a beautiful inspired design with user authentication and AI-powered content generation.

## Features

- **AI-Powered Website Generation**: Generate unique websites based on user prompts
- **User Authentication**: Complete sign-up and login system
- **Modern UI Design**: interface with vibrant gradients and smooth animations
- **Real-time AI Integration**: Connect with AI services for dynamic content generation

##  Tech Stack

- **Frontend**: React 19.1.1
- **Routing**: React Router DOM 7.8.1
- **Styling**: CSS3 with modern gradients and animations
- **HTTP Client**: Axios 1.11.0
- **Testing**: React Testing Library
- **Build Tool**: Create React App

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Mini_AI_App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation header with logo and user actions
│   ├── Header.css         # Header styling
│   ├── HomePage.js        # Main landing page with AI prompt interface
│   ├── HomePage.css       # Home page styling
│   ├── LogIn.js           # User login component
│   ├── LogIn.css          # Login form styling
│   ├── SignUp.js          # User registration component
│   └── SignUp.css         # Sign-up form styling
├── App.js                 # Main application component with routing
├── App.css                # Global application styles
├── index.js               # Application entry point
└── index.css              # Base CSS styles
```

##  Available Scripts

- `npm start` - Run the app in development mode
- `npm test` - Launch the test runner
- `npm run build` - Build the app for production
- `npm run eject` - Eject from Create React App (one-way operation)

##  API Integration

The application integrates with two backend services:

### Authentication API (Port 5000)
- **POST** `/signup` - User registration
- **POST** `/login` - User authentication

### AI Service API (Port 5000)
- **POST** `/query-prompt` - Generate AI content based on user prompts

##  Design Features

- **inspired theme** with vibrant yellow and orange gradients
- **Glassmorphism effects** with backdrop filters and translucent cards
- **Smooth animations** including fade-in effects and hover transitions
- **Custom scrollbar** styling

##  Components Overview

### [`Header`](src/components/Header.js)
- Navigation bar with logo and user actions
- Responsive design with mobile optimization
- Integrated routing for seamless navigation

### [`HomePage`](src/components/HomePage.js)
- Main interface for AI website generation
- Text area for user prompts
- Real-time AI response handling
- Error handling and user feedback

### [`LogIn`](src/components/LogIn.js) & [`SignUp`](src/components/SignUp.js)
- Complete authentication forms
- Form validation and error handling
- Consistent styling with the app theme
- Secure API integration

## Getting Started with Development

1. **Set up backend services**
   - Ensure your authentication API is running on port 5000
   - Ensure your AI service is running on port 5000

2. **Configure API endpoints**
   Update the API URLs in the components if needed:
   - Authentication: `http://localhost:5000`
   - AI Service: `http://localhost:5000`

3. **Start developing**
   ```bash
   npm start
   ```

## Testing

Run the test suite:
```bash
npm test
```

The project includes basic React component tests and can be extended with additional test cases.

## Building for Production

Create a production build:
```bash
npm run build
```

The build folder will contain optimized static files ready for deployment.

#