"use server"

import { revalidateTag } from "next/cache";

import { AssetService } from "@/core/services/AssetService";
import { ApiResponse } from "@/core/types/api";
import { CreateAsset } from "@/core/types/asset";

export const createAsset = async (
  asset: CreateAsset
): Promise<ApiResponse> => {
  const response = await AssetService.createAsset(asset);
  if (response.success)
    revalidateTag("createAsset");

  return response;
}
