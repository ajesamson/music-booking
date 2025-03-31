import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [DatabaseModule, ArtistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
