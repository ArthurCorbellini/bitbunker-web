import { ApiPayload } from "../types/api";
import { Asset, CreateAsset, TierOption, TypeOption } from "../types/asset";
import { Api, NextFetchOptions } from "./base/base-api";

export class AssetApi extends Api {
  static async fetchAssets(next?: NextFetchOptions): Promise<ApiPayload<Asset[]>> {
    return this.get("/asset", next);
  }

  static async createAsset(data: CreateAsset): Promise<ApiPayload> {
    return this.post("/asset", data);
  }

  static async getAssetTypeOptions(): Promise<ApiPayload<TypeOption[]>> {
    return this.get("/asset/type-options");
  }

  static async getAssetTierOptions(): Promise<ApiPayload<TierOption[]>> {
    return this.get("/asset/tier-options");
  }
}
