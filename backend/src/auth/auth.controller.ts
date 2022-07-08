import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { OAuth2AuthGuard } from './guards/oauth2-auth.guard';
import { JwtOtpAuthGuard } from './guards/jwt-otp-auth.guard';
import { ValidateOtpDto } from './dto/validate-otp.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @UseGuards(OAuth2AuthGuard)
  @Get()
  @Redirect()
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const isAuthenticated = !req.user.tfa;
    const token = await this.authService.login(req.user.id, isAuthenticated);
    res.cookie('jwt', token, {
      sameSite: 'strict',
      httpOnly: true,
    });
    let redirectUrl = this.configService.get('FRONT_URL');
    if (isAuthenticated === false) {
      redirectUrl += '/tfauth';
    }
    return { url: redirectUrl };
  }

  @UseGuards(JwtOtpAuthGuard)
  @Get('google-authenticator')
  async googleAuthenticatorLoginCheck() {
    return true;
  }

  @UseGuards(JwtOtpAuthGuard)
  @Post('google-authenticator')
  async googleAuthenticatorLogin(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
    @Body() otp: ValidateOtpDto,
  ) {
    const validated = await this.authService.validateGoogleAuthenticatorToken(
      req.user.id,
      otp,
    );
    if (validated === true) {
      const token = await this.authService.login(req.user.id, true);
      res.cookie('jwt', token, {
        sameSite: 'strict',
        httpOnly: true,
      });
      return true;
    }
    return false;
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('jwt', '', {
      expires: new Date(),
      sameSite: 'strict',
      httpOnly: true,
    });
  }

  @Get('mock')
  @Redirect()
  async mockLogin(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.getMock();
    const isAuthenticated = !user.tfa;
    const token = await this.authService.login(user.id, isAuthenticated);
    res.cookie('jwt', token, {
      sameSite: 'strict',
      httpOnly: true,
    });
    if (isAuthenticated === true) {
      return { url: this.configService.get('FRONT_URL') };
    } else {
      return { url: this.configService.get('FRONT_URL') + '/tfauth' };
    }
  }
}
