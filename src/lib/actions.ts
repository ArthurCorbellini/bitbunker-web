"use server";

import { redirect } from "next/navigation";
import { TokenSchema } from "./schemas";
import { ApiErrorCode, convertResponseError } from "./util/api.util";
import { convertFormAlert, convertFormError, urlRoot, validateFormData } from "./util/form.util";

export const createToken = async (prevState: any, formData: FormData) => {
  const validation = validateFormData({ schema: TokenSchema, formData });

  if (!validation.success)
    return convertFormError(validation.error);

  const response = await fetch(urlRoot + "/token", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validation.data),
  });

  if (response.ok)
    redirect("/tokens");

  const error = await convertResponseError(response);
  if (ApiErrorCode.RESOURCE_ALREADY_EXISTS === error)
    return convertFormAlert({
      severity: "warning",
      message: "Token already exists with the given UCID."
    });

  convertFormAlert({
    severity: "error",
    message: "Internal server error. Please try again later."
  });
}
