import { ApiResponse } from 'src/dto/api-response.dto';

export function successResponse<T>(message: string, data: T): ApiResponse<T> {
  return new ApiResponse<T>(true, message, data, null);
}

export function errorResponse(
  message: string,
  error: string[] = [],
): ApiResponse<null> {
  return new ApiResponse<null>(false, message, null, error);
}
