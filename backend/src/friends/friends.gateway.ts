import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway({
  cors: {
    origin: (new ConfigService).get("FRONT_URL"),
    credentials: true
  }
})
export class FriendsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly friendsService: FriendsService) {}

  handleConnection(client) {
    console.log("client connected")
  }

  handleDisconnect(client) {
    console.log("client disconnected")
  }

  @SubscribeMessage('createFriend')
  create(@MessageBody() createFriendDto: CreateFriendDto) {
    return this.friendsService.create(createFriendDto);
  }

  @SubscribeMessage('findAllFriends')
  findAll() {
    return this.friendsService.findAll();
  }

  @SubscribeMessage('findOneFriend')
  findOne(@MessageBody() id: number) {
    return this.friendsService.findOne(id);
  }

  @SubscribeMessage('updateFriend')
  update(@MessageBody() updateFriendDto: UpdateFriendDto) {
    return this.friendsService.update(updateFriendDto.id, updateFriendDto);
  }

  @SubscribeMessage('removeFriend')
  remove(@MessageBody() id: number) {
    return this.friendsService.remove(id);
  }
}
