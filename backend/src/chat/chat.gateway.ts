import { ConfigService } from "@nestjs/config";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "dgram";

@WebSocketGateway({
	cors: {
<<<<<<< HEAD
	  origin: 'http://127.0.0.1:3000',
=======
	  origin: (new ConfigService).get("FRONT_URL"),
>>>>>>> e1c0d278b1f6548aeeab3be56d0f55243eac53e8
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