import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { FriendsService } from './friends.service';
import { ConfigService } from '@nestjs/config';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@WebSocketGateway({
  cors: {
    origin: new ConfigService().get('FRONT_URL'),
    credentials: true,
  },
})
export class FriendsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly friendsService: FriendsService) {}

  @SubscribeMessage('addFriend')
  add(@MessageBody() id: number) {
    return this.friendsService.add(id);
  }

  @SubscribeMessage('removeFriend')
  remove(@MessageBody() id: number) {
    return this.friendsService.remove(id);
  }

  @SubscribeMessage('findAllFriends')
  findAll() {
    return this.friendsService.findAll();
  }

  handleConnection(client) {
    console.log('client connected');
  }

  handleDisconnect(client) {
    console.log('client disconnected');
  }

  // @SubscribeMessage('findOneFriend')
  // findOne(@MessageBody() id: number) {
  //   return this.friendsService.findOne(id);
  // }

  // @SubscribeMessage('updateFriend')
  // update(@MessageBody() updateFriendDto: UpdateFriendDto) {
  //   return this.friendsService.update(updateFriendDto.id, updateFriendDto);
  // }
}
