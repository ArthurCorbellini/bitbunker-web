export interface ApiPayload<T = null> {
  success: boolean;
  timestamp: string;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  messages: string[];
  display: boolean;
}

export type ApiResponse<T> = Promise<ApiPayload<T>>

export enum ApiErrorCode {
  RESOURCE_VALIDATION_ERROR,
  RESOURCE_ALREADY_EXISTS,
  RESOURCE_NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  UNKNOWN_ERROR,
}