import { Request, Response, NextFunction } from 'express';
import { KnowledgeController } from '../src/controllers/knowledgeController';
import { KnowledgeService } from '../src/services/knowledgeService';

describe('KnowledgeController', () => {
  let knowledgeController: KnowledgeController;
  let mockKnowledgeService: KnowledgeService;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    // Create a real instance of KnowledgeService, but mock its methods
    mockKnowledgeService = new KnowledgeService('dummy-api-key');
    jest.spyOn(mockKnowledgeService, 'askQuestion').mockResolvedValue({ answer: '' });

    knowledgeController = new KnowledgeController(mockKnowledgeService);

    mockRequest = {
      body: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it('should return 200 and the AI answer if successful', async () => {
    const question = 'What is the capital of France?';
    const aiAnswer = 'Paris';
    mockRequest.body = { question };
    (mockKnowledgeService.askQuestion as jest.Mock).mockResolvedValueOnce({ answer: aiAnswer });

    await knowledgeController.ask(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockKnowledgeService.askQuestion).toHaveBeenCalledWith(question);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ answer: aiAnswer });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 400 if question is missing', async () => {
    mockRequest.body = {};

    await knowledgeController.ask(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockKnowledgeService.askQuestion).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Question is required.' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should call next with error if KnowledgeService throws an error', async () => {
    const question = 'What is the capital of France?';
    const errorMessage = 'Gemini API error';
    mockRequest.body = { question };
    (mockKnowledgeService.askQuestion as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await knowledgeController.ask(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockKnowledgeService.askQuestion).toHaveBeenCalledWith(question);
    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });
});