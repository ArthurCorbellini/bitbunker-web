export interface ApiResponse<T = null> {
  success: boolean;
  apiPath: string;
  timestamp: string;
  error: ApiResponseError | null;
  data: T;
}

export interface ApiResponseError {
  code: string;
  messages: string[];
  display: boolean;
}
