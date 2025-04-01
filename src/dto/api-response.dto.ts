export class ApiResponse<T> {
  status: boolean;
  message: string;
  data: T | null;
  error: string[] | null;

  constructor(
    status: boolean,
    message: string,
    data: T | null = null,
    error: string[] | null = null,
  ) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.error = error;
  }
}
