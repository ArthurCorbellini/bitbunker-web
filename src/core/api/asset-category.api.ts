import { ApiResponse } from "../types/api";
import { AssetCategory, CreateAssetCategory } from "../types/asset-category";
import { Api, NextFetchOptions } from "./base/base-api";

const root = "/asset-categories";

export const assetCategoryApi = {
  fetchAll: (next?: NextFetchOptions): ApiResponse<AssetCategory[]> => Api.post(root, next),
  create: (data: CreateAssetCategory): ApiResponse => Api.post(root, data),
}
