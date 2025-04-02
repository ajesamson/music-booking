import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ProfileResponseDto } from 'src/auth/dto/profile-response.dto';
import { EventResponseDto } from 'src/events/dto/event-response.dto';

export class BookingResponseDto {
  @ApiProperty()
  @Expose({ name: 'uuid' })
  id: string;

  @ApiProperty()
  @Expose()
  date: string;

  @ApiProperty()
  @Expose()
  status: string;

  @ApiProperty()
  @Expose()
  seats: number;

  @ApiProperty()
  @Expose()
  paymentAmount: string;

  @ApiProperty()
  @Expose()
  paymentStatus: string;

  @ApiProperty()
  @Expose()
  @Type(() => EventResponseDto)
  event: EventResponseDto;

  @ApiProperty()
  @Expose()
  @Type(() => ProfileResponseDto)
  user: ProfileResponseDto;
}
