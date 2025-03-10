import { ApiResponse } from "../core/api-types";
import { httpClient } from "../core/api-utils";
import { Asset, CreateAsset, CreateAssetParams } from "../types/asset-types";

export class AssetService {
  static async fetchAll(): Promise<ApiResponse<Asset[]>> {
    return httpClient.get("/asset");
  }

  static async create(data: CreateAsset): Promise<ApiResponse> {
    return httpClient.post("/asset", data);
  }

  static async getCreateParams(): Promise<ApiResponse<CreateAssetParams>> {
    return httpClient.get("/asset/create-params");
  }
}
