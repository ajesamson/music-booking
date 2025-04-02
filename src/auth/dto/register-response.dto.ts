import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ProfileResponseDto } from './profile-response.dto';

export class RegisterResponseDto {
  @ApiProperty()
  @Expose({ name: 'uuid' })
  id: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  role: string;

  @ApiProperty()
  @Expose()
  @Type(() => ProfileResponseDto)
  profile: ProfileResponseDto;
}
