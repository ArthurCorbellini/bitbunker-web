import { Asset } from "../types/asset-type";
import { ApiResponse, httpClient } from "../util/api-util";

export const assetService = {
  create: async (data: Asset): Promise<ApiResponse<string>> => {
    return httpClient.post("/asset", data);
  },

  fetchAll: async (): Promise<ApiResponse<Asset[]>> => {
    return httpClient.get("/asset");
  }
}