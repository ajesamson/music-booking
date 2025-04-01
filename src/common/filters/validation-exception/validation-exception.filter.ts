import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errors = Array.isArray((exceptionResponse as any).message)
      ? (exceptionResponse as any).message
      : [exceptionResponse];

    response.status(status).json({
      status: false,
      message: 'Validation failed',
      data: null,
      error: errors,
    });
  }
}
