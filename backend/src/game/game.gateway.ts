import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";

@WebSocketGateway({
	cors: {
		origin: "http://localhost:3000"
	}
})
export class GameGateway {
	@WebSocketServer()
	server: Server;

	clients : string[] = [];

	handleDisconnect(client : Socket) {
		let index = -1;
		if ((index = this.clients.indexOf(client.id)) != -1) {
			this.clients.splice(index, 1);
			console.log(client.id, "just disconnected -", this.clients.length, "users total");
		}
	}

	// acts as handleConnection because when calling handleConnection, multiple sockets seem to connect
	@SubscribeMessage('my_id')
	handlemessage(@MessageBody() client_id : string) {
		this.clients.push(client_id);
		console.log(client_id, "just connected    -", this.clients.length, "users total");
	}
}