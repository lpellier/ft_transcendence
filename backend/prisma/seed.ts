import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	await prisma.user.create({
		data:{
			id: 1,
			username: "mock",
			stats: {
				create: {}
			  }	  
		}
	})
  const room = await prisma.room.findUnique({
    where: {
      id: 1,
    },
  });
  if (!room) {
    await prisma.room.create({
      data: {
        name: 'general',
        ownerId: 60040,
        visibility: 'public',
        password: '',
      },
    });
  }
}

main();
