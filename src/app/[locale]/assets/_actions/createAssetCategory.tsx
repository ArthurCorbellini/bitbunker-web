"use server"

import { AssetCategoryService } from "@/core/services/AssetCategoryService";
import { ApiResponse } from "@/core/types/api";
import { revalidateTag } from "next/cache";
import { CreateAssetCategoryFormType } from "../_hooks/useSchema";

export const createAssetCategory = async (
  asset: CreateAssetCategoryFormType
): ApiResponse => {

  const response = await AssetCategoryService.createAssetCategory(asset);
  if (response.success)
    revalidateTag("createAssetCategory");

  return response;
}
