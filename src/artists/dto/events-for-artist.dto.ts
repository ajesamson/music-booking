import { Expose, Type } from 'class-transformer';
import { EventResponseDto } from 'src/events/dto/event-response.dto';
import { ArtistResponseDto } from './artist-response.dto';

export class EventsForArtistDto extends ArtistResponseDto {
  @Expose()
  @Type(() => EventResponseDto)
  events: EventResponseDto[];
}
