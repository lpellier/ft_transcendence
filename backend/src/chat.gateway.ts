import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "dgram";

@WebSocketGateway()
export class ChatGateway {
	@WebSocketServer()
	server: Socket;

	@SubscribeMessage('message')
	handlemessage() {
		return ('message')
	}
}