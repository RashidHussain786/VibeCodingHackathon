import { Router } from 'express';
import { createKnowledgeController } from '../controllers/knowledgeController';
import { createKnowledgeService } from '../services/knowledgeService';

// Create instances of the service and controller
const knowledgeService = createKnowledgeService(process.env.GEMINI_API_KEY || 'DUMMY_API_KEY');
const knowledgeController = createKnowledgeController(knowledgeService);

// Create a new router
const knowledgeRouter = Router();

// Define the route
knowledgeRouter.post('/ask', knowledgeController.ask);

export { knowledgeRouter };