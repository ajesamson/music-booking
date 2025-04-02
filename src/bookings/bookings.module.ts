import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { EventsModule } from 'src/events/events.module';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService],
  imports: [UsersModule, EventsModule, DatabaseModule],
  exports: [BookingsService],
})
export class BookingsModule {}
