import { z } from "zod";
import { AssetCategoryFormSchema } from "../zod/schemas";

export interface AssetCategory {
  id: number;
  name: string;
  recommendedPercentage: number;
}

export type AssetCategoryFormType = z.infer<typeof AssetCategoryFormSchema>;
