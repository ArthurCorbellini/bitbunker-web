"use server"

import { revalidateTag } from "next/cache";

import { assetCategoryApi } from "@/core/api/asset-category.api";
import { ApiResponse } from "@/core/types/api";
import { CreateAssetCategory } from "@/core/types/asset-category";

export const createAssetCategory = async (
  category: CreateAssetCategory
): ApiResponse => {

  const normalizedCategory = {
    ...category,
    recommendedPercentage: category.recommendedPercentage / 100,
  };

  const response = await assetCategoryApi.create(normalizedCategory);
  if (response.success)
    revalidateTag("createAssetCategory");

  return response;
}
