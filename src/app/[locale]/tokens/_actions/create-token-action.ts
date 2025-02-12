"use server";

import { revalidatePath } from "next/cache";

import { tokenApi } from "@/lib/api/token-api";
import { CustomFormState } from "@/lib/types/custom-form-state-type";
import { getTokenSchema } from "@/lib/types/token-type";
import { ApiErrorCode, convertResponseError } from "@/lib/util/api-util";
import { buildClientError, buildInternalServerError, buildServerSuccess, buildServerWarning, validateFormData } from "@/lib/util/form-util";
import { getTranslations } from "next-intl/server";

export const createToken = async (
  prevState: CustomFormState | null,
  formData: FormData
): Promise<CustomFormState> => {
  const t = await getTranslations("CreateToken");

  const validation = await validateFormData({ schemaFunction: getTokenSchema, formData });
  if (!validation.success)
    return buildClientError(validation.error);

  const response = await tokenApi.createToken(validation.data);
  if (response.success) {
    revalidatePath("/tokens", "layout");
    return buildServerSuccess(t("tokenSavedSuccessfully"));
  }

  const error = convertResponseError(response);
  if (ApiErrorCode.RESOURCE_ALREADY_EXISTS === error)
    return buildServerWarning(t("tokenAlreadyExists"));

  return buildInternalServerError();
}
