import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaClientExceptionFilter } from 'src/common/filters/prisma-client-exception/prisma-client-exception.filter';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { EventResponseDto } from './dto/event-response.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { CreateArtistOnEventDto } from './dto/create-artist-on-event.dto';

@Controller('events')
@ApiTags('Events')
@UseFilters(PrismaClientExceptionFilter)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiCreatedResponse({ type: EventResponseDto })
  async create(
    @Body() createEventDto: CreateEventDto,
  ): Promise<ApiResponse<EventResponseDto>> {
    return await this.eventsService.create(createEventDto);
  }

  @Get()
  @ApiOkResponse({ type: EventResponseDto, isArray: true })
  async findAll(): Promise<ApiResponse<EventResponseDto[]>> {
    return await this.eventsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: EventResponseDto })
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponse<EventResponseDto>> {
    return await this.eventsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: EventResponseDto })
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<ApiResponse<EventResponseDto>> {
    return await this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: EventResponseDto })
  async remove(
    @Param('id') id: string,
  ): Promise<ApiResponse<EventResponseDto>> {
    return await this.eventsService.remove(id);
  }

  @Post(':id/artists')
  @ApiOkResponse({ type: EventResponseDto })
  async addArtistsToEvent(
    @Param('id') id: string,
    @Body() createArtistOnEventDto: CreateArtistOnEventDto,
  ): Promise<ApiResponse<EventResponseDto>> {
    return await this.eventsService.addArtistsToEvent(
      id,
      createArtistOnEventDto,
    );
  }

  @Delete(':id/artists/:artistId')
  @ApiOkResponse({ type: EventResponseDto })
  async removeArtistFromEvent(
    @Param('id') id: string,
    @Param('artistId') artistId: string,
  ): Promise<ApiResponse<EventResponseDto>> {
    return await this.eventsService.removeArtistFromEvent(id, artistId);
  }
}
