const mongoose = require('mongoose');

describe ('User Model Tests',() =>{
    beforeAll(async () => {
        // Mock the mongoose connect method
        jest.spyOn(mongoose, 'connect').mockImplementation(() => Promise.resolve());
        await mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        // Mock the mongoose disconnect method
        jest.spyOn(mongoose, 'disconnect').mockImplementation(() => Promise.resolve());
        await mongoose.disconnect();
    });

    test('Should create model instance with required fields', () => {
        const User = require('./User');
        const user = new User({
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'password123'
        })
        expect(user.name).toBe('Test User');
        expect(user.email).toBe('testuser@example.com');
        expect(user.password).toBe('password123');
    });
    
    test('Should require email field', () => {
        const User = require('./User');
        const user = new User({
            name: 'Test User',
            password: 'password123'
        });
        const error = user.validateSync();
        expect(error.errors['email']).toBeDefined();
    });

    test('Should require password field', () => {
        const User = require('./User');
        const user = new User({
            name: 'Test User',
            email: 'testuser@example.com',
            password: ''
        });
        const error = user.validateSync();
        expect(error.errors['password']).toBeDefined();
    });

    test('Should require name field', () => {
        const User = require('./User');
        const user = new User({
            email: 'testuser@example.com',
            password: 'password123'
        });
        const error = user.validateSync();
        expect(error.errors['name']).toBeDefined();
    });
});