import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { successResponse } from 'src/utils/response.util';
import { plainToInstance } from 'class-transformer';
import { RegisterResponseDto } from './dto/register-response.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<ApiResponse<RegisterResponseDto>> {
    const userExists = await this.usersService.findOne(registerDto.email);
    if (userExists) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    registerDto.password = hashedPassword;

    const newUser = await this.usersService.createUser(registerDto);

    return successResponse(
      'User registered successfully',
      plainToInstance(RegisterResponseDto, newUser, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async validateUser(data: LoginDto): Promise<User | null> {
    const { email, password } = data;
    const user = await this.usersService.findOne(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null;
    }

    return user;
  }

  login(user: User) {
    const payload = { sub: user.uuid, email: user.email, role: user.role };

    return {
      status: true,
      message: 'Login successful',
      data: {
        access_token: this.jwtService.sign(payload),
        user: { id: user.uuid, email: user.email, role: user.role },
      },
      error: null,
    };
  }

  async getProfile(user: User): Promise<ApiResponse<RegisterResponseDto>> {
    const userWithProfile = await this.usersService.findProfileById(user.uuid);

    return successResponse(
      'User profile retrieved successfully',
      plainToInstance(RegisterResponseDto, userWithProfile, {
        excludeExtraneousValues: true,
      }),
    );
  }
}
