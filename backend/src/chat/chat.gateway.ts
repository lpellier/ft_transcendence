import { ConfigService } from "@nestjs/config";
import { MessageBody, ConnectedSocket, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { ChatService } from './chat.service';
import { UserRoomDto } from "./dto/user-room.dto";
import { CreateRoomDto } from './dto/create-room.dto';
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
		let roomId = await this.chatService.createRoom(createRoomDto);
		await this.chatService.addUserToRoom(createRoomDto.userId, roomId);
		console.log("my id = ", createRoomDto.userId);
		client.emit('create room');
	}

	@SubscribeMessage('add user to room')
	async handleAddUserToRoom(@MessageBody() addUserDto: UserRoomDto) {
		await this.chatService.addUserToRoom(addUserDto.userId, addUserDto.roomId);
		this.server.emit('create room', addUserDto.roomId);
	}

	@SubscribeMessage('remove user from room')
	async handleRemoveUserFromRoom(@MessageBody() removeUserDto: UserRoomDto) {
		await this.chatService.removeUserFromRoom(removeUserDto.userId, removeUserDto.roomId);
		this.server.emit('create room', removeUserDto.roomId);
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
		let rooms = await this.chatService.getRoomsForUser(id);
		client.emit('get rooms', rooms);
	}

	@SubscribeMessage('get public rooms')
	async handlePublicRooms(@ConnectedSocket () client: Socket) {
		let publicRooms = await this.chatService.getPublicRooms();
		client.emit('get public rooms', publicRooms);
	}

	@SubscribeMessage('get users')
	async handleGetUsers(@ConnectedSocket () client : Socket, @MessageBody() id: number) {
		let users = await this.chatService.getUsersInRoom(id);
		client.emit('get users', users);
	}

	@SubscribeMessage('get all messages')
	async handleGetAllMessages(@ConnectedSocket () client : Socket, @MessageBody() id: number){
		let messages = await this.chatService.getAllMessagesForUser(id);
		client.emit('get all messages', messages);
	}

	@SubscribeMessage('new user')
	handleNewUser(@MessageBody() id: number) {
		this.server.emit('new user');
	}
}
