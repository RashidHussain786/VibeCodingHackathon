
import request from 'supertest';
import app from '../src/index';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Mock the GoogleGenerativeAI library
jest.mock('@google/generative-ai', () => {
  const mockGenerateContent = jest.fn();
  const mockGetGenerativeModel = jest.fn(() => ({
    generateContent: mockGenerateContent,
  }));

  return {
    GoogleGenerativeAI: jest.fn(() => ({
      getGenerativeModel: mockGetGenerativeModel,
    })),
    mockGenerateContent, // Export for individual test configuration
  };
});

// Destructure the mock for easier access in tests
const { mockGenerateContent } = require('@google/generative-ai');

describe('POST /api/knowledge/ask', () => {
  beforeEach(() => {
    // Clear mock history before each test
    jest.clearAllMocks();
  });

  it('should return a 200 OK and an answer for a valid question', async () => {
    const question = 'What is the vacation policy?';
    const expectedAnswer = 'You get 15 days of paid leave per year.';

    // Configure the mock response for this specific test
    mockGenerateContent.mockResolvedValueOnce({
      response: {
        text: () => expectedAnswer,
      },
    });

    const response = await request(app)
      .post('/api/knowledge/ask')
      .send({ question })
      .expect(200);

    expect(response.body.answer).toBe(expectedAnswer);
    expect(mockGenerateContent).toHaveBeenCalledTimes(1);
  });

  it('should return a 400 Bad Request if the question is missing', async () => {
    const response = await request(app)
      .post('/api/knowledge/ask')
      .send({}) // No question provided
      .expect(400);

    expect(response.body.error).toBe('Question is required.');
    expect(mockGenerateContent).not.toHaveBeenCalled();
  });

  it('should handle errors from the generative AI service', async () => {
    const question = 'This will fail';
    const errorMessage = 'AI service is down';

    // Configure the mock to reject the promise
    mockGenerateContent.mockRejectedValueOnce(new Error(errorMessage));

    const response = await request(app)
      .post('/api/knowledge/ask')
      .send({ question })
      .expect(500);

    // Depending on your error handling middleware, the body might be empty or have a generic message
    // For this example, we assume a generic error response
    expect(response.body).toEqual({});
    expect(mockGenerateContent).toHaveBeenCalledTimes(1);
  });
});
