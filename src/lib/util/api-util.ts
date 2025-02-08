
export enum ApiErrorCode {
  RESOURCE_VALIDATION_ERROR,
  RESOURCE_ALREADY_EXISTS,
  RESOURCE_NOT_FOUND,
  INTERNAL_SERVER_ERROR,

  UNMAPPED_ERROR,
}

export const convertResponseData = async (response: Response) => {
  return (await response.json()).data;
}

export const convertResponseError = async (response: Response) => {
  const error = (await response.json()).error;

  switch (error.code) {
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
