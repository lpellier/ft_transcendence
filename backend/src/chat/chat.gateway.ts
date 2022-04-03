import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "dgram";

@WebSocketGateway({
	cors: {
	  origin: 'http://localhost:3000',
	},
  })
export class ChatGateway {
	@WebSocketServer()
	server: Socket;

	@SubscribeMessage('message')
	handlemessage() {
		return ('message')
	}
}