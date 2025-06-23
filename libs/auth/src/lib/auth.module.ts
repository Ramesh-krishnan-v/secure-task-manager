import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../role.guard';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([User]),
   
    JwtModule.register({
      secret: 'jwt-secret-key',
      signOptions: { expiresIn: process.env['JWT_EXPIRES_IN'] || '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy,JwtAuthGuard, RolesGuard ],
  exports: [AuthService],
})
export class AuthModule {}

