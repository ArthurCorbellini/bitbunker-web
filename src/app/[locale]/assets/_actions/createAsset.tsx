"use server"

import { revalidateTag } from "next/cache";

import { AssetService } from "@/core/services/AssetService";
import { ApiResponse } from "@/core/types/api";
import { CreateAssetFormType } from "../_hooks/useSchema";

export const createAsset = async (
  asset: CreateAssetFormType
): Promise<ApiResponse> => {
  const response = await AssetService.createAsset(asset);
  if (response.success)
    revalidateTag("createAsset");

  return response;
}
