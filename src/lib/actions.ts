"use server";

import { redirect } from "next/navigation";
import { TokenSchema } from "./schemas";
import { convertZodError, urlRoot, validateFormData } from "./utils";

export const createToken = async (prevState: any, formData: FormData) => {
  const validation = validateFormData({ schema: TokenSchema, formData });

  if (!validation.success)
    return convertZodError(validation.error);

  const response = await fetch(urlRoot + "/token", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validation.data),
  });

  if (!response.ok)
    // mostrar ao usuário o erro do back, talvez apontar para a error.tsx 
    //   se o token já existir com o id inserido, vai dar voltar um 400
    //   talvez mostrar os 4xx ao usuário no modal e o resto mandar para a error.tsx
    throw Error(JSON.stringify(await response.json())); // to-do better error handling  

  redirect("/tokens");
}
