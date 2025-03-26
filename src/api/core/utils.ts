import { ApiErrorCode, ApiResponse } from "./types";

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
      return ApiErrorCode.UNKNOWN_ERROR;
  }
}
