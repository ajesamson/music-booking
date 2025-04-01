import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';

export class CreateArtistOnEventDto {
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ type: [String] })
  artistIds: string[];
}
