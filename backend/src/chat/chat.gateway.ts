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
		await this.chatService.createRoom(createRoomDto).then(res => {
			client.emit('create room', res);
			this.chatService.addUserToRoom(createRoomDto.userId, res);
		});
	}

	@SubscribeMessage('add user to room')
	handleAddUserToRoom(@MessageBody() addUserDto: AddUserDto) {
		console.log("add user to room = ", addUserDto);
		if (addUserDto.roomId >= 0 && addUserDto.userId >= 0)
		{
			this.chatService.addUserToRoom(addUserDto.userId, addUserDto.roomId);
			
		}
	}

	@SubscribeMessage('join room')
	handleJoinRoom(@ConnectedSocket() client : Socket, @MessageBody() room_id: string ) {
		client.join(room_id);
	}

	@SubscribeMessage('chat message')
	async handlemessage(@MessageBody() createMessageDto: CreateMessageDto) {
		let message: CreateMessageDto;
		await this.chatService.storeMessage(createMessageDto).then(res => {
			this.server.to(createMessageDto.room.toString()).emit('chat message', res)
		});
	}

	@SubscribeMessage('get rooms')
	async handleGetRooms(@ConnectedSocket () client : Socket,@MessageBody() id: number){
		console.log("get rooms id = ", id)
		if (id >= 0)
		{
			await this.chatService.getRoomsForUser(id).then(res => {
				client.emit('get rooms', res);
			})
		}
	}

	@SubscribeMessage('get users')
	handleGetUsers(@MessageBody() id: number) {
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
