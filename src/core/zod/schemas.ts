import z from "zod";

export const AssetCategoryFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  recommendedPercentage: z.number(),
});
