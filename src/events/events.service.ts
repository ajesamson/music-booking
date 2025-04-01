import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { DatabaseService } from 'src/database/database.service';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { EventResponseDto } from './dto/event-response.dto';
import { errorResponse, successResponse } from 'src/utils/response.util';
import { plainToInstance } from 'class-transformer';
import { ArtistsService } from 'src/artists/artists.service';
import { CreateArtistOnEventDto } from './dto/create-artist-on-event.dto';
import { Event } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly artistService: ArtistsService,
  ) {}

  async create(data: CreateEventDto): Promise<ApiResponse<EventResponseDto>> {
    const event = await this.databaseService.event.create({
      data,
      include: { artists: { include: { artist: true } } },
    });

    return successResponse(
      'Event created successfully',
      plainToInstance(
        EventResponseDto,
        {
          ...event,
          price: event.price.toString(),
          artists: event.artists.map((ar) => ar.artist),
        },
        {
          excludeExtraneousValues: true,
        },
      ),
    );
  }

  async addArtistsToEvent(
    id: string,
    data: CreateArtistOnEventDto,
  ): Promise<ApiResponse<EventResponseDto>> {
    const event = await this.findOne(id);

    if (!event) {
      throw new NotFoundException(
        errorResponse(`Event with ID ${id} not found`),
      );
    }

    const artists = await this.artistService.findManyByUuid(data.artistIds);

    if (artists.length != data.artistIds.length) {
      throw new NotFoundException(
        errorResponse('One or more artists not found'),
      );
    }

    const updatedEvent = await this.databaseService.event.update({
      where: {
        uuid: id,
      },
      data: {
        artists: {
          create: artists.map((artist) => ({
            artist: {
              connect: { id: artist.id },
            },
          })),
        },
      },
      include: { artists: { include: { artist: true } } },
    });

    return successResponse(
      'Artists added to event successfully',
      plainToInstance(
        EventResponseDto,
        {
          ...updatedEvent,
          price: updatedEvent.price.toString(),
          artists: updatedEvent.artists.map((ar) => ar.artist),
        },
        {
          excludeExtraneousValues: true,
        },
      ),
    );
  }

  async findAll(): Promise<ApiResponse<EventResponseDto[]>> {
    const events = await this.databaseService.event.findMany({
      include: { artists: { include: { artist: true } } },
    });

    return successResponse(
      'Events retrieved successfully',
      plainToInstance(
        EventResponseDto,
        events.map((event) => ({
          ...event,
          price: event.price.toString(),
          artists: event.artists.map((ar) => ar.artist),
        })),
        {
          excludeExtraneousValues: true,
        },
      ),
    );
  }

  async findOne(id: string): Promise<ApiResponse<EventResponseDto>> {
    const event = await this.databaseService.event.findUnique({
      where: {
        uuid: id,
      },
      include: { artists: { include: { artist: true } } },
    });
    if (!event) {
      throw new NotFoundException(
        errorResponse(`Event with ID ${id} not found`),
      );
    }
    return successResponse(
      'Event retrieved successfully',
      plainToInstance(
        EventResponseDto,
        {
          ...event,
          price: event.price.toString(),
          artists: event.artists.map((ar) => ar.artist),
        },
        {
          excludeExtraneousValues: true,
        },
      ),
    );
  }

  async update(
    id: string,
    data: UpdateEventDto,
  ): Promise<ApiResponse<EventResponseDto>> {
    await this.findOne(id);
    const event = await this.databaseService.event.update({
      where: {
        uuid: id,
      },
      data,
      include: { artists: { include: { artist: true } } },
    });

    return successResponse(
      'Event updated successfully',
      plainToInstance(
        EventResponseDto,
        {
          ...event,
          price: event.price.toString(),
          artists: event.artists.map((ar) => ar.artist),
        },
        {
          excludeExtraneousValues: true,
        },
      ),
    );
  }

  async remove(id: string): Promise<ApiResponse<EventResponseDto>> {
    await this.findOne(id);
    const deletedEvent = await this.databaseService.event.delete({
      where: {
        uuid: id,
      },
      include: { artists: { include: { artist: true } } },
    });
    return successResponse(
      'Event deleted successfully',
      plainToInstance(EventResponseDto, deletedEvent, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async removeArtistFromEvent(
    id: string,
    artistId: string,
  ): Promise<ApiResponse<EventResponseDto>> {
    const event = await this.databaseService.event.findUnique({
      where: { uuid: id },
      include: { artists: true },
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    const existingArtist = await this.artistService.getArtistId(artistId);
    if (!existingArtist) {
      throw new NotFoundException(`Artist with ID ${artistId} not found`);
    }

    // Check if the artist is already associated with the event
    const artistExists = event.artists.some(
      (artist) => artist.artistId === existingArtist.id,
    );

    if (!artistExists) {
      throw new NotFoundException(
        `Artist with ID ${artistId} is not associated with this event`,
      );
    }

    const updatedEvent = await this.databaseService.event.update({
      where: {
        id: event.id,
      },
      data: {
        artists: {
          delete: {
            artistId_eventId: {
              artistId: existingArtist.id,
              eventId: event.id,
            },
          },
        },
      },
      include: { artists: { include: { artist: true } } },
    });

    return successResponse(
      'Artist removed from event successfully',
      plainToInstance(
        EventResponseDto,
        {
          ...updatedEvent,
          price: updatedEvent?.price.toString(),
          artists: updatedEvent?.artists.map((ar) => ar.artist),
        },
        {
          excludeExtraneousValues: true,
        },
      ),
    );
  }
}
