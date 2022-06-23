import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { use } from 'passport';

@Injectable()
export class FriendsService {
  constructor(private prisma: PrismaClient) {}
  
  async findAll(userId: number) {
    const {friendIds} = await this.prisma.user.findUnique({
      where: {id: userId}, 
      select: {friendIds: true}
    })
    return(friendIds);
  }

  async add(userId: number, friendId: number) {
    const friendIds = await this.findAll(userId);
    
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
    const friendIds = await this.findAll(userId);
    
    await this.prisma.user.update({
      where: {id: userId}, 
      data: {
        friendIds: {
          set: friendIds.filter((id) => id !== friendId)
        }
      }
    })
  }

}
