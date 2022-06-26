import { ConfigService } from "@nestjs/config";
import { MessageBody, ConnectedSocket, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { ChatService } from './chat.service';
import { UserRoomDto } from "./dto/user-room.dto";
import { CreateRoomDto } from './dto/create-room.dto';
import { CreateMessageDto } from "./dto/create-message.dto";
import { CreateDMRoomDto } from "./dto/create-dm-room.dto"
import { UpdatePasswordDto } from "./dto/update-password.dto"
import { threadId } from "worker_threads";


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
		await this.chatService.addAdminToRoom(createRoomDto.userId, roomId);
		client.emit('create room');
	}

	@SubscribeMessage('create dm room') 
	async handleCreateDMRoom(@ConnectedSocket () client : Socket, @MessageBody()  createDMRoomDto: CreateDMRoomDto) {		
		const createRoomDto: CreateRoomDto = {name: createDMRoomDto.name, userId: 0, visibility: "private", password: ''}
		let roomId = await this.chatService.createRoom(createRoomDto);
		await this.chatService.addUserToRoom(createDMRoomDto.user1Id, roomId);
		await this.chatService.addUserToRoom(createDMRoomDto.user2Id, roomId);
		this.server.emit('create dm room');
		console.log('create dm room called');
		// this.server.emit('add user to room');
	}

	@SubscribeMessage('add user to room')
	async handleAddUserToRoom(@MessageBody() addUserDto: UserRoomDto) {
		await this.chatService.addUserToRoom(addUserDto.userId, addUserDto.roomId);
		// console.log('add user to room called', addUserDto)
		this.server.emit('add user to room');
	}

	@SubscribeMessage('add admin to room')
	async handleAddAdminToRoom(@MessageBody() addAdminDto: UserRoomDto) {
		await this.chatService.addAdminToRoom(addAdminDto.userId, addAdminDto.roomId);
		//console.log('add admin to room called', addAdminDto)
		this.server.to(addAdminDto.roomId.toString()).emit('admin added to room');
	}

	@SubscribeMessage('remove admin from room')
	async handleKickAdminToRoom(@MessageBody() addAdminDto: UserRoomDto) {
		await this.chatService.removeAdminFromRoom(addAdminDto.userId, addAdminDto.roomId);
		//console.log('remove admin from room called', addAdminDto)
		this.server.to(addAdminDto.roomId.toString()).emit('admin removed from room');
	}

	@SubscribeMessage('remove user from room')
	async handleRemoveUserFromRoom(@MessageBody() removeUserDto: UserRoomDto) {
		await this.chatService.removeUserFromRoom(removeUserDto.userId, removeUserDto.roomId);
		//console.log('remove user from room called', removeUserDto)
		this.server.to(removeUserDto.roomId.toString()).emit('remove user from room', removeUserDto);
	}

	@SubscribeMessage('join room')
	handleJoinRoom(@ConnectedSocket() client : Socket, @MessageBody() room_id: string ) {
		client.join(room_id);
		//console.log('join room called', room_id)

	}

	@SubscribeMessage('leave room')
	handleLeaveRoom(@ConnectedSocket() client : Socket, @MessageBody() room_id: string ) {
		client.leave(room_id);
		//console.log('leave room called', room_id);
	}

	@SubscribeMessage('chat message')
	async handlemessage(@MessageBody() createMessageDto: CreateMessageDto) {
		let msg = await this.chatService.storeMessage(createMessageDto);
		this.server.to(createMessageDto.room.toString()).emit('chat message', msg);
		console.log('chat message called', createMessageDto)

	}

	@SubscribeMessage('get rooms')
	async handleGetRooms(@ConnectedSocket () client : Socket, @MessageBody() id: number){
		let rooms = await this.chatService.getRoomsForUser(id);
		client.emit('get rooms', rooms);
		//console.log('get rooms called', id)

	}

	@SubscribeMessage('get public rooms')
	async handlePublicRooms() {
		let publicRooms = await this.chatService.getPublicRooms();
		this.server.emit('get public rooms', publicRooms);
		//console.log('get public rooms called')

	}

	@SubscribeMessage('get users')
	async handleGetUsers(@ConnectedSocket () client : Socket, @MessageBody() id: number) {
		let users = await this.chatService.getUsersInRoom(id);
		client.emit('get users', users);
		//console.log('get users called', id)

	}

	@SubscribeMessage('get admins')
	async handleGetAdmins(@ConnectedSocket () client : Socket, @MessageBody() id: number) {
		let admins = await this.chatService.getAdminsInRoom(id);
		client.emit('get admins', admins);
		//console.log('get admins called', id)

	}

	@SubscribeMessage('get all messages')
	async handleGetAllMessages(@ConnectedSocket () client : Socket, @MessageBody() id: number){
		let messages = await this.chatService.getAllMessagesForUser(id);
		client.emit('get all messages', messages);
		//console.log('get all messages called', id)

	}

	@SubscribeMessage('new user')
	async handleNewUser(@ConnectedSocket () client : Socket,@MessageBody() newUserDto: UserRoomDto) {
		await this.chatService.addUserToRoom(newUserDto.userId, 1);
		const allUsers =  await this.chatService.getAllUsers();
		this.server.emit('new user', allUsers);
		// console.log('new user called', newUserDto)
	}

	@SubscribeMessage('update password')
	async handeUpdstePassword(@MessageBody() updatePasswordDto: UpdatePasswordDto) {
		await this.chatService.updatePassword(updatePasswordDto.roomId, updatePasswordDto.password);
		this.server.emit('password updated', updatePasswordDto.roomId);
		this.server.emit('create room');
	}

}
