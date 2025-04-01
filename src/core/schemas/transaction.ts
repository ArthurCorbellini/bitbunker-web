import { useTranslations } from "next-intl";
import { z } from "zod";

export const useSchema = () => {
  const tz = useTranslations("zodErrors");

  const SourceTargetSchema = z.object({
    assetId: z.string().min(1, tz("notEmpty")),
    amount: z.number().nonnegative(tz("mustBePositiveValue")),
    unitPrice: z.number().nonnegative(tz("mustBePositiveValue")),
    totalValue: z.number().nonnegative(tz("mustBePositiveValue"))
  });

  const BuyAndSellFormSchema = z.object({
    dateTime: z.date(),
    notes: z.string(),
    buy: SourceTargetSchema,
    sell: SourceTargetSchema,
  });

  return {
    SourceTargetSchema,
    BuyAndSellFormSchema,
  };
}

export type BuyAndSellFormType = z.infer<ReturnType<typeof useSchema>["BuyAndSellFormSchema"]>;
