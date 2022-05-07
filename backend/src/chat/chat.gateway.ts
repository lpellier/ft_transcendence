import { ConfigService } from "@nestjs/config";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "dgram";

@WebSocketGateway({
	cors: {
	  origin: (new ConfigService).get("FRONT_URL"),
	},
  })
export class ChatGateway {
	@WebSocketServer()
	server: Socket;

	@SubscribeMessage('chat message')
	handlemessage(@MessageBody() message: string, user: string) {
		this.server.emit('chat message', message, user)
	}

	@SubscribeMessage('new username')
	handleSetUsername(@MessageBody() user: string) {
		this.server.emit('new user', user)
	  }
}