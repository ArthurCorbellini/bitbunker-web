import { useTranslations } from "next-intl";
import { z } from "zod";

export const useSchema = () => {
  const tz = useTranslations("zodErrors");

  const FormSchema = z.object({
    ucid: z.string().min(1, tz("notEmpty")),
    name: z.string().min(1, tz("notEmpty")),
    symbol: z.string().min(1, tz("notEmpty")),
    type: z.string().min(1, tz("notEmpty")),
    tier: z.string().min(1, tz("notEmpty")),
  });

  return {
    FormSchema
  };
}

export type FormType = z.infer<ReturnType<typeof useSchema>["FormSchema"]>;
