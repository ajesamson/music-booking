import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Req,
  UseFilters,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from 'src/common/filters/prisma-client-exception/prisma-client-exception.filter';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/role.guards';
import { Role } from '@prisma/client';
import { Roles } from './decorator/roles.decorator';

@Controller('auth')
@ApiTags('Auth')
@UseFilters(PrismaClientExceptionFilter)
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  @ApiCreatedResponse({ type: RegisterResponseDto })
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<ApiResponse<RegisterResponseDto>> {
    return this.authService.register(registerDto);
  }

  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: LoginResponseDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req): Promise<ApiResponse<RegisterResponseDto>> {
    return this.authService.getProfile(req.user);
  }
}
