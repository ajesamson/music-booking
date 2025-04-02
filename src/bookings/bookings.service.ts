import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { DatabaseService } from 'src/database/database.service';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { BookingResponseDto } from './dto/booking-response.dto';
import { EventsService } from 'src/events/events.service';
import { errorResponse, successResponse } from 'src/utils/response.util';
import { UsersService } from 'src/users/users.service';
import { plainToInstance } from 'class-transformer';
import { UserBookingResponseDto } from './dto/user-booking-response.dto';
import { Role, User } from '@prisma/client';

@Injectable()
export class BookingsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly eventsService: EventsService,
    private readonly userService: UsersService,
  ) {}

  async create(
    createBookingDto: CreateBookingDto,
    userId: number,
  ): Promise<ApiResponse<BookingResponseDto>> {
    const { eventId, seats } = createBookingDto;
    const event = await this.eventsService.getEvent(eventId);

    if (!event) {
      throw new NotFoundException(
        errorResponse(`Event with ID ${eventId} not found`),
      );
    }

    const data = {
      date: event.date,
      seats,
      paymentAmount: +event.price * seats,
      event: {
        connect: {
          id: event.id,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    };

    const booking = await this.databaseService.booking.create({
      data,
      include: {
        event: true,
        user: true,
      },
    });

    return successResponse(
      'Booking created successfully',
      plainToInstance(BookingResponseDto, booking, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async getUserBookings(
    userId: number,
  ): Promise<ApiResponse<BookingResponseDto[]>> {
    const bookings = await this.databaseService.booking.findMany({
      where: {
        userId,
      },
      include: {
        event: true,
        user: true,
      },
    });

    return successResponse(
      'Bookings retrieved successfully',
      plainToInstance(
        BookingResponseDto,
        bookings.map((bk) => {
          return {
            ...bk,
            paymentAmount: bk.paymentAmount.toString(),
            event: {
              ...bk.event,
              price: bk.event.price.toString(),
            },
          };
        }),
        {
          excludeExtraneousValues: true,
        },
      ),
    );
  }

  async getArtistBookings(artistId: number) {
    const bookings = await this.databaseService.booking.findMany({
      where: {
        event: {
          artists: {
            some: {
              artistId,
            },
          },
        },
      },
      include: {
        event: true,
        user: true,
      },
    });

    return successResponse(
      'Bookings retrieved successfully',
      plainToInstance(
        BookingResponseDto,
        bookings.map((bk) => {
          return {
            ...bk,
            paymentAmount: bk.paymentAmount.toString(),
            event: {
              ...bk.event,
              price: bk.event.price.toString(),
            },
          };
        }),
        {
          excludeExtraneousValues: true,
        },
      ),
    );
  }

  async findAll(user: User) {
    if (user.role === Role.CUSTOMER) {
      return await this.getUserBookings(user.id);
    }
    if (user.role === Role.ARTIST) {
      return await this.getArtistBookings(user.id);
    }

    const bookings = await this.databaseService.booking.findMany({
      include: {
        event: true,
        user: true,
      },
    });

    // Note: The map implementation is not effective but no time
    // to investigate why plainToInstance @Transform is failing
    return successResponse(
      'Bookings retrieved successfully',
      plainToInstance(
        BookingResponseDto,
        bookings.map((bk) => {
          return {
            ...bk,
            paymentAmount: bk.paymentAmount.toString(),
            event: {
              ...bk.event,
              price: bk.event.price.toString(),
            },
          };
        }),
        {
          excludeExtraneousValues: true,
        },
      ),
    );
  }

  async findOne(id: string) {
    const booking = await this.databaseService.booking.findUnique({
      where: {
        uuid: id,
      },
      include: {
        event: true,
        user: true,
      },
    });

    return successResponse(
      'Artist bookings retrieved successfully',
      plainToInstance(
        BookingResponseDto,
        {
          ...booking,
          paymentAmount: booking?.paymentAmount.toString(),
          event: {
            ...booking?.event,
            price: booking?.event?.price.toString(),
          },
        },
        {
          excludeExtraneousValues: true,
        },
      ),
    );
  }
}
