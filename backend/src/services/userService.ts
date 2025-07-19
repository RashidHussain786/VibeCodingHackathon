import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const userService = {
  async updateLearningInterests(userId: string, interests: string[]) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { learningInterests: interests },
    });
    return user;
  },

  async updateProfile(userId: string, expertise: string[], isMentor: boolean) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { expertise, isMentor },
    });
    return user;
  },

  async searchMentors(skill?: string) {
    const whereClause: any = { isMentor: true };
    if (skill) {
      whereClause.expertise = {
        has: skill,
      };
    }
    const mentors = await prisma.user.findMany({
      where: whereClause,
      select: { // Select only necessary fields to return
        id: true,
        email: true,
        expertise: true,
        isMentor: true,
      },
    });
    return mentors;
  },
};