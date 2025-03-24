import { ApiResponse } from "../core/api-types";
import { Asset, ClassificationOption, CreateAsset, TypeOption } from "../types/asset";
import { BaseService } from "./base/BaseService";

export class AssetService extends BaseService {
  static async fetchAllAssets(): Promise<ApiResponse<Asset[]>> {
    return this.get("/asset");
  }

  static async createAsset(data: CreateAsset): Promise<ApiResponse> {
    return this.post("/asset", data);
  }

  static async getAssetTypeOptions(): Promise<ApiResponse<TypeOption[]>> {
    return this.get("/asset/type-options");
  }

  static async getAssetClassificationOptions(): Promise<ApiResponse<ClassificationOption[]>> {
    return this.get("/asset/classification-options");
  }
}
