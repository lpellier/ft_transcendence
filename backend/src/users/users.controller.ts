import { Controller, Get, Post, Put, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

@UseGuards(AuthGuard('jwt'))
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
  findMe(@Req() req) {
    return this.usersService.findOne(req.user.id);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put('me')
  updateMe(@Req() req,  @Body() data: any) {
    // console.log("!!! updateme data = ", data.avatar);
    
    console.log("!!! updateme data = ", data.data);
    // return this.usersService.findOne(req.user.id);
    return this.usersService.updateOne(req.user.id, data.data);
  }

  @Delete('me')
  remove(@Req() req, @Body() data: any) {
    console.log("MY DATA: ", data);
    // return this.usersService.findOne(req.user.id);
    return this.usersService.remove(req.user.id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }
}
