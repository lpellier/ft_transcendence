import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "dgram";

@WebSocketGateway({
	cors: {
	  origin: 'http://127.0.0.1:3000',
	},
  })
export class ChatGateway {
	@WebSocketServer()
	server: Socket;

	@SubscribeMessage('chat message')
	handlemessage(@MessageBody() message: string) {
		this.server.emit('chat message', message, "user")
	}
}