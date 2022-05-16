import { ConfigService } from "@nestjs/config";
import { MessageBody, ConnectedSocket, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { User, Room, Message} from '../interfaces'
@WebSocketGateway({
	cors: {
	  origin: (new ConfigService).get("FRONT_URL"),
	  credentials: true
	},
  })
export class ChatGateway {
	@WebSocketServer()
	server: Socket;

	@SubscribeMessage('create room') 
	handleCreateRoom(@MessageBody() room: Room) {
		// TODO add new room to database
	}

	@SubscribeMessage('create correlation')
	handleCreateCorrelation(@MessageBody() data: any) {
		//TODO add new user/room correlation
	}

	@SubscribeMessage('join room')
	handleJoinRoom(@ConnectedSocket() client : Socket, @MessageBody() room_id: string ) {
		client.join(room_id);
	}

	@SubscribeMessage('chat message')
	handlemessage(@MessageBody() data: any) {
		const content:string = data[0];
		const user:User = data[1];
		const room: Room = data[2];
		
		// TODO add new message to database

		this.server.to(room.id.toString()).emit('chat message', content, user, room)
	}

	@SubscribeMessage('get rooms')
	handleGetRooms(@MessageBody() user: User){
		// TODO return room list from user
	}

	@SubscribeMessage('get users')
	handleGetUsers(@MessageBody() room: Room) {
		// TODO return users list from user
	}
}