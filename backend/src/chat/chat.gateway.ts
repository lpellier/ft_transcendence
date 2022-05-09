import { MessageBody, ConnectedSocket, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "socket.io";
import {User, Room} from '../interfaces';

@WebSocketGateway({
	cors: {
	  origin: 'http://127.0.0.1:3000',
	  credentials: true,
	},
  })
export class ChatGateway {
	@WebSocketServer()
	server: Socket;

	@SubscribeMessage('join room')
	handleConnection(@ConnectedSocket() client : Socket, @MessageBody() room: Room ) {
		
		let room_id: string
		// if (room !== undefined)
			// room_id = room.id.toString();
		// console.log("room  = ",room_id)
		console.log("room = ", room);
		client.join("a room");
	}

	@SubscribeMessage('chat message')
	handlemessage(@ConnectedSocket() client : Socket, @MessageBody() message: string, user: User, room: Room) {
		this.server.to(room.id.toString()).emit('chat message', message, user)
		// this.server.emit('chat message', message, user);
	}

	// @SubscribeMessage('new username')
	// handleSetUsername(@MessageBody() user: string) {
	// 	this.server.emit('new user', user)
	//   }
}