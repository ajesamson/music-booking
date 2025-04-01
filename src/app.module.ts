import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ArtistsModule } from './artists/artists.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [DatabaseModule, ArtistsModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
