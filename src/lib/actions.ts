"use server";

import { Token } from "./interfaces";
import { TokenSchema } from "./schemas";
import { validateFormData } from "./utils";

export const createToken = async (prevState: any, formData: FormData) => {
  try {
    validateFormData({ schema: TokenSchema, formData });
  } catch (err) {
    return err;
  }

  const token: Token = {
    ucid: Number(formData.get("ucid")),
    name: formData.get("name") as string,
    symbol: formData.get("symbol") as string,
    classification: formData.get("classification") as string
  }

  const response = await fetch("http://localhost:9000/token", { // TODO pensar numa forma de gerenciar a url
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(token),
  });

  const res = await response.json();

  return res;
}
