import { Injectable } from '@nestjs/common';
// import { CreateChatDto } from './dto/create-chat.dto';
// import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaClient } from '@prisma/client';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaClient) {}

  async createRoom(createRoomDto: CreateRoomDto) {
    const room = await this.prisma.room.create({
      data: {
        name: createRoomDto.name
      }
    });
    return room.id;
  }

  async addUserToRoom(userId, roomId) {
    const room = await this.prisma.room.update({
      where: {id: roomId},
      data: {
        users: {
          connect: {id: userId}          
        }
      }
    });
  }

  async storeMessage(data) {
    let message = await this.prisma.message.create({
      data: {
        content: data[0],
        userId: data[1].id,
        roomId: data[2].id,
        type: true
      }
    });
    return message;
  }
  
  async getRoomsForUser(id: number) {
    let user = await this.prisma.user.findUnique({
      where: {id: id},
      include: {rooms: true}
    });
    return user.rooms;
  }
  async getUsersInRoom(id: number) {
    let room = await this.prisma.room.findUnique({
      where: {id: id},
      include: {users: true}
    })
    return room.users;
  }

  async getAllMessagesForUser(id: number) {
    let user = await this.prisma.user.findUnique({
      where: {id: id},
      include: {rooms: true}
    });
    let messages = [];
    for (let i = 0; i < user.rooms.length; ++i) {
      messages.push(...user.rooms[i].messages);
    }
    return messages;
  }

  async getMessages(id: number) {
    let room = await this.prisma.room.findUnique({
      where: {id: id},
      include: {messages: true}
    })
    return room.messages;
  }

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
