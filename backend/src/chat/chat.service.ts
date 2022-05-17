import { Injectable } from '@nestjs/common';
// import { CreateChatDto } from './dto/create-chat.dto';
// import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaClient } from '@prisma/client';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaClient) {}

  async getRoomsForUser(id: number) {
    let user = await this.prisma.user.findUnique({
      where: {
        id: id
      },
      include: {
        rooms: true
      }
    });
    return user.rooms;
  }
  async getUsersInRoom(id: number) {
    let room = await this.prisma.room.findUnique({
      where:{
        id: id
      },
      include:{
        users: true
      }
    })
    return room.users;
  }

  async createRoom(createRoomDto: CreateRoomDto) {
    this.prisma.room;
  }

  async joinRoom() {}

  async storeMessage() {}
  
  // create(createChatDto: CreateChatDto) {
  //   return 'This action adds a new chat';
  // }

  // findAll() {
  //   return `This action returns all chat`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} chat`;
  // }

  // update(id: number, updateChatDto: UpdateChatDto) {
  //   return `This action updates a #${id} chat`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} chat`;
  // }
}
