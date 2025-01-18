"use server";

import { Token } from "./interfaces";

export const createToken = async (formData: FormData) => {
  // TODO falta fazer as validações dos campos
  //    > criar alertas para mostrar possíveis erros de validação/salvamento

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
  console.log(res)

  return res;
}
