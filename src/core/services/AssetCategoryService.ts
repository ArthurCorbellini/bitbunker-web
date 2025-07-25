import { ApiResponse } from "../types/api";
import { AssetCategory, CreateAssetCategory } from "../types/asset-category";
import { BaseService, NextFetchOptions } from "./base/BaseService";

export class AssetCategoryService extends BaseService {
  static async fetchAll(next?: NextFetchOptions): ApiResponse<AssetCategory[]> {
    // return this.get("/asset-categories", next);

    const dummie = {
      success: true,
      timestamp: Date.now().toString(),
      data: [
        {
          id: 1,
          name: "Alt A",
          recommendedPercentage: 0.1
        },
        {
          id: 2,
          name: "Alt B",
          recommendedPercentage: 0.2
        },
      ]
    }
    return dummie;
  }

  static async createAssetCategory(data: CreateAssetCategory): ApiResponse {
    return this.post("/asset-categories", data);
  }

}
