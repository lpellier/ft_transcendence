import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClient) {}
  
  async findOrCreate(user: User): Promise<User | undefined> {
		let u = await this.prisma.user.findUnique({
			where: { id: user.id },
		});
		if (!u) {
			u = await this.prisma.user.create({
				data: {
					id:	user.id,
					username: user.username,
					avatar: user.avatar,
          stats: {
            create: {}
          }
				}
      });
		}
		return u;
	}
  
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        stats: true,
      },
    });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
