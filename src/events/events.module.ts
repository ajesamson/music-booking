import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ArtistsService } from 'src/artists/artists.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EventsController],
  providers: [EventsService, ArtistsService],
})
export class EventsModule {}
