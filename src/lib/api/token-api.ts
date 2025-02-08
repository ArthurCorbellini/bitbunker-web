import { Token } from "../types/token-type";
import { urlRoot } from "../util/form-util";

export const tokenApi = {
  createToken: async (data: Token): Promise<Response> => {
    return await fetch(urlRoot + "/token", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },

  fetchTokens: async (): Promise<Response> => {
    return await fetch(urlRoot + "/token");
  }
}