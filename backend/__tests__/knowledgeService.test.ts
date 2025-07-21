import { KnowledgeService } from '../src/services/knowledgeService';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Mock the GoogleGenerativeAI module
jest.mock('@google/generative-ai');

describe('KnowledgeService', () => {
  let knowledgeService: KnowledgeService;
  let mockGenerativeModel: any;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Mock the GenerativeModel instance and its generateContent method
    mockGenerativeModel = {
      generateContent: jest.fn(),
    };

    // Mock the GoogleGenerativeAI constructor to return our mock instance
    (GoogleGenerativeAI as jest.Mock).mockImplementation(() => ({
      getGenerativeModel: jest.fn(() => mockGenerativeModel),
    }));

    // Initialize the service with a dummy API key
    knowledgeService = new KnowledgeService('dummy-api-key');
  });

  it('should return an AI answer for a given question', async () => {
    const question = 'What is the capital of France?';
    const mockAiResponse = 'Paris';

    mockGenerativeModel.generateContent.mockResolvedValueOnce({
      response: {
        text: () => mockAiResponse,
      },
    });

    const result = await knowledgeService.askQuestion(question);

    expect(mockGenerativeModel.generateContent).toHaveBeenCalledTimes(1);
    expect(mockGenerativeModel.generateContent).toHaveBeenCalledWith(question);
    expect(result).toEqual({ answer: mockAiResponse });
  });

  it('should handle errors from the Gemini API', async () => {
    const question = 'Tell me about something complex.';
    const errorMessage = 'API error';

    mockGenerativeModel.generateContent.mockRejectedValueOnce(new Error(errorMessage));

    await expect(knowledgeService.askQuestion(question)).rejects.toThrow(errorMessage);
    expect(mockGenerativeModel.generateContent).toHaveBeenCalledTimes(1);
    expect(mockGenerativeModel.generateContent).toHaveBeenCalledWith(question);
  });

  it('should incorporate mock internal knowledge for RAG', async () => {
    const question = 'What is the WFH policy?';
    const mockInternalKnowledge = 'Our WFH policy allows for remote work on Tuesdays and Thursdays.';
    const expectedPrompt = `Context: ${mockInternalKnowledge}\n\nQuestion: ${question}\n\nAnswer:`;
    const mockAiResponse = 'You can work from home on Tuesdays and Thursdays.';

    // Temporarily modify the internal knowledge for this test
    (knowledgeService as any).internalKnowledge = mockInternalKnowledge;

    mockGenerativeModel.generateContent.mockResolvedValueOnce({
      response: {
        text: () => mockAiResponse,
      },
    });

    const result = await knowledgeService.askQuestion(question);

    expect(mockGenerativeModel.generateContent).toHaveBeenCalledTimes(1);
    expect(mockGenerativeModel.generateContent).toHaveBeenCalledWith(expectedPrompt);
    expect(result).toEqual({ answer: mockAiResponse });
  });
});
