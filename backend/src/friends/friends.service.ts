import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class FriendsService {
  constructor(private prisma: PrismaClient) {}

  add(id: number) {
    // await this.prisma.user.update({
    //   where: {
    //     id:
    //   }
    // })
    return `This action removes a #${id} friend`;
  }

  remove(id: number) {
    return `This action removes a #${id} friend`;
  }

  findAll() {
    return `This action returns all friends`;
  }
}
