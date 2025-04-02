import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  seats: number;

  @IsUUID()
  eventId: string;
}
