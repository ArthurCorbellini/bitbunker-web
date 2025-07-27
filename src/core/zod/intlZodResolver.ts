import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Resolver } from "react-hook-form";
import { z, ZodErrorMap, ZodType } from "zod";

/**
 * Creates a custom resolver for React Hook Form using Zod and next-intl
 * to provide localized error messages.
 *
 * This resolver uses the "formErrors" translation namespace and overrides
 * Zod's default error messages with translated ones based on the error code.
 *
 * Useful in internationalized forms where error messages must adapt to the
 * current locale using next-intl.
 *
 * @template T - A Zod schema type
 * @param schema - The Zod schema to validate the form against
 * @returns A strongly typed React Hook Form resolver for the given schema
 *
 * @example
 * const schema = z.object({
 *   name: z.string().min(3),
 * });
 *
 * const form = useForm<z.infer<typeof schema>>({
 *   resolver: intlZodResolver(schema),
 * });
 *
 * // In your messages/en.json or messages/pt.json:
 * // {
 * //   "formErrors": {
 * //     "too_small": "Minimum {minimum} characters"
 * //   }
 * // }
 *
 * @author Arthur Corbellini
 */
export const intlZodResolver = <T extends ZodType>(
  schema: T
): Resolver<z.infer<T>> => {
  const t = useTranslations("formErrors");

  const errorMap: ZodErrorMap = (issue, ctx) => {
    switch (issue.code) {
      case "too_small":
        return { message: t("too_small", { minimum: String(issue.minimum) }) };
      default:
        return { message: ctx.defaultError };
    }
  };

  return zodResolver(schema, { errorMap });
}
