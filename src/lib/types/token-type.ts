import { z, ZodTypeAny } from "zod";

export const getTokenSchema = (t: (key: string) => string): ZodTypeAny => {
  return z.object({
    ucid: z
      .string()
      .nonempty(t("notEmpty"))
      .transform((val) => Number(val))
      .refine((val) => Number.isInteger(val), t("mustBeNumber"))
      .refine((val) => val > 0, t("mustBePositiveNumber")),
    name: z
      .string()
      .nonempty(t("notEmpty"))
      .max(30, `${t("lengthLessThan")} 30`),
    symbol: z
      .string()
      .nonempty(t("notEmpty"))
      .max(10, `${t("lengthLessThan")} 10`),
    classification: z
      .string()
      .nonempty(t("notEmpty"))
  });
}

export interface Token {
  ucid: number;
  name: string;
  symbol: string;
  classification: string;
}
