import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { authenticator } from 'otplib';
import { Profile } from './interfaces/profile.interface';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaClient) {}
  
  async findOrCreate(profile: any): Promise<User> {
		let user = await this.findOne(profile.id)
    if (!user) {
			user = await this.create(profile)
		}
		return user
  }

  async findOne(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: {id: id}
    });
  }

  async create(profile: any): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        id: profile.id,
        username: profile.username,
        avatar: profile.avatar,
        stats: {
          create: {}
        }
      }
    });
    await this.prisma.room.update({
      where: {id: 1},
      data: {
        users: {
          connect: {
            id: user.id
          }
        }
      }
    })
    return user;
	}
  
  async findAll() : Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getProfile(id: number): Promise<Profile> {
    const {tfa, tfaSecret, ...profile} = await this.prisma.user.findUnique({
      where: {
        id: id
      },
      include: {
        stats: true
      }
    });
    return profile;
  }

  async updateOne(id: number, data : any) {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: data,
      // data: {
      //   username: newusername,
      // }
    });
  }

  async enableTwoFactorAuthentication(id: number) {
    const secret = authenticator.generateSecret();
    await this.prisma.user.update({
      where: {
        id: id
      },
      data: {
        tfa: true,
        tfaSecret: secret
      }
    });
    return secret;
  }

  async disableTwoFactorAuthentication(id: number) {
    await this.prisma.user.update({
      where: {
        id: id
      },
      data: {
        tfa: false,
        tfaSecret: ""
      }
    });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
