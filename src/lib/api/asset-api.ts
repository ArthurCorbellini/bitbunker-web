import { Asset } from "../types/asset-type";
import { ApiResponse, httpClient } from "../util/api-util";

export const assetApi = {
  createAsset: async (data: Asset): Promise<ApiResponse<string>> => {
    return httpClient.post("/asset", data);
  },

  fetchAssets: async (): Promise<ApiResponse<Asset[]>> => {
    return httpClient.get("/asset");
  }
}