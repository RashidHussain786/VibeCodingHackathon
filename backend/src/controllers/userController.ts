import { Request, Response } from 'express';
import { userService } from '../services/userService';

export const userController = {
  async updateLearningInterests(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { learningInterests } = req.body;

      if (!learningInterests || !Array.isArray(learningInterests)) {
        return res.status(400).json({ message: 'learningInterests must be an array.' });
      }

      const updatedUser = await userService.updateLearningInterests(userId, learningInterests);
      res.status(200).json(updatedUser);
    } catch (error: any) {
      if (error.code === 'P2025') { // Prisma record not found error
        return res.status(404).json({ message: 'User not found.' });
      }
      res.status(500).json({ message: error.message });
    }
  },

  async updateProfile(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { expertise, isMentor } = req.body;

      if (!expertise || !Array.isArray(expertise)) {
        return res.status(400).json({ message: 'expertise must be an array.' });
      }
      if (typeof isMentor !== 'boolean') {
        return res.status(400).json({ message: 'isMentor must be a boolean.' });
      }

      const updatedUser = await userService.updateProfile(userId, expertise, isMentor);
      res.status(200).json(updatedUser);
    } catch (error: any) {
      if (error.code === 'P2025') { // Prisma record not found error
        return res.status(404).json({ message: 'User not found.' });
      }
      res.status(500).json({ message: error.message });
    }
  },

  async searchMentors(req: Request, res: Response) {
    try {
      const { skill } = req.query;
      const mentors = await userService.searchMentors(skill as string);
      res.status(200).json(mentors);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
};