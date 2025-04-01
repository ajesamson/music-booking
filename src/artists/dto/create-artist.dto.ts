import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty({ message: 'Artist name is required' })
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  imageUrl?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  genre?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  bio?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  instagramUrl?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  facebookUrl?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  twitterUrl?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  spotifyUrl?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  websiteUrl?: string;
}
