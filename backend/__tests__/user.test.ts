import request from 'supertest';
import app from '../src/index'; // Assuming your Express app is exported from src/index.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('User Learning Interests API', () => {
  let userId: string;

  beforeAll(async () => {
    // Create a dummy user for testing
    const timestamp = Date.now();
    const user = await prisma.user.create({
      data: {
        email: `test_${timestamp}@example.com`,
      },
    });
    userId = user.id;
  });

  afterAll(async () => {
    // Clean up the dummy user
    await prisma.user.deleteMany({ where: { id: userId } });
    await prisma.$disconnect();
  });

  it('should update user learning interests', async () => {
    const newInterests = ['React', 'Node.js', 'TypeScript'];
    const response = await request(app)
      .put(`/api/users/${userId}/learning-interests`)
      .send({ learningInterests: newInterests })
      .expect(200);

    expect(response.body.learningInterests).toEqual(newInterests);

    // Verify the interests are updated in the database
    const updatedUser = await prisma.user.findUnique({ where: { id: userId } });
    expect(updatedUser?.learningInterests).toEqual(newInterests);
  });

  it('should update user expertise and mentorship status', async () => {
    const newExpertise = ['Cloud Computing', 'DevOps'];
    const newIsMentor = true;

    const response = await request(app)
      .put(`/api/users/${userId}/profile`)
      .send({ expertise: newExpertise, isMentor: newIsMentor })
      .expect(200);

    expect(response.body.expertise).toEqual(newExpertise);
    expect(response.body.isMentor).toEqual(newIsMentor);

    // Verify the fields are updated in the database
    const updatedUser = await prisma.user.findUnique({ where: { id: userId } });
    expect(updatedUser?.expertise).toEqual(newExpertise);
    expect(updatedUser?.isMentor).toEqual(newIsMentor);
  });

  describe('Mentor Search API', () => {
    let mentor1Email: string;
    let mentor2Email: string;
    let nonMentorEmail: string;

    beforeAll(async () => {
      const timestamp = Date.now();
      mentor1Email = `mentor1_${timestamp}@example.com`;
      mentor2Email = `mentor2_${timestamp}@example.com`;
      nonMentorEmail = `nonmentor_${timestamp}@example.com`;

      // Create dummy mentors for testing
      await prisma.user.create({
        data: {
          email: mentor1Email,
          expertise: ['React', 'Frontend'],
          isMentor: true,
        },
      });
      await prisma.user.create({
        data: {
          email: mentor2Email,
          expertise: ['Node.js', 'Backend'],
          isMentor: true,
        },
      });
      await prisma.user.create({
        data: {
          email: nonMentorEmail,
          expertise: ['React'],
          isMentor: false,
        },
      });
    });

    afterAll(async () => {
      await prisma.user.deleteMany({ where: { email: { in: [mentor1Email, mentor2Email, nonMentorEmail] } } });
    });

    it('should return mentors based on skill search', async () => {
      const response = await request(app)
        .get('/api/mentors/search?skill=React')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].email).toBe(mentor1Email);
      expect(response.body[0].expertise).toContain('React');
      expect(response.body[0].isMentor).toBe(true);
    });

    it('should return an empty array if no mentors match', async () => {
      const response = await request(app)
        .get('/api/mentors/search?skill=NonExistentSkill')
        .expect(200);

      expect(response.body).toHaveLength(0);
    });

    it('should return all mentors if no skill is provided', async () => {
      const response = await request(app)
        .get('/api/mentors/search')
        .expect(200);

      expect(response.body.length).toBeGreaterThanOrEqual(2); // At least mentor1 and mentor2
      expect(response.body.some((mentor: any) => mentor.email === mentor1Email)).toBe(true);
      expect(response.body.some((mentor: any) => mentor.email === mentor2Email)).toBe(true);
      expect(response.body.every((mentor: any) => mentor.isMentor === true)).toBe(true); // Only mentors
    });
  });
});