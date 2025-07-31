"use server"

import { revalidateTag } from "next/cache";

import { AssetApi } from "@/core/api/asset.api";
import { ApiPayload } from "@/core/types/api";
import { CreateAssetFormType } from "../[locale]/assets/_hooks/useSchema";

export const createAsset = async (
  asset: CreateAssetFormType
): Promise<ApiPayload> => {
  const response = await AssetApi.createAsset(asset);
  if (response.success)
    revalidateTag("createAsset");

  return response;
}
