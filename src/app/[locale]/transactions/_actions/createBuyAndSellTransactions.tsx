"use server"

import { revalidateTag } from "next/cache";

import { TransactionService } from "@/core/services/TransactionService";
import { ApiResponse } from "@/core/types/api";
import { BuyAndSellFormType } from "../_hooks/useSchema";

export const createBuyAndSellTransactions = async (
  transaction: BuyAndSellFormType
): Promise<ApiResponse> => {
  const response = await TransactionService.createBuyAndSellTransactions(transaction);
  if (response.success)
    revalidateTag("createBuyAndSellTransactions");

  return response;
}
