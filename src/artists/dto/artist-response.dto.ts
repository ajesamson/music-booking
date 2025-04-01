import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ArtistResponseDto {
  @ApiProperty()
  @Expose({ name: 'uuid' })
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  genre: string;

  @ApiProperty()
  @Expose()
  bio: string;

  @ApiProperty()
  @Expose()
  imageUrl?: string;
}
