import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { plainToInstance } from 'class-transformer';
import { ArtistResponseDto } from './dto/artist-response.dto';
import { Artist } from '@prisma/client';
import { errorResponse, successResponse } from 'src/utils/response.util';
import { ApiResponse } from 'src/dto/api-response.dto';

@Injectable()
export class ArtistsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(
    createArtistDto: CreateArtistDto,
  ): Promise<ApiResponse<ArtistResponseDto>> {
    const artist = await this.databaseService.artist.create({
      data: createArtistDto,
    });

    return successResponse(
      'Artist created successfully',
      plainToInstance(ArtistResponseDto, artist, {
        excludeExtraneousValues: true,
      }) as ArtistResponseDto,
    );
  }

  async findAll(): Promise<ApiResponse<ArtistResponseDto[]>> {
    const artists = await this.databaseService.artist.findMany();

    return successResponse(
      'Artists retrieved successfully',
      plainToInstance(ArtistResponseDto, artists, {
        excludeExtraneousValues: true,
      }) as ArtistResponseDto[],
    );
  }

  async findOne(id: string): Promise<ApiResponse<ArtistResponseDto>> {
    const artist = await this.databaseService.artist.findUnique({
      where: {
        uuid: id,
      },
    });
    if (!artist) {
      throw new NotFoundException(
        errorResponse(`Artist with ID ${id} not found`),
      );
    }

    return successResponse(
      'Artist retrieved successfully',
      plainToInstance(ArtistResponseDto, artist, {
        excludeExtraneousValues: true,
      }) as ArtistResponseDto,
    );
  }

  async update(
    id: string,
    data: UpdateArtistDto,
  ): Promise<ApiResponse<ArtistResponseDto>> {
    await this.findOne(id);
    const updatedArtist = await this.databaseService.artist.update({
      where: {
        uuid: id,
      },
      data,
    });

    return successResponse(
      'Artist updated successfully',
      plainToInstance(ArtistResponseDto, updatedArtist, {
        excludeExtraneousValues: true,
      }) as ArtistResponseDto,
    );
  }

  async remove(id: string): Promise<ApiResponse<ArtistResponseDto>> {
    await this.findOne(id);
    const deletedArtist = await this.databaseService.artist.delete({
      where: {
        uuid: id,
      },
    });

    return successResponse(
      'Artist deleted successfully',
      plainToInstance(ArtistResponseDto, deletedArtist, {
        excludeExtraneousValues: true,
      }) as ArtistResponseDto,
    );
  }
}
