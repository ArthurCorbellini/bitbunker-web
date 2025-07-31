"use server"

import { revalidateTag } from "next/cache";

import { TransactionApi } from "@/core/api/transaction.api";
import { ApiPayload } from "@/core/types/api";
import { BuyAndSellFormType } from "../_hooks/useSchema";

export const createBuyAndSellTransactions = async (
  transaction: BuyAndSellFormType
): Promise<ApiPayload> => {
  const response = await TransactionApi.createBuyAndSellTransactions(transaction);
  if (response.success)
    revalidateTag("createBuyAndSellTransactions");

  return response;
}
