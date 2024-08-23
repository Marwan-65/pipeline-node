// Import Jest's mock utilities
const request = require('supertest');

jest.mock('mysql', () => {
    const mClient = {
      connect: jest.fn((callback) => callback()), // Mock connect method
      query: jest.fn(), // Mock query method
      end: jest.fn(), // Mock end method
    };
    return {
      createConnection: jest.fn(() => mClient), // Mock createConnection to return the mock client
    };
  });

// Mock 'con' before importing the 'app' and 'con'
jest.mock('../server', () => {
  const originalModule = jest.requireActual('../server');

  // Mock the 'con' object
  originalModule.con.query = jest.fn().mockImplementation(() => {
    console.log('Mocked query function called');
    return Promise.resolve('mocked result'); // You can return a promise or any other mocked result here
  });

  originalModule.con.connect = jest.fn().mockImplementation(() => {
    console.log('Mocked connect function called');
  });

  return originalModule;
});

// Now import the 'app' and 'con' after setting up mocks
const { app, con } = require('../server');

// Ensure to clear mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

// Your test suite
describe('GET /', () => {
  it('should respond with a message', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });
});
