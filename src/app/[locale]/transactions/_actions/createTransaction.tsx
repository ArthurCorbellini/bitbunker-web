"use server"

import { revalidateTag } from "next/cache";

import { TransactionService } from "@/core/services/TransactionService";
import { ApiPayload } from "@/core/types/api";
import { TransactionFormType } from "../_hooks/useSchema";

export const createTransaction = async (
  transaction: TransactionFormType,
  type: "deposit" | "withdrawal",
): Promise<ApiPayload> => {
  const upperType = type.toUpperCase() as Uppercase<typeof type>;
  const response = await TransactionService.createTransaction({ type: upperType, ...transaction });
  if (response.success)
    revalidateTag("createTransaction");

  return response;
}