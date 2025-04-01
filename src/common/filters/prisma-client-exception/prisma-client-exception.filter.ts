import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from 'express';
import { errorResponse } from 'src/utils/response.util';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const messages = exception.message.split('\n');
    const message = messages[messages.length - 1].trim();

    switch (exception.code) {
      case 'P2002':
        response.status(HttpStatus.CONFLICT).json(errorResponse(message));
        break;
      default:
        super.catch(exception, host);
    }
  }
}
