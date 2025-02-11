import { Token } from "../types/token-type";
import { ApiResponse, httpClient } from "../util/api-util";

export const tokenApi = {
  createToken: async (data: Token): Promise<ApiResponse<string>> => {
    return httpClient.post("/token", data);
  },

  fetchTokens: async (): Promise<ApiResponse<Token[]>> => {
    return httpClient.get("/token");
  }
}