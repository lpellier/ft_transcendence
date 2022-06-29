import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ConfigService } from '@nestjs/config';
import { FriendUserDto } from './dto/friend-user.dto';
import { Socket } from 'socket.io';
import { UsersService } from './users.service';

@WebSocketGateway({
  cors: {
    origin: new ConfigService().get('FRONT_URL'),
    credentials: true,
  },
})
export class FriendsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly usersService: UsersService) {}

  @SubscribeMessage('add friend')
  add(
    @ConnectedSocket() client: Socket,
    @MessageBody() friendUserDto: FriendUserDto,
  ) {
    this.usersService.addFriend(friendUserDto.userId, friendUserDto.friendId);
    client.emit('add friend');
  }

  @SubscribeMessage('remove friend')
  remove(
    @ConnectedSocket() client: Socket,
    @MessageBody() friendUserDto: FriendUserDto,
  ) {
    this.usersService.removeFriend(
      friendUserDto.userId,
      friendUserDto.friendId,
    );
    client.emit('add friend');
  }

  @SubscribeMessage('get friends')
  async findAll(
    @ConnectedSocket() client: Socket,
    @MessageBody() userId: number,
  ) {
    const friendsIds: number[] = await this.usersService.findFriendsIds(userId);
    const friends = await this.usersService.findFriends(friendsIds);
    client.emit('get friends', friends);
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('client connected');
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('client disconnected');
  }

  // @SubscribeMessage('updateFriend')
  // update(@MessageBody() updateFriendDto: UpdateFriendDto) {
  //   return this.friendsService.update(updateFriendDto.id, updateFriendDto);
  // }
}
