import { ApiResponse } from "../types/api";
import { AssetCategory, AssetCategoryFormType } from "../types/asset-category";
import { Api, NextFetchOptions } from "./base/base.api";

const root = "/asset-categories";

export const assetCategoryApi = {
  getAll: (next?: NextFetchOptions): ApiResponse<AssetCategory[]> =>
    Api.get(root, next),
  create: (data: AssetCategoryFormType): ApiResponse<AssetCategory> =>
    Api.post(root, data),
  update: ({ id, ...rest }: AssetCategoryFormType): ApiResponse<AssetCategory> =>
    Api.put(`${root}/${id}`, { ...rest }),
  delete: (id: number): ApiResponse<string> =>
    Api.delete(`${root}/${id}`),
}
