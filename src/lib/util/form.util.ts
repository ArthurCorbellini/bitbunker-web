import { ZodError, ZodTypeAny } from "zod";
import { CustomFormState, Toast } from "../interfaces";

export const urlRoot = process.env.API_URL;

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

  return { success: false, clientError: formErrors };
};

export const buildServerError = (toast: Toast): CustomFormState => {
  return { success: false, serverError: toast };
}

export const buildDefaultServerError = (): CustomFormState => {
  return buildServerError({
    severity: "error",
    message: "Internal server error. Please try again later."
  });
}

const formDataToObject = (formData: FormData): { [key: string]: string | File } => {
  const obj: { [key: string]: string | File } = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
};
