"use server"

import { tokenApi } from "@/global/api/token.api";
import { Token } from "@/global/types/token.type";
import { convertResponseData } from "@/global/util/api.util";

export const fetchTokens = async (): Promise<Token[]> => {
  const response = await tokenApi.fetchTokens();
  if (response.ok)
    return await convertResponseData(response);

  throw new Error('Failed to fetch Tokens.');
}