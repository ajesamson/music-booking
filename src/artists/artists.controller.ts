import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArtistResponseDto } from './dto/artist-response.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { PrismaClientExceptionFilter } from 'src/common/filters/prisma-client-exception/prisma-client-exception.filter';
import { EventsForArtistDto } from './dto/events-for-artist.dto';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guards';

@Controller('artists')
@ApiTags('Artists')
@UseFilters(PrismaClientExceptionFilter)
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  @ApiCreatedResponse({ type: ArtistResponseDto })
  async create(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<ApiResponse<ArtistResponseDto>> {
    return await this.artistsService.create(createArtistDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  @ApiOkResponse({ type: ArtistResponseDto, isArray: true })
  async findAll(): Promise<ApiResponse<ArtistResponseDto[]>> {
    return await this.artistsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  @ApiOkResponse({ type: ArtistResponseDto })
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponse<ArtistResponseDto>> {
    return this.artistsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  @ApiOkResponse({ type: ArtistResponseDto })
  async update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<ApiResponse<ArtistResponseDto>> {
    return this.artistsService.update(id, updateArtistDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiOkResponse({ type: ArtistResponseDto })
  remove(@Param('id') id: string): Promise<ApiResponse<ArtistResponseDto>> {
    return this.artistsService.remove(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id/events')
  @ApiOkResponse({ type: EventsForArtistDto })
  async getEventsForArtist(
    @Param('id') id: string,
  ): Promise<ApiResponse<EventsForArtistDto>> {
    return await this.artistsService.findEventsForArtist(id);
  }
}
