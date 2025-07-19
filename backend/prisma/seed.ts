import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a dummy user if one doesn't already exist
  let user = await prisma.user.findUnique({ where: { email: 'dummy@example.com' } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'dummy@example.com',
        learningInterests: ['Initial Interest 1', 'Initial Interest 2'],
        expertise: ['React', 'Node.js', 'TypeScript', 'Cloud Computing'],
        isMentor: true,
      },
    });
    console.log(`Created dummy user with ID: ${user.id}`);
  } else {
    console.log(`Dummy user already exists with ID: ${user.id}`);
  }

  // Create another dummy mentor
  let mentor2 = await prisma.user.findUnique({ where: { email: 'mentor2@example.com' } });
  if (!mentor2) {
    mentor2 = await prisma.user.create({
      data: {
        email: 'mentor2@example.com',
        learningInterests: [],
        expertise: ['Project Management', 'Agile', 'Leadership'],
        isMentor: true,
      },
    });
    console.log(`Created dummy mentor2 with ID: ${mentor2.id}`);
  } else {
    console.log(`Dummy mentor2 already exists with ID: ${mentor2.id}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });