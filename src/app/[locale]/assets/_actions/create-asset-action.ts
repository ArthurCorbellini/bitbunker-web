"use server";

import { revalidatePath } from "next/cache";

import { assetApi } from "@/lib/api/asset-api";
import { getAssetSchema } from "@/lib/types/asset-type";
import { CustomFormState } from "@/lib/types/custom-form-state-type";
import { ApiErrorCode, convertResponseError } from "@/lib/util/api-util";
import { buildClientError, buildInternalServerError, buildServerSuccess, buildServerWarning, formDataToObject, validateFormData } from "@/lib/util/form-util";
import { getTranslations } from "next-intl/server";

export const createAsset = async (
  prevState: CustomFormState | null,
  formData: FormData
): Promise<CustomFormState> => {
  const t = await getTranslations("CreateAsset");
  const inputs = formDataToObject(formData)

  const validation = await validateFormData({ schemaFunction: getAssetSchema, data: inputs });
  if (!validation.success)
    return buildClientError({
      zodError: validation.error,
      inputs
    });

  const response = await assetApi.createAsset(validation.data);
  if (response.success) {
    revalidatePath("/assets", "layout");
    return buildServerSuccess({
      message: t("assetSavedSuccessfully")
    });
  }

  const error = convertResponseError(response);
  if (ApiErrorCode.RESOURCE_ALREADY_EXISTS === error)
    return buildServerWarning({
      message: t("assetAlreadyExists"),
      inputs
    });

  return buildInternalServerError({
    inputs
  });
}
