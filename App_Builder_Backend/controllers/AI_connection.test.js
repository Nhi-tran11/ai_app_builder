const request = require('supertest');

// Mock mongoose before requiring the app
jest.mock('mongoose', () => ({
  connect: jest.fn().mockResolvedValue(),
  connection: {
    on: jest.fn(),
    once: jest.fn(),
    close: jest.fn(),
  },
}));

// Mock the User model
jest.mock('../model/User', () => {
  const mockSave = jest.fn().mockResolvedValue();
  const mockUser = jest.fn().mockImplementation(() => ({
    save: mockSave
  }));
  mockUser.findOne = jest.fn();
  mockUser.mockSave = mockSave;
  return mockUser;
});
// Mock the PromptResponse model
jest.mock('../model/PromptResponseSchema', () => ({
  create: jest.fn().mockResolvedValue({
    appName: 'Test App',
    roles: [],
    emoji: '🚀',
    '--header-bg': 'test-gradient',
    '--main-bg': 'test-bg',
    timestamps: true
  }),

  // Mock findOne.sort
  findOne: jest.fn().mockReturnValue({ sort: jest.fn().mockReturnValue(Promise.resolve({
    appName: 'Test App',
    roles: [],
    emoji: '🚀',
    '--header-bg': 'test-gradient',
    '--main-bg': 'test-bg',
    timestamps: true
  }))})

}));
// Mock Google Generative AI
jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      generateContent: jest.fn().mockResolvedValue({
        response: {
          text: jest.fn().mockReturnValue(JSON.stringify({
            appName: 'Test App',
            roles: [
              {
                role: 'user',
                features: [
                  {
                    feature: 'test feature',
                    entities: [
                      {
                        entity: 'test entity',
                        attributes: ['attr1', 'attr2']
                      }
                    ]
                  }
                ]
              }
            ],
            emoji: '🚀',
            '--header-bg': 'linear-gradient(135deg, #ffeb3b 0%, #ffc107 100%)',
            '--main-bg': 'linear-gradient(135deg, #fef9e7 0%, #fff8e1 50%, #f3e5f5 100%)'
          }))
        }
      })
    })
  }))
  }));

// Mock dotenv
jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

// Set environment variables for testing
process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
process.env.API_KEY = 'test-api-key';
process.env.PORT = '3002';

const app = require('./AI_connection');

describe('AI Connection API Tests', () => {
  let testRequest;

  beforeEach(() => {
    // Set up supertest with the app
    testRequest = request(app);
    jest.clearAllMocks();
  });

  describe('POST /signup - Validation Tests', () => {
    test('should respond with 400 when name is missing', async () => {
      return testRequest
        .post('/signup')
        .send({
          name: '',
          email: 'name@example.com',
          password: 'password123'
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toBe('All fields are required');
        });
    });

    test('should respond with 400 when email is missing', async () => {
      return testRequest
        .post('/signup')
        .send({
          name: 'John Doe',
          email: '',
          password: 'password123'
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toBe('All fields are required');
        });
    });

    test('should respond with 400 when password is missing', async () => {
      return testRequest
        .post('/signup')
        .send({
          name: 'John Doe',
          email: 'name@example.com',
          password: ''
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toBe('All fields are required');
        });
    });
    test('should respond with 400 when email already exists', async () => {
      const User = require('../model/User');
      User.findOne.mockResolvedValue({ email: 'name@example.com' });
      return testRequest
        .post('/signup')
        .send({
          name: 'John Doe',
          email: 'name@example.com',
          password: 'password123'
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toBe('email already exists');
        });
    });
    test('should respond with 201 when signup is sucessful', async()=>{
      const User =require('../model/User');
      User.findOne.mockResolvedValue(null);

      return testRequest
      .post('/signup')
      .send({
        name:'John Doe',
        email:'name@example.com',
        password:'password123'
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.message).toBe('User created successfully');
      });
    });
  });

  describe('POST /login - Validation Tests', () => {
    test('should respond with 400 when email is missing', async () => {
      return testRequest
        .post('/login')
        .send({
          email: '',
          password: 'password123'
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toBe('All fields are required');
        });
    });

    test('should respond with 400 when password is missing', async () => {
      return testRequest
        .post('/login')
        .send({
          email: 'test@example.com',
          password: ''
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toBe('All fields are required');
        });
    });
    test('should respond with 400 when email does not exist', async()=>{
      const User =require('../model/User');
      User.findOne.mockResolvedValue(null);
      return testRequest
      .post('/login')
      .send({
        email:'test11@example.com',
        password:'password123'
      })
      .expect(400)
      .expect((res)=>{
        expect(res.body.message).toBe('User does not exist');
      })
    })
    test('should respond with 400 when password is incorrect', async()=>{
      const User = require('../model/User');
      User.findOne.mockResolvedValue({password: 'password123'});
      return testRequest
      .post('/login')
      .send({
        email:'test@example.com',
        password:'wrongpassword'
      })
      .expect(400)
      .expect((res)=>{
        expect(res.body.message).toBe('Invalid password');
      })
    })
       test('should respond with 200 when login is successful', async()=>{
      const User = require('../model/User');
      User.findOne.mockResolvedValue({password: 'password123'});
      return testRequest
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toBe('Login successful');
      });
    });
  });
  
  describe('POST/query-prompt - Validation Tests', () => {
    test('should respond with 400 when prompt is missing', async () => {
      return testRequest
        .post('/query-prompt')
        .send({
          prompt: ''
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toBe('Missing required fields');
        });
    });
    test('should respond with 201 when prompt is provided', async () => {
      return testRequest
        .post('/query-prompt')
        .send({
          prompt: 'Hello, AI! Create a student management app'
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.message).toBe('Prompt processed and saved successfully');
          expect(res.body.success).toBe(true);
          expect(res.body.response).toBeDefined();
        });
      });
  });

  describe('GET/saved-prompts - Validation Tests', () => {
    test('should respond with 200 and return saved prompts', async () => {
      return testRequest
        .get('/saved-prompts')
        // .expect(200)
        .expect((res) => {
          expect(res.body.data).toBeDefined();
        });
    });
  });
  
  });