import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { BlockedService } from './blocked.service';
import { ConfigService } from '@nestjs/config';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BlockedUserDto } from './dto/blocked-user.dto';
import { Socket } from "socket.io";

// @UseGuards(JwtAuthGuard)
let socketUser = new Map<number, number>();

@WebSocketGateway({
  cors: {
    origin: new ConfigService().get('FRONT_URL'),
    credentials: true,
  },
})
export class BlockedGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly BlockedService: BlockedService) {}


  @SubscribeMessage('add blocked')
  add(@ConnectedSocket() client:Socket, @MessageBody() blockedUserDto: BlockedUserDto) {
    this.BlockedService.add(blockedUserDto.userId, blockedUserDto.blockedId);
    client.emit('add blocked');
    console.log('add blocked called -> ', blockedUserDto);
  }

  @SubscribeMessage('removeBlocked')
  remove(@MessageBody() blockedUserDto: BlockedUserDto) {
    return this.BlockedService.remove(blockedUserDto.userId, blockedUserDto.blockedId);
  }

  @SubscribeMessage('get blocked')
  async findAll(@ConnectedSocket() client:Socket , @MessageBody() userId: number) {
    const blockedIds: number[] = await this.BlockedService.findAllIds(userId);
    const blocked = await this.BlockedService.findAll(blockedIds);
    client.emit('get blocked', blocked);
    console.log('get blocked called', blocked)
  }

  handleConnection(@ConnectedSocket() client:Socket) {
    console.log('client connected');
  }

  handleDisconnect(@ConnectedSocket() client:Socket) {
    console.log('client disconnected');
  }

  // @SubscribeMessage('findOneBlocked')
  // findOne(@MessageBody() id: number) {
  //   return this.blockedsService.findOne(id);
  // }

  // @SubscribeMessage('updateFriend')
  // update(@MessageBody() updateFriendDto: UpdateFriendDto) {
  //   return this.friendsService.update(updateFriendDto.id, updateFriendDto);
  // }
}
