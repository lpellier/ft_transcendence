import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import * as fs from 'fs/promises';
import { authenticator } from 'otplib';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProfileWithSettings } from './interfaces/profile-with-settings.interface';
import { Profile } from './interfaces/profile.interface';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClient) {}

  async findOrCreate(profile: any): Promise<User> {
    let user = await this.findOne(profile.id);
    if (!user) {
      user = await this.create(profile);
    }
    return user;
  }

  async getMock() {
    const user = await this.prisma.user.findUnique({
      where: {
        id: 1,
      },
    });
    return user;
  }

  async findOne(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  async create(profile: any): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        id: profile.id,
        username: profile.username,
        stats: {
          create: {},
        },
      },
    });
    await fs.copyFile(
      '/backend/public/avatars/default.png',
      '/backend/public/avatars/' + profile.id + '.png',
    );
    await this.prisma.room.update({
      where: { id: 1 },
      data: {
        users: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserWithStatsAndMatchHistory(id: number): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        stats: true,
        matchHistory: true,
      },
    });
    return user;
  }

  async getProfileWithSettings(id: number): Promise<ProfileWithSettings> {
    const user = await this.getUserWithStatsAndMatchHistory(id);
    const profile: ProfileWithSettings = {
      id: user.id,
      username: user.username,
      tfa: user.tfa,
      victories: user.stats.victories,
      losses: user.stats.losses,
      level: user.stats.level,
      matchHistory: user.matchHistory,
    };
    return profile;
  }

  async getProfile(id: number): Promise<Profile> {
    const user = await this.getUserWithStatsAndMatchHistory(id);
    if (!user) {
      throw new NotFoundException();
    }
    const profile: Profile = {
      id: user.id,
      username: user.username,
      victories: user.stats.victories,
      losses: user.stats.losses,
      level: user.stats.level,
      matchHistory: user.matchHistory,
    };
    return profile;
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<string> {
    if (Object.keys(data).length != 1) {
      throw new BadRequestException();
    }
    if (data.hasOwnProperty('username')) {
      return this.tryToChangeUsername(id, data.username);
    }
    if (data.hasOwnProperty('tfa')) {
      return this.tryToChangeAuthentication(id, data.tfa);
    }
  }

  async tryToChangeUsername(id: number, newUsername: string) {
    const isTaken = await this.prisma.user.findUnique({
      where: { username: newUsername },
    });
    if (isTaken) {
      throw new ConflictException();
    }
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        username: newUsername,
      },
    });
    return user.username;
  }

  async tryToChangeAuthentication(id: number, tfa: boolean) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (user.tfa === tfa) {
      throw new ConflictException();
    }
    const secret = tfa === true ? authenticator.generateSecret() : '';
    await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        tfa: tfa,
        otpSecret: secret,
      },
    });
    return secret;
  }

  async findFriendsIds(userId: number) {
    const { friendIds } = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { friendIds: true },
    });
    return friendIds;
  }

  async findFriends(ids: number[]) {
    const friends = await this.prisma.user.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return friends;
  }

  async addFriend(userId: number, friendId: number) {
    const friendIds: number[] = await this.findFriendsIds(userId);

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        friendIds: {
          set: [...friendIds, friendId],
        },
      },
    });
  }

  async removeFriend(userId: number, friendId: number) {
    const friendIds: number[] = await this.findFriendsIds(userId);

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        friendIds: {
          set: friendIds.filter((id) => id !== friendId),
        },
      },
    });
  }
}
