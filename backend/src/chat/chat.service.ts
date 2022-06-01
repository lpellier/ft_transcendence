import { Injectable } from '@nestjs/common';
// import { CreateChatDto } from './dto/create-chat.dto';
// import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaClient } from '@prisma/client';
import { CreateRoomDto } from './dto/create-room.dto';
import { CreateMessageDto } from './dto/create-message.dto'

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaClient) {}

  async createRoom(createRoomDto: CreateRoomDto, ownerIdl) {
    const room = await this.prisma.room.create({
      data: {
        name: createRoomDto.name
      }
    });
    return room.id;
  }

  async addUserToRoom(userId: number, roomId: number) {
    const room = await this.prisma.room.update({
      where: {id: roomId},
      data: {
        users: {
          connect: {id: userId}          
        }
      }
    });
  }

  async removeUserFromRoom(userId: number, roomId: number) {
    const room = await this.prisma.room.update({
      where: {id: roomId},
      data: {
        users: {
          disconnect: {id: userId}          
        }
      },
      select: {
        users: true
      }
    });
  }

  async storeMessage(data: CreateMessageDto) {
    let message = await this.prisma.message.create({
      data: {
        content: data.content,
        userId: data.user,
        roomId: data.room,
        type: true
      }
    });
    return message;
  }
  
  async getRoomsForUser(id: number) {
    let user = await this.prisma.user.findUnique({
      where: {id: id},
      include: {rooms: true}
    })
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
    const user = await this.prisma.user.findUnique({
      where: {id: id},
      include: {
        rooms: {
          include: {messages: true}
        }
      }
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
}
