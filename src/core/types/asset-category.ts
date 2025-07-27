import { z } from "zod";
import { CreateAssetCategorySchema } from "../zod/schemas";

export interface AssetCategory {
  id: number;
  name: string;
  recommendedPercentage: number;
}

export type CreateAssetCategory = z.infer<typeof CreateAssetCategorySchema>;
