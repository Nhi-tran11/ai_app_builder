// MongoDB connection
require('dotenv').config();
// Main entry point for the backend application
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ai = new GoogleGenerativeAI(process.env.API_KEY);
const PromptResponse = require('../model/PromptResponseSchema');
const User = require('../model/user');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT ;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ['*', 'http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT']
}));
app.post('/signup',async(req, res)=>{
    const {name, email, password}=req.body
    if(!name||!email||!password){
        return res.status(400).json({message:'All fields are required'})
    }
    const userExists=await User.findOne({email})
    if(userExists){
        return res.status(400).json({message:'email already exists'})
    }
    const newUser=new User({name, email, password})
    await newUser.save()
    return res.status(201).json({message:'User created successfully'})
})
app.post('/login', async (req, res)=>{
    const {email, password}=req.body
    if(!email||!password){
        return res.status(400).json({message:'All fields are required'})
    }
    const findUser=await User.findOne({email})
    if(!findUser){
        return res.status(400).json({message:'User does not exist'})
    }
    else{
        if(findUser.password===password){
            return res.status(200).json({message:'Login successful'})
        }
        else{
            return res.status(400).json({message:'Invalid password'})
        }
    }
})

// Placeholder for the actual queryPrompt function that would be imported
async function queryPrompt(prompt) {

    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
    // Format the content with all parameters
    const formattedContent = [
        {
            parts: [
                {
                    text: `Now you are a AI agent which help caturing user's requirements to add "app name, role of user,features and entities". For example, user input is "I want an app to manage student courses and grades. Teachers add courses, students enrol,
and admins manage reports.". You have to capture all relevant details such as following:\n
app name: Course Manager,\n role of user: Teacher, student and admin,\n features: add courses, enroll student, view report, entities: students, courses, grades.\n From entities, you need give me some examples of each entity and their attributes such as - Student → Name, Email, Age
- Course → Title, Code, Credits
- Grade → Student, Course, Grade.\n.Give one emoji for app.\n and give a new gradient to change header and relevant main background (only light colour) such as linear-gradient(135deg, #ffeb3b 0%, #ffc107 100%) and linear-gradient(135deg, #fef9e7 0%, #fff8e1 50%, #f3e5f5 100%)respectively. Base on request of Prompt: ${prompt}.You must return a JSON object with the following structure and do not add any characters:

{
  "appName": "string",
  "roles": [
    {
      "role": "string",
      "features": [
        {
          "feature": "string",
          "entities": [
            {
              "entity": "string",
              "attributes": ["string", "..."]
            }
          ]
        }
      ]
    }
  ],
  "emoji": "string",
  "--header-bg": "string",
  "--main-bg": "string"
}`,
                }
            ]
        }
    ];

    const result = await model.generateContent(formattedContent[0].parts[0].text);
    const response = await result.response;
    console.log(response.text);
    return response.text();
}

// Endpoint to handle prompt queries
app.post('/query-prompt', async (req, res) => {
    try {
        const { prompt } = req.body;
        // Validate input
        if (!prompt) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        console.log('Processing prompt:', prompt);

        // Get AI response
        const response = await queryPrompt(prompt);

        // Parse the JSON response
        const unescapedObject = JSON.parse(response.replace(/```json\s*/, '').replace(/```$/, ''));

        PromptResponse.create({
            appName: unescapedObject.appName,
            roles: unescapedObject.roles,
            emoji: unescapedObject.emoji,
            "--header-bg": unescapedObject["--header-bg"],
            "--main-bg": unescapedObject["--main-bg"],
            timestamps: true

        });

        res.status(201).json({
            success: true,
            response: unescapedObject,
            message: 'Prompt processed and saved successfully',
            rawResponse: response
        });

    } catch (error) {
        console.error('Error processing prompt:', error);
        res.status(500).json({
            success: false,
            message: 'Error processing your prompt',
            error: error.message
        });
    }
});

// // Get all saved prompts and responses
app.get('/saved-prompts', async (req, res) => {
    try {
        const savedPrompts = await PromptResponse.findOne()
            .sort({ createdAt: -1 }) // Sort by newest first


        res.json({
            data: savedPrompts,
        });
    } catch (error) {
        console.error('Error fetching saved prompts:', error);
        res.status(500).json({
            message: 'Error fetching saved prompts',
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// Default route
app.get('/', (req, res) => {
    res.json({
        message: 'AI Web Generator Backend API',
        status: 'running',
        endpoints: {
            health: '/health',
            queryPrompt: '/query-prompt'
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 AI Web Generator Backend running on port ${PORT}`);
    console.log(`🤖 AI connection controller active`);
    console.log(`🔗 Frontend URL: http://localhost:3000`);
});