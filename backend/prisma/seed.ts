import { PrismaClient } from "@prisma/client";

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
	await prisma.room.create({
		data:{
			name: "general",
			ownerId: 60040,
			visibility: "public",
		}
	})
}

main()