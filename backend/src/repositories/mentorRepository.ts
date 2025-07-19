import { PrismaClient, User, Prisma } from '@prisma/client';

export interface MentorRepository {
  findMentorsBySkills(skills: string[]): Promise<User[]>;
}

export const createMentorRepository = (prisma: PrismaClient): MentorRepository => {
  return {
    async findMentorsBySkills(skills: string[]): Promise<User[]> {
      if (skills.length === 0) {
        return [];
      }

      const mentorUsers = await prisma.$queryRaw<User[]>`
        SELECT * FROM "User"
        WHERE "isMentor" = TRUE
        AND (
          ${Prisma.join(skills.map(s => {
            const pattern = s.replace(/\.|\s/g, '%'); // Replace periods and spaces with % wildcard
            return Prisma.sql`EXISTS (SELECT 1 FROM unnest("expertise") AS exp WHERE exp ILIKE ${'%' + pattern + '%'})`;
          }), ' OR ')}
        );
      `;
      return mentorUsers;
    },
  };
};