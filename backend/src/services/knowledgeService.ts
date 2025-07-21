import { GoogleGenerativeAI } from '@google/generative-ai';

export class KnowledgeService {
  private genAI: GoogleGenerativeAI;
  private internalKnowledge: string = 'Our WFH policy allows for remote work on Tuesdays and Thursdays. Our vacation policy grants 15 days of paid leave per year.';

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async askQuestion(question: string): Promise<{ answer: string }> {
    let prompt = question;

    // Simple RAG: Check if the question is related to internal knowledge
    if (question.toLowerCase().includes('wfh policy') || question.toLowerCase().includes('vacation policy')) {
      prompt = `Context: ${this.internalKnowledge}

Question: ${question}

Answer:`;
    }

    const model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return { answer: text };
  }
}

export const createKnowledgeService = (apiKey: string) => {
  return new KnowledgeService(apiKey);
};
