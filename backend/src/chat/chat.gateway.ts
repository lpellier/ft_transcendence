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
			this.server.emit('create room', addUserDto.roomId);
		}
	}

	@SubscribeMessage('join room')
	handleJoinRoom(@ConnectedSocket() client : Socket, @MessageBody() room_id: string ) {
		client.join(room_id);
	}

	@SubscribeMessage('chat message')
	async handlemessage(@MessageBody() createMessageDto: CreateMessageDto) {
		let msg = await this.chatService.storeMessage(createMessageDto);
		this.server.to(createMessageDto.room.toString()).emit('chat message', msg);
	}

	@SubscribeMessage('get rooms')
	async handleGetRooms(@ConnectedSocket () client : Socket, @MessageBody() id: number){
		console.log("get rooms id = ", id)
		if (id >= 0)
		{
			let rooms = await this.chatService.getRoomsForUser(id);
			client.emit('get rooms', rooms);
		}
	}

	@SubscribeMessage('get users')
	async handleGetUsers(@ConnectedSocket () client : Socket, @MessageBody() id: number) {
		if (id >= 0)
		{
			let users = await this.chatService.getUsersInRoom(id);
			client.emit('get users', users);
		}// TODO return users list from user
	}

	@SubscribeMessage('get all messages')
	async handleGetAllMessages(@ConnectedSocket () client : Socket, @MessageBody() id: number){
		let messages = await this.chatService.getAllMessagesForUser(id);
		
		client.emit('get all messages', messages);
		// TODO return room list from user
	}
	// @SubscribeMessage('get messages')
	// handleGetMessages(@MessageBody('id') id: number){
	// 	return this.chatService.getMessages(id);
	// 	// TODO return room list from user
	// }

	@SubscribeMessage('new user')
	handleNewUser(@MessageBody() id: number) {
		this.server.emit('new user');
	}
}
