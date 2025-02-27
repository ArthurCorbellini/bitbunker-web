"use server";

import { assetService } from "@/lib/api/assetService";
import { Asset } from "@/lib/types/asset-type";

export const fetchAssets = async (): Promise<Asset[]> => {
  const response = await assetService.fetch();
  if (response.success)
    return response.data;

  throw new Error('Failed to fetch Assets.'); // to-do melhorar tratamento de erro
}