import { z } from "zod";

export const TokenSchema = z.object({
  ucid: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => Number.isInteger(val), "Must be a number")
    .refine((val) => val > 0, "Must be a positive number"),
  name: z
    .string()
    .nonempty("Name can not be empty")
    .min(1, "The length of the token name should be between 1 and 30")
    .max(30, "The length of the token name should be between 1 and 30"),
  symbol: z
    .string()
    .nonempty("Symbol can not be empty")
    .min(1, "The length of the token symbol should be between 1 and 10")
    .max(10, "The length of the token symbol should be between 1 and 10"),
  classification: z
    .enum(["TIER_S", "TIER_A", "TIER_B", "TIER_C", "TIER_D", "TIER_E", "NO_TIER"])
});
