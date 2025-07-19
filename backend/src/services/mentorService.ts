
import { PrismaClient, User, Prisma } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MentorRepository, createMentorRepository } from '../repositories/mentorRepository';

const prisma = new PrismaClient();
const mentorRepository = createMentorRepository(prisma);

// Define an interface for our AI service
export interface AIService {
  getRelevantSkills(query: string): Promise<string[]>;
}

// Implement the Gemini AI service
class GeminiAIService implements AIService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set in the environment variables.');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  }

  async getRelevantSkills(query: string): Promise<string[]> {
    try {
      const processedQuery = query.replace(/\./g, ' '); // Replace periods with spaces
      const prompt = `Given the user input: "${processedQuery}", extract and return a comma-separated list of up to 5 relevant technical skills or areas of expertise that are directly or indirectly mentioned or implied. If no relevant technical skills are present, return an empty string. Do not include any additional text. Only return the comma-separated list, no other text.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const geminiSkills = text.split(',').map((skill: string) => skill.trim()).filter((skill: string) => skill.length > 0);

      console.log(`Gemini API returned skills for "${query}":`, geminiSkills);
      return geminiSkills;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return []; // Return empty array if AI call fails
    }
  }
}

const geminiAIService = new GeminiAIService();

// The service now accepts an AI service and a mentor repository as dependencies
export const findMentorsBySkill = async (
  skill: string,
  aiService: AIService = geminiAIService, // Use the Gemini service as default
  repo: MentorRepository = mentorRepository // Use the mentor repository as default
): Promise<User[]> => {
  if (!skill) {
    return prisma.user.findMany({
      where: { isMentor: true },
    });
  }

  // First, try to find mentors using only the original skill query
  const directMatchSkills = [skill.trim()].filter(s => s.length > 0);
  let mentorUsers: User[] = [];

  if (directMatchSkills.length > 0) {
    mentorUsers = await repo.findMentorsBySkills(directMatchSkills);
  }

  // If no mentors found with direct match, or if the original skill was empty, then use AI-augmented search
  if (mentorUsers.length === 0 && skill) {
    const aiGeneratedSkills = await aiService.getRelevantSkills(skill);
    const combinedSkills = Array.from(new Set([...directMatchSkills, ...aiGeneratedSkills]));

    if (combinedSkills.length === 0) {
      return [];
    }

    mentorUsers = await repo.findMentorsBySkills(combinedSkills);
  }

  return mentorUsers;
};
