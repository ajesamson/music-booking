import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty({ message: 'Event title is required' })
  @ApiProperty()
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  description?: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  date: string;

  @IsString()
  @IsNotEmpty({ message: 'Event venue is required' })
  @ApiProperty()
  venue: string;

  @IsInt()
  @Min(1, { message: 'Event capacity must be greater than 0' })
  capacity: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  address?: string;

  @IsString()
  @IsNotEmpty({ message: 'Event venue is required' })
  @ApiProperty()
  city: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  price: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  eventUrl?: string;
}
