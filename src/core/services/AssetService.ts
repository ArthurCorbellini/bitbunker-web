import { ApiResponse } from "../types/api";
import { Asset, CreateAsset, TierOption, TypeOption } from "../types/asset";
import { BaseService, NextFetchOptions } from "./base/BaseService";

export class AssetService extends BaseService {
  static async fetchAssets(next?: NextFetchOptions): Promise<ApiResponse<Asset[]>> {
    return this.get("/asset", next);
  }

  static async createAsset(data: CreateAsset): Promise<ApiResponse> {
    return this.post("/asset", data);
  }

  static async getAssetTypeOptions(): Promise<ApiResponse<TypeOption[]>> {
    return this.get("/asset/type-options");
  }

  static async getAssetTierOptions(): Promise<ApiResponse<TierOption[]>> {
    return this.get("/asset/tier-options");
  }
}
