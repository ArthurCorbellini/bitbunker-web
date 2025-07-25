import { ApiErrorCode, ApiResponse } from "@/core/types/api";

const root = process.env.NEXT_PUBLIC_API_URL;

export interface NextFetchOptions {
  tags?: string[]
  revalidate?: number
}

export class BaseService {

  private static async buildUnknownErrorResponse<T>(): ApiResponse<T> {
    return {
      success: false,
      timestamp: new Date().toISOString(),
      error: {
        code: ApiErrorCode.UNKNOWN_ERROR.toString(),
        messages: [],
        display: false,
      },
    };
  }

  protected static async get<T>(
    url: string,
    next?: NextFetchOptions,
  ): ApiResponse<T> {
    try {
      const response = await fetch(root + url, { next });

      return response.json();
    } catch {
      return this.buildUnknownErrorResponse<T>();
    }
  }

  protected static async post<D, T>(url: string, payload: D): ApiResponse<T> {
    try {
      const response = await fetch(root + url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      return response.json();
    } catch {
      return this.buildUnknownErrorResponse<T>();
    }
  }
}
