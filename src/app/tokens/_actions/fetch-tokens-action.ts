"use server";

import { tokenApi } from "@/lib/api/token-api";
import { Token } from "@/lib/types/token-type";

export const fetchTokens = async (): Promise<Token[]> => {
  const response = await tokenApi.fetchTokens();
  if (response.success)
    return response.data;

  throw new Error('Failed to fetch Tokens.'); // to-do melhorar tratamento de erro
}