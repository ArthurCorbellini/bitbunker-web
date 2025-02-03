"use server";

import { revalidatePath } from "next/cache";
import { CustomFormState } from "./interfaces";
import { TokenSchema } from "./schemas";
import { ApiErrorCode, convertResponseError } from "./util/api.util";
import { buildClientError, buildInternalServerError, buildServerError, buildServerSuccess, urlRoot, validateFormData } from "./util/form.util";

export const createToken = async (
  prevState: CustomFormState | null,
  formData: FormData
): Promise<CustomFormState> => {
  const validation = validateFormData({ schema: TokenSchema, formData });

  if (!validation.success)
    return buildClientError(validation.error);

  const response = await fetch(urlRoot + "/token", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validation.data),
  });

  if (response.ok) {
    revalidatePath("/tokens", "layout");
    return buildServerSuccess("Token saved successfully!");
  }

  const error = await convertResponseError(response);
  if (ApiErrorCode.RESOURCE_ALREADY_EXISTS === error)
    return buildServerError("Token already exists with the given UCID.");

  return buildInternalServerError();
}
