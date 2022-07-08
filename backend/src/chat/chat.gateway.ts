import { ConfigService } from "@nestjs/config";
import { MessageBody, ConnectedSocket, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { ChatService } from './chat.service';
import { UserRoomDto } from "./dto/user-room.dto";
import { CreateRoomDto } from './dto/create-room.dto';
import { CreateMessageDto } from "./dto/create-message.dto";
import { CreateDMRoomDto } from "./dto/create-dm-room.dto"
import { UpdatePasswordDto } from "./dto/update-password.dto"
import { BlockedUserDto } from "./dto/blocked-user.dto"
import { CheckPasswordDto } from "./dto/check-password.dto";
import { InviteDto } from "./dto/invite.dto";
	
import * as bcrypt from 'bcrypt';
import { UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import { ValidationFilter } from "./filters/validation.filter";

let socketUser = new Map<string, number>();
let socketGame = new Map<string, number>();

@UseFilters(new ValidationFilter())
@UsePipes(new ValidationPipe())
@WebSocketGateway({
  cors: {
	  origin: (new ConfigService).get("FRONT_URL"),
	  credentials: true
	}
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect
{
	constructor(private readonly chatService: ChatService) {}

	@WebSocketServer()
	server: Socket;

	@SubscribeMessage('create room') 
	async handleCreateRoom(@ConnectedSocket () client : Socket, @MessageBody()  createRoomDto: CreateRoomDto) {		
		
		console.log('create room called', createRoomDto);
		let roomId: number
		const handler = async (err, hashed: string) => {
			if (err) {
				console.log(err);
			} else {
				roomId = await this.chatService.createRoom({name: createRoomDto.name, userId: createRoomDto.userId, visibility: createRoomDto.visibility, password: hashed});
				await this.chatService.addUserToRoom(createRoomDto.userId, roomId);
				await this.chatService.addAdminToRoom(createRoomDto.userId, roomId);
				client.emit('create room');
			}
		}
		if (createRoomDto.password !== "")
		{
			bcrypt.hash(createRoomDto.password, 10, handler);
		}
		else
		{
			let roomId = await this.chatService.createRoom({name: createRoomDto.name, userId: createRoomDto.userId, visibility: createRoomDto.visibility, password: ''});
			await this.chatService.addUserToRoom(createRoomDto.userId, roomId);
			await this.chatService.addAdminToRoom(createRoomDto.userId, roomId);
			client.emit('create room');
		}
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
		socketUser.set(client.id, newUserDto.userId);
		await this.chatService.addUserToRoom(newUserDto.userId, 1);
		const allUsers =  await this.chatService.getAllUsers();
		this.server.emit('new user', allUsers);
		this.server.emit('new connection', newUserDto.userId);
		console.log('socket user', socketUser);
		let online: number[] = [];
		socketUser.forEach((value, key) => {
			online.push(value);
		})
		let inGame: number[] = [];
		socketGame.forEach((value, key) => {
			inGame.push(value);
		})
		client.emit('status map', {online: online, inGame: inGame});
		// console.log('new user called', newUserDto)
	}

	@SubscribeMessage('update password')
	async handeUpdstePassword(@MessageBody() updatePasswordDto: UpdatePasswordDto) {
		if (updatePasswordDto.password != "") {
			bcrypt.hash(updatePasswordDto.password, 10, async (err, hash) => {
				if (err) {
					console.log(err);
				}
				else
					await this.chatService.updatePassword(updatePasswordDto.roomId, hash);
			})
		}
		else
			await this.chatService.updatePassword(updatePasswordDto.roomId, updatePasswordDto.password);
		this.server.emit('password updated', updatePasswordDto.roomId);
		this.server.emit('create room');
	}

	handleDisconnect(@ConnectedSocket() client:Socket) {
		// console.log('client disconnected');
		this.server.emit('new disconnection', socketUser.get(client.id))
		socketUser.delete(client.id);
		socketGame.delete(client.id);
	}


	handleConnection(@ConnectedSocket() client:Socket) {
		// console.log('client connected');
	}

	@SubscribeMessage('add blocked')
	add(@ConnectedSocket() client:Socket, @MessageBody() blockedUserDto: BlockedUserDto) {
		this.chatService.add(blockedUserDto.userId, blockedUserDto.blockedId);
		client.emit('add blocked');
		console.log('add blocked called -> ', blockedUserDto);
	}
	
	@SubscribeMessage('removeBlocked')
	remove(@MessageBody() blockedUserDto: BlockedUserDto) {
		return this.chatService.remove(blockedUserDto.userId, blockedUserDto.blockedId);
	}

	@SubscribeMessage('get blocked')
	async findAll(@ConnectedSocket() client:Socket , @MessageBody() userId: number) {
		const blockedIds: number[] = await this.chatService.findAllIds(userId);
		const blocked = await this.chatService.findAll(blockedIds);
		client.emit('get blocked', blocked);
		console.log('get blocked called', blocked)
	}

	@SubscribeMessage('check password')
	async checkPassword(@ConnectedSocket() client:Socket ,@MessageBody() checkPasswordDto: CheckPasswordDto) {
		bcrypt.compare(checkPasswordDto.password, await this.chatService.getPassword(checkPasswordDto.roomId), (err, res) => {
			if (err) {
				console.log(err);
			}
			client.emit('check password', res);
		});
	}

	@SubscribeMessage('countdown_start')
	countdown_start(@ConnectedSocket() client:Socket ,@MessageBody() userId: number) {
		socketGame.set(client.id, userId);
		this.server.emit('new gamer', userId);
	}

	@SubscribeMessage('remove gamer')
	handleRemoveGamer(@ConnectedSocket() client:Socket ,@MessageBody() userId: number) {
		for (let [key, value] of socketGame) {
			if (value == userId) {
				socketGame.delete(key);
			}
		}
	}

	@SubscribeMessage('invite for game')
	inviteForGame(@ConnectedSocket() client:Socket ,@MessageBody() inviteDto: InviteDto) {
	for (let [key, value] of socketUser.entries()) {
		if (value === inviteDto.otherUserId)
			this.server.to(key).emit('invite for game', {userId: inviteDto.userId, inviterId: client.id, inviteeId: key});
	}
	}
}


