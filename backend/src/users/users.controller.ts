import { Controller, Get, Post, Put, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  async findMe(@Req() req) {
    const user = await this.usersService.getProfile(req.user.id);
    return user;
  }

  // @Get('enable-two-factor-authentication')
  // enableTwoFactorAuthentication(@Req() req) {
  //   return this.usersService.enableTwoFactorAuthentication(+req.user.id);
  // }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.getProfile(+id);
    return user;
  }

  // @Put('me')
  // updateMe(@Req() req,  @Body() data: any) {
  //   console.log("!!! updateme data = ", data.username);
  //   return this.usersService.updateOne(req.user.id, data);
  // }

  @Patch('me')
  updateMe(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }
  
  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  } */

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
