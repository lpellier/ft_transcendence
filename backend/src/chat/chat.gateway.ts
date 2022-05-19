import { ConfigService } from "@nestjs/config";
import { MessageBody, ConnectedSocket, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Prisma, PrismaClient } from "@prisma/client";
import { Socket } from "socket.io";
import { User, Room, Message} from '../interfaces'
import { ChatService } from './chat.service';
import { AddUserDto } from "./dto/add-user.dto";
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CreateMessageDto } from "./dto/create-message.dto";


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
	async handleCreateRoom(@ConnectedSocket () client : Socket, @MessageBody()  createRoomDto: CreateRoomDto) {
		console.log("room = ", createRoomDto)
		
		let room_id: number;
		await this.chatService.createRoom(createRoomDto).then(res => {
			room_id = res;
		});
		client.join(room_id.toString());
		this.server.to(room_id.toString()).emit('create room', room_id);
	}

	@SubscribeMessage('add user to room')
	handleAddUserToRoom(@MessageBody() addUserDto: AddUserDto) {
		this.chatService.addUserToRoom(addUserDto.userId, addUserDto.roomId);
	}

	@SubscribeMessage('join room')
	handleJoinRoom(@ConnectedSocket() client : Socket, @MessageBody() room_id: string ) {
		console.log("join room id ", room_id)
		client.join(room_id);
	}

	@SubscribeMessage('chat message')
	async handlemessage(@MessageBody() createMessageDto: CreateMessageDto) {
		let message: CreateMessageDto;
		await this.chatService.storeMessage(createMessageDto).then(res => {
			message = res;
		});
		this.server.to(createMessageDto.room.toString()).emit('chat message', message)
	}

	@SubscribeMessage('get rooms')
	handleGetRooms(@MessageBody('id') id: number){
		console.log("get rooms id = ", id)
		return this.chatService.getRoomsForUser(id);
		
		// TODO return room list from user
	}

	@SubscribeMessage('get users')
	handleGetUsers(@MessageBody('id') id: number) {
		console.log("room id = ", id);
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
