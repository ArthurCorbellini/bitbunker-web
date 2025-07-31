"use server"

import { revalidateTag } from "next/cache";

import { TransactionApi } from "@/core/api/transaction.api";
import { ApiPayload } from "@/core/types/api";
import { TransactionFormType } from "../_hooks/useSchema";

export const createTransaction = async (
  transaction: TransactionFormType,
  type: "deposit" | "withdrawal",
): Promise<ApiPayload> => {
  const upperType = type.toUpperCase() as Uppercase<typeof type>;
  const response = await TransactionApi.createTransaction({ type: upperType, ...transaction });
  if (response.success)
    revalidateTag("createTransaction");

  return response;
}