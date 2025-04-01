import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { plainToInstance } from 'class-transformer';
import { ArtistResponseDto } from './dto/artist-response.dto';
import { errorResponse, successResponse } from 'src/utils/response.util';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { EventsForArtistDto } from './dto/events-for-artist.dto';

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
      }),
    );
  }

  async findAll(): Promise<ApiResponse<ArtistResponseDto[]>> {
    const artists = await this.databaseService.artist.findMany();

    return successResponse(
      'Artists retrieved successfully',
      plainToInstance(ArtistResponseDto, artists, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async getArtistId(uuid: string): Promise<{ id: number }> {
    const artist = await this.databaseService.artist.findUnique({
      where: {
        uuid,
      },
      select: {
        id: true,
      },
    });
    if (!artist) {
      throw new NotFoundException(
        errorResponse(`Artist with ID ${uuid} not found`),
      );
    }

    return artist;
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
      }),
    );
  }

  async findManyByUuid(ids: string[]): Promise<{ id: number }[]> {
    const artists = await this.databaseService.artist.findMany({
      where: {
        uuid: {
          in: ids,
        },
      },
      select: { id: true },
    });

    return artists;
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
      }),
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
      }),
    );
  }

  async findEventsForArtist(
    id: string,
  ): Promise<ApiResponse<EventsForArtistDto>> {
    const artist = await this.databaseService.artist.findUnique({
      where: { uuid: id },
      include: {
        events: {
          include: {
            event: true,
          },
        },
      },
    });

    if (!artist) {
      throw new NotFoundException(
        errorResponse(`Artist with ID ${id} not found`),
      );
    }

    return successResponse(
      'Artist events retrieved successfully',
      plainToInstance(
        EventsForArtistDto,
        {
          ...artist,
          events: artist.events.map((ev) => {
            return {
              ...ev.event,
              price: ev.event.price.toString(),
            };
          }),
        },
        {
          excludeExtraneousValues: true,
        },
      ),
    );
  }
}
