import { CreateAssetCategoryFormType } from "@/app/[locale]/assets/_hooks/useSchema";

export interface AssetCategory {
  id: number;
  name: string;
  recommendedPercentage: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CreateAssetCategory extends CreateAssetCategoryFormType { };