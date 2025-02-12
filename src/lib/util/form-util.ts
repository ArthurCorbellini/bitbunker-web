import { CustomFormState } from "@/lib/types/custom-form-state-type";
import { getTranslations } from "next-intl/server";
import { ZodError, ZodTypeAny } from "zod";
import { errorToast, successToast, warningToast } from "./toast-util";

export const validateFormData = async ({ schemaFunction, data }: {
  schemaFunction: (t: (key: string) => string) => ZodTypeAny;
  data: { [key: string]: string | File };
}) => {
  const t = await getTranslations("errors");
  const schema = schemaFunction(t);
  return schema.safeParse(data);
};

export const buildClientError = ({ zodError, inputs }: {
  zodError: ZodError,
  inputs: { [key: string]: string | File }
}): CustomFormState => {
  const formErrors = zodError.errors.reduce((acc, error) => {
    const pathKey = error.path.join('.');

    if (!acc[pathKey])
      acc[pathKey] = [];

    acc[pathKey].push(error.message);

    return acc;
  }, {} as Record<string, string[]>);

  return { success: false, formErrors, inputs };
};

export const buildServerSuccess = ({ message, inputs }: {
  message: string;
  inputs?: { [key: string]: string | File }
}): CustomFormState => {
  const toast = successToast(message);
  return { success: true, toast, inputs };
}

export const buildServerWarning = ({ message, inputs }: {
  message: string;
  inputs?: { [key: string]: string | File }
}): CustomFormState => {
  const toast = warningToast(message);
  return { success: false, toast, inputs };
}

export const buildInternalServerError = async ({ inputs }: {
  inputs?: { [key: string]: string | File }
}): Promise<CustomFormState> => {
  const t = await getTranslations("errors");
  const toast = errorToast(t("internalServerErrorMessage"));
  return { success: false, toast, inputs };
}

export const formDataToObject = (formData: FormData): { [key: string]: string | File } => {
  const obj: { [key: string]: string | File } = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
};
