import { useTranslations } from "next-intl";
import { z } from "zod";

export const useSchema = () => {
  const tz = useTranslations("zodErrors");

  const DefaultTransactionSchema = z.object({
    assetId: z.string().min(1, tz("notEmpty")),
    amount: z.number().gt(0, tz("mustBePositiveValue")),
    unitPrice: z.number().gt(0, tz("mustBePositiveValue")),
    totalValue: z.number().gt(0, tz("mustBePositiveValue"))
  });

  const BuyAndSellFormSchema = z.object({
    dateTime: z.date(),
    notes: z.string(),
    buy: DefaultTransactionSchema,
    sell: DefaultTransactionSchema,
  });

  const TransactionFormSchema = z.object({
    dateTime: z.date(),
    notes: z.string(),
  }).merge(DefaultTransactionSchema);

  return {
    TransactionFormSchema,
    BuyAndSellFormSchema,
  };
}

export type BuyAndSellFormType = z.infer<ReturnType<typeof useSchema>["BuyAndSellFormSchema"]>;
export type TransactionFormType = z.infer<ReturnType<typeof useSchema>["TransactionFormSchema"]>;
