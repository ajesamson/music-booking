import { BadRequestException, Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findOne(email: string): Promise<User | null> {
    return await this.databaseService.user.findFirst({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return await this.databaseService.user.findFirst({
      where: { uuid: id },
    });
  }

  async findProfileById(id: string): Promise<User | null> {
    return await this.databaseService.user.findFirst({
      where: { uuid: id },
      include: {
        profile: true,
      },
    });
  }

  async createUser(data: RegisterDto): Promise<User> {
    const { email, password, role } = data;

    if (!Object.values(Role).includes(role as Role)) {
      throw new BadRequestException('Invalid role');
    }
    const userRole: Role = role as Role;

    return await this.databaseService.user.create({
      data: {
        email,
        password,
        role: userRole,
        profile: {
          create: {
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
          },
        },
      },
    });
  }
}
