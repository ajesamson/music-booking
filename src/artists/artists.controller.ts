import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArtistResponseDto } from './dto/artist-response.dto';
import { ApiResponse } from 'src/dto/api-response.dto';

@Controller('artists')
@ApiTags('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @ApiCreatedResponse({ type: ArtistResponseDto })
  async create(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<ApiResponse<ArtistResponseDto>> {
    return await this.artistsService.create(createArtistDto);
  }

  @Get()
  @ApiOkResponse({ type: ArtistResponseDto, isArray: true })
  async findAll(): Promise<ApiResponse<ArtistResponseDto[]>> {
    return await this.artistsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ArtistResponseDto })
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponse<ArtistResponseDto>> {
    return this.artistsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ArtistResponseDto })
  async update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<ApiResponse<ArtistResponseDto>> {
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ArtistResponseDto })
  remove(@Param('id') id: string): Promise<ApiResponse<ArtistResponseDto>> {
    return this.artistsService.remove(id);
  }
}
