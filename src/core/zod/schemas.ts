import z from "zod";

export const CreateAssetCategorySchema = z.object({
  name: z.string().min(1),
  recommendedPercentage: z.number(),
});
