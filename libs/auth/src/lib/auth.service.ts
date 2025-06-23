import { Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from '../dto/login.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // Seed admin user on startup
  async onModuleInit() {
    const adminExists = await this.userRepo.findOneBy({ email: 'admin@gmail.com' });
    if (!adminExists) {
      const admin = this.userRepo.create({
        email: 'admin@gmail.com',
        password: 'admin',
        role: 'Admin',
      });
      await this.userRepo.save(admin);
      console.log('✅ Admin user created');
    }
    else {
       console.log('✅ Admin user exist');
    }
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOneBy({
      email: dto.email,
    });

    if (!user || user?.password !== dto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
    };
  }

  async register(dto: RegisterUserDto) {
    console.log("ssssssssssssssss", dto.email)
    const exists = await this.userRepo.findOneBy({ email: dto.email });
    if (exists) {
      throw new UnauthorizedException('User already exists');
    }

    const newUser = this.userRepo.create(dto);
    const savedUser = await this.userRepo.save(newUser);

    return { message: 'User registered successfully', user: savedUser };
  }
}
