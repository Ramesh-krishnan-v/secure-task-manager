import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../role.guard';
import { Roles } from '../roles.decorator';
import { Role } from '../role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @Roles(Role.Owner, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async register(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }
}
