import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { use } from 'passport';

@Injectable()
export class FriendsService {
  constructor(private prisma: PrismaClient) {}
  
  async findAllIds(userId: number) {
    const {friendIds} = await this.prisma.user.findUnique({
      where: {id: userId}, 
      select: {friendIds: true}
    })
    console.log('friendIds = ',friendIds);    
    return(friendIds);
  }

  async add(userId: number, friendId: number) {
    const friendIds: number[] = await this.findAllIds(userId);
    
    await this.prisma.user.update({
      where: {id: userId}, 
      data: {
        friendIds: {
          set: [...friendIds, friendId]
        }
      }
    })
  }

  async remove(userId: number, friendId: number) {
    const friendIds:number[] = await this.findAllIds(userId);
    
    await this.prisma.user.update({
      where: {id: userId}, 
      data: {
        friendIds: {
          set: friendIds.filter((id) => id !== friendId)
        }
      }
    })
  }

  async findAll(ids: number[]) {
    const friends = await this.prisma.user.findMany({
      where: {id: {in: ids}}
    })
    return (friends);
  }

  async getAllUsers() {
    let users = await this.prisma.user.findMany();
    return (users);
  }

}
