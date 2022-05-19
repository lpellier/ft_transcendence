import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	await prisma.room.create({
		data:{
			name: "general"
		}
	})
}

main()