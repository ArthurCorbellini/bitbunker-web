import { useTranslations } from "next-intl";
import { z } from "zod";

export const useSchema = () => {
  const tz = useTranslations("zodErrors");

  const CreateAssetFormSchema = z.object({
    ucid: z.string().min(1, tz("notEmpty")),
    name: z.string().min(1, tz("notEmpty")),
    symbol: z.string().min(1, tz("notEmpty")),
    type: z.string().min(1, tz("notEmpty")),
    tier: z.string().min(1, tz("notEmpty")),
  });

  const CreateAssetCategoryFormSchema = z.object({
    name: z.string().min(1, tz("notEmpty")),
    recommendedPercentage: z.number(),
  });

  return {
    CreateAssetFormSchema,
    CreateAssetCategoryFormSchema,
  };
}

export type CreateAssetFormType = z.infer<ReturnType<typeof useSchema>["CreateAssetFormSchema"]>;
export type CreateAssetCategoryFormType = z.infer<ReturnType<typeof useSchema>["CreateAssetCategoryFormSchema"]>;