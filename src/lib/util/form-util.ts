import { CustomFormState } from "@/lib/types/custom-form-state-type";
import { getTranslations } from "next-intl/server";
import { ZodError, ZodTypeAny } from "zod";
import { errorToast, successToast, warningToast } from "./toast-util";

export const validateFormData = async ({ schemaFunction, formData }: {
  schemaFunction: (t: (key: string) => string) => ZodTypeAny;
  formData: FormData;
}) => {
  const t = await getTranslations("errors");
  const schema = schemaFunction(t);
  return schema.safeParse(formDataToObject(formData));
};

export const buildClientError = (err: ZodError): CustomFormState => {
  const formErrors = err.errors.reduce((acc, error) => {
    const pathKey = error.path.join('.');

    if (!acc[pathKey])
      acc[pathKey] = [];

    acc[pathKey].push(error.message);

    return acc;
  }, {} as Record<string, string[]>);

  return { formErrors };
};

export const buildServerSuccess = (message: string): CustomFormState => {
  const toast = successToast(message);
  return { toast };
}

export const buildServerWarning = (message: string): CustomFormState => {
  const toast = warningToast(message);
  return { toast };
}

export const buildInternalServerError = async (): Promise<CustomFormState> => {
  const t = await getTranslations("errors");
  const toast = errorToast(t("internalServerErrorMessage"));
  return { toast };
}

const formDataToObject = (formData: FormData): { [key: string]: string | File } => {
  const obj: { [key: string]: string | File } = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
};
