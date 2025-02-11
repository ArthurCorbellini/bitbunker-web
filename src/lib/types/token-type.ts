import { z } from "zod";

export const TokenSchema = z.object({
  ucid: z
    .string()
    .nonempty("Can not be empty")
    .transform((val) => Number(val))
    .refine((val) => Number.isInteger(val), "Must be a number")
    .refine((val) => val > 0, "Must be a positive number"),
  name: z
    .string()
    .nonempty("Can not be empty")
    .max(30, "Length should be less than 30"),
  symbol: z
    .string()
    .nonempty("Can not be empty")
    .max(10, "Length should be less than 10"),
  classification: z
    .string()
    .nonempty("Can not be empty")
});

export type Token = z.infer<typeof TokenSchema>;