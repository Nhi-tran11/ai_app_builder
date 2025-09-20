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

    // Database Configuration (uncomment when needed)
    // database: {
    //     host: process.env.DB_HOST || 'localhost',
    //     port: parseInt(process.env.DB_PORT) || 5432,
    //     name: process.env.DB_NAME || 'your_database_name',
    //     user: process.env.DB_USER || 'your_username',
    //     password: process.env.DB_PASSWORD || 'your_password'
    // },

    // API Keys (uncomment when needed)
    // apiKeys: {
    //     openai: process.env.OPENAI_API_KEY,
    //     google: process.env.GOOGLE_API_KEY
    // },

    // JWT Configuration (uncomment when needed)
    // jwt: {
    //     secret: process.env.JWT_SECRET || 'fallback_secret_key'
    // },

    // External Services (uncomment when needed)
    // services: {
    //     redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    //     smtp: {
    //         host: process.env.SMTP_HOST || 'smtp.gmail.com',
    //         port: parseInt(process.env.SMTP_PORT) || 587,
    //         user: process.env.SMTP_USER,
    //         password: process.env.SMTP_PASSWORD
    //     }
    // }
};

// Validation function to check required environment variables
const validateConfig = () => {
    const requiredVars = [
        // Add required environment variables here
        // 'OPENAI_API_KEY',
        // 'DB_PASSWORD',
        // 'JWT_SECRET'
    ];

    const missing = requiredVars.filter(varName => !process.env[varName]);
    
    if (missing.length > 0) {
        console.error('❌ Missing required environment variables:', missing.join(', '));
        process.exit(1);
    }
};

module.exports = { config, validateConfig };
