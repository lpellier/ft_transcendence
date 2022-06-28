import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { use } from 'passport';

@Injectable()
export class BlockedService {
  constructor(private prisma: PrismaClient) {}
  
  async findAllIds(userId: number) {
    const {blockedIds} = await this.prisma.user.findUnique({
      where: {id: userId}, 
      select: {blockedIds: true}
    })
    console.log('blockedIds = ',blockedIds);    
    return(blockedIds);
  }

  async add(userId: number, blockedId: number) {
    const blockedIds: number[] = await this.findAllIds(userId);
    
    await this.prisma.user.update({
      where: {id: userId}, 
      data: {
        blockedIds: {
          set: [...blockedIds, blockedId]
        }
      }
    })
  }

  async remove(userId: number, blockedId: number) {
    const blockedIds:number[] = await this.findAllIds(userId);
    
    await this.prisma.user.update({
      where: {id: userId}, 
      data: {
        blockedIds: {
          set: blockedIds.filter((id) => id !== blockedId)
        }
      }
    })
  }

  async findAll(ids: number[]) {
    const blocked = await this.prisma.user.findMany({
      where: {id: {in: ids}}
    })
    return (blocked);
  }

  async getAllUsers() {
    let users = await this.prisma.user.findMany();
    return (users);
  }

}
