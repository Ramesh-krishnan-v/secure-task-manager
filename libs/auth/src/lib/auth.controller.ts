import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
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
    console.log('🔓 Login endpoint hit');
    return this.authService.login(loginDto);
  }

//  @Post('register')
// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(Role.Owner, Role.Admin)
// register(@Body() registerUserDto: RegisterUserDto, @Req() req: any) {
//   console.log('🔥 REGISTER endpoint hit');
//   console.log('🔐 req.user =', req.user);
//   return this.authService.register(registerUserDto);
// }

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin, Role.Owner)
@Post('register')
async register(@Body() dto: RegisterUserDto, @Req() req: any) {
  console.log('🔥 REGISTER endpoint hit');
  console.log('🔐 req.user =', req.user);
  return this.authService.register(dto);
}


@Get('protected-test')
@UseGuards(JwtAuthGuard)
getTest(@Req() req: any) {
  console.log('✅ TEST route hit, user:', req.user);
  return {
    message: 'Token is valid',
    user: req.user,
  };
}

}
