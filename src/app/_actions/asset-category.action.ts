"use server"

import { revalidateTag } from "next/cache";

import { assetCategoryApi } from "@/core/api/asset-category.api";
import { ApiResponse } from "@/core/types/api";
import { AssetCategory, AssetCategoryFormType } from "@/core/types/asset-category";

export const saveAssetCategory = async (
  category: AssetCategoryFormType
): ApiResponse<AssetCategory> => {
  let response;
  if (category.id)
    response = await assetCategoryApi.update(category);
  else
    response = await assetCategoryApi.create(category);

  if (response.success)
    revalidateTag("categories");

  return response;
}

export const deleteAssetCategory = async (
  id: number
): ApiResponse<string> => {
  const response = await assetCategoryApi.delete(id);

  if (response.success)
    revalidateTag("categories");

  return response;
}
