"use server";

import { assetApi } from "@/lib/api/asset-api";
import { Asset } from "@/lib/types/asset-type";

export const fetchAssets = async (): Promise<Asset[]> => {
  const response = await assetApi.fetchAssets();
  if (response.success)
    return response.data;

  throw new Error('Failed to fetch Assets.'); // to-do melhorar tratamento de erro
}