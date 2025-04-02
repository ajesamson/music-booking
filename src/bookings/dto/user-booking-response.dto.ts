import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BookingResponseDto } from './booking-response.dto';

export class UserBookingResponseDto {
  @ApiProperty()
  @Expose()
  @Type(() => BookingResponseDto)
  bookings: BookingResponseDto[];
}
