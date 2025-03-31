import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [DatabaseModule],
})
export class ArtistsModule {}
