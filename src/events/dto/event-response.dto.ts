import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ArtistResponseDto } from 'src/artists/dto/artist-response.dto';

export class EventResponseDto {
  @ApiProperty()
  @Expose({ name: 'uuid' })
  id: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  date: string;

  @ApiProperty()
  @Expose()
  venue: string;

  @ApiProperty()
  @Expose()
  capacity: number;

  @ApiProperty()
  @Expose()
  price: string;

  @ApiProperty()
  @Expose()
  eventUrl?: string;

  @Expose()
  @Type(() => ArtistResponseDto)
  artists: ArtistResponseDto[];
}
