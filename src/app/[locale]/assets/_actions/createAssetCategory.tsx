"use server"

import { revalidateTag } from "next/cache";

import { AssetCategoryService } from "@/core/services/AssetCategoryService";
import { ApiResponse } from "@/core/types/api";
import { CreateAssetCategory } from "@/core/types/asset-category";

export const createAssetCategory = async (
  category: CreateAssetCategory
): ApiResponse => {

  const normalizedCategory = {
    ...category,
    recommendedPercentage: category.recommendedPercentage / 100,
  };

  const response = await AssetCategoryService.createAssetCategory(normalizedCategory);
  if (response.success)
    revalidateTag("createAssetCategory");

  return response;
}
