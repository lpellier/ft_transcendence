import { Controller, Get, Body, Patch, Param, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProfileWithSettings } from './interfaces/profile-with-settings.interface';
import { Profile } from './interfaces/profile.interface';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  async findMe(@Req() req): Promise<ProfileWithSettings> {
    const user = await this.usersService.getProfileWithSettings(req.user.id);
    return user;
  }

  @Patch('me')
  updateMe(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(req.user.id, updateUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Profile> {
    const user = await this.usersService.getProfile(+id);
    return user;
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
