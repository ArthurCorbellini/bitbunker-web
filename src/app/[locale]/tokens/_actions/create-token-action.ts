"use server";

import { revalidatePath } from "next/cache";

import { tokenApi } from "@/lib/api/token-api";
import { CustomFormState } from "@/lib/types/custom-form-state-type";
import { TokenSchema } from "@/lib/types/token-type";
import { ApiErrorCode, convertResponseError } from "@/lib/util/api-util";
import { buildClientError, buildInternalServerError, buildServerError, buildServerSuccess, validateFormData } from "@/lib/util/form-util";

export const createToken = async (
  prevState: CustomFormState | null,
  formData: FormData
): Promise<CustomFormState> => {
  const validation = validateFormData({ schema: TokenSchema, formData });
  if (!validation.success)
    return buildClientError(validation.error);

  const response = await tokenApi.createToken(validation.data);
  if (response.success) {
    revalidatePath("/tokens", "layout");
    return buildServerSuccess("Token saved successfully!");
  }

  const error = convertResponseError(response);
  if (ApiErrorCode.RESOURCE_ALREADY_EXISTS === error)
    return buildServerError("Token already exists with the given UCID.");

  return buildInternalServerError();
}
