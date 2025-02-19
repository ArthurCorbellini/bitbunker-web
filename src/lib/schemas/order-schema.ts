import { z, ZodTypeAny } from "zod";
import { getAssetSchema } from "./asset-schema";

export const getOrderSchema = (t: (key: string) => string): ZodTypeAny => {
  return z.object({
    id: z
      .string()
      .nonempty(t("notEmpty"))
      .transform((val) => Number(val))
      .refine((val) => Number.isInteger(val), t("mustBeNumber"))
      .refine((val) => val > 0, t("mustBePositiveNumber")),
    asset: getAssetSchema(t),
    type: z
      .string()
      .nonempty(t("notEmpty")),
    quantity: z
      .string()
      .nonempty(t("notEmpty"))
      .transform((val) => Number(val))
      .refine((val) => val > 0, t("mustBePositiveNumber")),
    brlQuantity: z
      .string()
      .nonempty(t("notEmpty"))
      .transform((val) => Number(val))
      .refine((val) => val > 0, t("mustBePositiveNumber")),
    notes: z
      .string()
      .max(255, `${t("lengthLessThan")} 255`),
  });
}
