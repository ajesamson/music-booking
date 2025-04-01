import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @MaxLength(45)
  @MinLength(1)
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
