export interface ApiPayload<T = undefined> {
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

export type ApiResponse<T = undefined> = Promise<ApiPayload<T>>

export enum ApiErrorCode {
  RESOURCE_VALIDATION_ERROR,
  RESOURCE_ALREADY_EXISTS,
  RESOURCE_NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  UNKNOWN_ERROR,
}