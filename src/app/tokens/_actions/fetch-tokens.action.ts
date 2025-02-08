"use server"

import { tokenApi } from "@/lib/api/token.api";
import { Token } from "@/lib/types/token.type";
import { convertResponseData } from "@/lib/util/api.util";

export const fetchTokens = async (): Promise<Token[]> => {
  const response = await tokenApi.fetchTokens();
  if (response.ok)
    return await convertResponseData(response);

  throw new Error('Failed to fetch Tokens.');
}