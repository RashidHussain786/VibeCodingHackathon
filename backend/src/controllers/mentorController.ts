
import { Request, Response } from 'express';
import { findMentorsBySkill } from '../services/mentorService';

export const searchMentors = async (req: Request, res: Response) => {
  try {
    const { skill } = req.query;
    const mentors = await findMentorsBySkill(skill as string);
    res.json(mentors);
  } catch (error) {
    console.error('Error searching for mentors:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
