import { Controller, Get, Body, Patch, Param, UseGuards, Req, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProfileWithSettings } from './interfaces/profile-with-settings.interface';
import { Profile } from './interfaces/profile.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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
    return this.usersService.getProfileWithSettings(req.user.id);
  }

  @Patch('me')
  updateMe(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(req.user.id, updateUserDto);
  }

  @Put('upload-avatar')
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: './public/avatars',
      filename: (req: any, file, cb) => cb(null, req.user.id + '.png')
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype.match(/^image/)){
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
    limits: {
      fileSize: 1048576
    }
  }))
  uploadAvatar(@UploadedFile() file: Express.Multer.File) {
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Profile> {
    return this.usersService.getProfile(+id);
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
