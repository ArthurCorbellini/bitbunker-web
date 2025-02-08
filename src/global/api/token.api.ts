import { Token } from "../interfaces/token.interface";
import { urlRoot } from "../util/form.util";

export const tokenApi = {
  createToken: async (data: Token) => {
    return await fetch(urlRoot + "/token", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
}