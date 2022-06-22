import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
<<<<<<< profile-with-stats-implementation
  const mock = prisma.user.findUnique({
    where: {
      id: 1,
    },
  });
  if (!mock) {
    await prisma.user.create({
      data: {
        id: 1,
        username: 'mock',
        stats: {
          create: {},
        },
      },
    });
  }
  const room = prisma.room.findUnique({
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
=======
	await prisma.user.create({
		data:{
			id: 1,
			username: "mock",
			stats: {
				create: {}
			  }	  
		}
	})
	await prisma.room.create({
		data:{
			name: "general",
			ownerId: 60040,
			visibility: "public",
			password:""
		}
	})
>>>>>>> master
}

main();
