import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  override handleRequest(err: any, user: any, info: any) {
    console.log('🛡️ JwtAuthGuard - user:', user); // MUST log
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid or missing token');
    }
    return user; // 🟢 REQUIRED
  }
}
