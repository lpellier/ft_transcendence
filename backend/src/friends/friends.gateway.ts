import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { FriendsService } from './friends.service';
import { ConfigService } from '@nestjs/config';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FriendUserDto } from './dto/friend-user.dto';
import { Socket } from "socket.io";

// @UseGuards(JwtAuthGuard)
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

  @SubscribeMessage('add friend')
  add(@ConnectedSocket() client:Socket, @MessageBody() friendUserDto: FriendUserDto) {
    this.friendsService.add(friendUserDto.userId, friendUserDto.friendId);
    client.emit('friend added');
  }

  @SubscribeMessage('removeFriend')
  remove(@MessageBody() friendUserDto: FriendUserDto) {
    return this.friendsService.remove(friendUserDto.userId, friendUserDto.friendId);
  }

  @SubscribeMessage('find all friends')
  async findAll(@ConnectedSocket() client:Socket , @MessageBody() userId: number) {
    const friendsIds: number[] = await this.friendsService.findAllIds(userId);
    const friends = await this.friendsService.findAll(friendsIds);
    client.emit('found friends', friends);
  }

  handleConnection(client) {
    console.log('client connected');
  }

  handleDisconnect(client) {
    console.log('client disconnected');
  }

  @SubscribeMessage('get all users')
	async handleNewUser(@ConnectedSocket () client : Socket) {

		const allUsers =  await this.friendsService.getAllUsers();
    client.emit('got all users', allUsers);
    // }
		// console.log('new user called', newUserDto)
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
