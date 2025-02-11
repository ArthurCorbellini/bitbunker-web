import { CustomFormState } from "@/lib/types/custom-form-state-type";
import { ZodError, ZodTypeAny } from "zod";
import { errorToast, successToast, warningToast } from "./toast-util";

export const validateFormData = ({ schema, formData }: {
  schema: ZodTypeAny;
  formData: FormData;
}) => {
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

export const buildServerError = (message: string): CustomFormState => {
  const toast = warningToast(message);
  return { toast };
}

export const buildInternalServerError = (): CustomFormState => {
  const toast = errorToast("Internal server error. Please try again later.");
  return { toast };
}

const formDataToObject = (formData: FormData): { [key: string]: string | File } => {
  const obj: { [key: string]: string | File } = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
};
