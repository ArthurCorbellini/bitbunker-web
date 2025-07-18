export interface ApiResponse<T = null> {
  success: boolean;
  apiPath: string;
  timestamp: string;
  error: ApiResponseError | null;
  data?: T;
}

export interface ApiResponseError {
  code: string;
  messages: string[];
  display: boolean;
}

export enum ApiErrorCode {
  RESOURCE_VALIDATION_ERROR,
  RESOURCE_ALREADY_EXISTS,
  RESOURCE_NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  UNKNOWN_ERROR,
}