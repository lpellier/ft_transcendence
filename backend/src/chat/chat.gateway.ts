import { ConfigService } from "@nestjs/config";
import { MessageBody, ConnectedSocket, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Prisma, PrismaClient } from "@prisma/client";
import { Socket } from "socket.io";
import { User, Room, Message} from '../interfaces'
import { ChatService } from './chat.service';
import { AddUserDto } from "./dto/add-user.dto";
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@WebSocketGateway({
  cors: {
	  origin: (new ConfigService).get("FRONT_URL"),
	  credentials: true
	}
})
export class ChatGateway {
	constructor(private readonly chatService: ChatService) {}

	@WebSocketServer()
	server: Socket;

	@SubscribeMessage('create room') 
	handleCreateRoom(@MessageBody()  createRoomDto: CreateRoomDto) {
		return this.chatService.createRoom(createRoomDto);
	}

	@SubscribeMessage('add user to room')
	handleAddUserToRoom(@MessageBody() addUserDto: AddUserDto) {
		this.chatService.addUserToRoom(addUserDto.userId, addUserDto.roomId);
		// need user id
	}

	@SubscribeMessage('join room')
	handleJoinRoom(@ConnectedSocket() client : Socket, @MessageBody() room_id: string ) {
		client.join(room_id);
		// need user id
	}

	@SubscribeMessage('chat message')
	handlemessage(@MessageBody() data: any) {
		this.chatService.storeMessage(data);

		const message:string = data[0];
		const user = data[1];
		const room = data[2];
		
		// TODO add new message to database

		this.server.to(room.id.toString()).emit('chat message', message, user, room)
	}

	@SubscribeMessage('get rooms')
	handleGetRooms(@MessageBody('id') id: number){
		return this.chatService.getRoomsForUser(id);
		// TODO return room list from user
	}

	@SubscribeMessage('get users')
	handleGetUsers(@MessageBody('id') id: number) {
		return this.chatService.getUsersInRoom(id);
		// TODO return users list from user
	}


  // @SubscribeMessage('createChat')
  // create(@MessageBody() createChatDto: CreateChatDto) {
  //   return this.chatService.create(createChatDto);
  // }

  // @SubscribeMessage('findAllChat')
  // findAll() {
  //   return this.chatService.findAll();
  // }

  // @SubscribeMessage('findOneChat')
  // findOne(@MessageBody() id: number) {
  //   return this.chatService.findOne(id);
  // }

  // @SubscribeMessage('updateChat')
  // update(@MessageBody() updateChatDto: UpdateChatDto) {
  //   return this.chatService.update(updateChatDto.id, updateChatDto);
  // }

  // @SubscribeMessage('removeChat')
  // remove(@MessageBody() id: number) {
  //   return this.chatService.remove(id);
  // }
}
