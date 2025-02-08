"use server";

import { revalidatePath } from "next/cache";

import { tokenApi } from "@/global/api/token.api";
import { CustomFormState } from "@/global/interfaces/custom-form-state.interfaces";
import { TokenSchema } from "@/global/schemas/token.schema";
import { ApiErrorCode, convertResponseError } from "@/global/util/api.util";
import { buildClientError, buildInternalServerError, buildServerError, buildServerSuccess, validateFormData } from "@/global/util/form.util";

export const createToken = async (
  prevState: CustomFormState | null,
  formData: FormData
): Promise<CustomFormState> => {
  const validation = validateFormData({ schema: TokenSchema, formData });
  if (!validation.success)
    return buildClientError(validation.error);

  const response = await tokenApi.createToken(validation.data);
  if (response.ok) {
    revalidatePath("/tokens", "layout");
    return buildServerSuccess("Token saved successfully!");
  }

  const error = await convertResponseError(response);
  if (ApiErrorCode.RESOURCE_ALREADY_EXISTS === error)
    return buildServerError("Token already exists with the given UCID.");

  return buildInternalServerError();
}
