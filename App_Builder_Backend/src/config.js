// Configuration utility to manage environment variables
require('dotenv').config();

const config = {
    // Server Configuration
    server: {
        port: parseInt(process.env.PORT) || 3000,
        nodeEnv: process.env.NODE_ENV || 'development',
        frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
        debug: process.env.DEBUG === 'true'
    },

   
};

// Validation function to check required environment variables
const validateConfig = () => {
    const requiredVars = [
    ];

    const missing = requiredVars.filter(varName => !process.env[varName]);
    
    if (missing.length > 0) {
        console.error('Missing required environment variables:', missing.join(', '));
        process.exit(1);
    }
};

module.exports = { config, validateConfig };
