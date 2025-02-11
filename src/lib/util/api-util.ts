
const root = process.env.API_URL;

export interface ApiResponse<T> {
  ok: boolean;
  apiPath: string;
  timestamp: string;
  error: ApiResponseError | null;
  data: T;
}

export interface ApiResponseError {
  code: string;
  message: string;
  details?: Record<string, string[]> | string;
}

export enum ApiErrorCode {
  RESOURCE_VALIDATION_ERROR,
  RESOURCE_ALREADY_EXISTS,
  RESOURCE_NOT_FOUND,
  INTERNAL_SERVER_ERROR,

  UNMAPPED_ERROR,
}

export const convertResponseError = <T>(response: ApiResponse<T>) => {
  switch (response.error?.code) {
    case "VALIDATION_ERROR":
      return ApiErrorCode.RESOURCE_VALIDATION_ERROR;
    case "ALREADY_EXISTS":
      return ApiErrorCode.RESOURCE_ALREADY_EXISTS;
    case "NOT_FOUND":
      return ApiErrorCode.RESOURCE_NOT_FOUND;
    case "INTERNAL_SERVER_ERROR":
      return ApiErrorCode.INTERNAL_SERVER_ERROR;
    default:
      return ApiErrorCode.UNMAPPED_ERROR;
  }
}

export const httpClient = {
  get: async <T>(
    url: string
  ): Promise<ApiResponse<T>> => {
    const response = await fetch(root + url);
    return response.json();
  },
  post: async <T, D>(
    url: string,
    payload: D
  ): Promise<ApiResponse<T>> => {
    const response = await fetch(root + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  },
  put: () => { },
  delete: () => { },
}
