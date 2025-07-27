"use server"

import { revalidateTag } from "next/cache";

import { AssetCategoryService } from "@/core/services/AssetCategoryService";
import { ApiResponse } from "@/core/types/api";
import { CreateAssetCategory } from "@/core/types/asset-category";

export const createAssetCategory = async (
  asset: CreateAssetCategory
): ApiResponse => {

  const response = await AssetCategoryService.createAssetCategory(asset);
  if (response.success)
    revalidateTag("createAssetCategory");

  return response;
}
