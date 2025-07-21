import { Request, Response, NextFunction } from 'express';
import { KnowledgeService } from '../services/knowledgeService';

export class KnowledgeController {
  private knowledgeService: KnowledgeService;

  constructor(knowledgeService: KnowledgeService) {
    this.knowledgeService = knowledgeService;
  }

  ask = async (req: Request, res: Response, next: NextFunction) => {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required.' });
    }

    try {
      const result = await this.knowledgeService.askQuestion(question);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}

export const createKnowledgeController = (knowledgeService: KnowledgeService) => {
  return new KnowledgeController(knowledgeService);
};
