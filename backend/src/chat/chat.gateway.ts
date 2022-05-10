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
	handleJoinRoom(@ConnectedSocket() client : Socket, @MessageBody() room_id: string ) {
		
		// if (room !== undefined)
			// room_id = room.id.toString();
		// console.log("room  = ",room_id)
		// console.log("backend room = ", room);
		client.join(room_id);
	}

	@SubscribeMessage('chat message')
	handlemessage(@MessageBody() data: any) {
		const message:string = data[0];
		const user:User = data[1];
		const room: Room = data[2];
		// console.log("chat message:", message, ", room: ", room.id.toString());
		this.server.to(room.id.toString()).emit('chat message', message, user, room)
		// this.server.emit('chat message', message, user);
	}

	// @SubscribeMessage('new username')
	// handleSetUsername(@MessageBody() user: string) {
	// 	this.server.emit('new user', user)
	//   }
}