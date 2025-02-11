import { CustomFormState } from "@/lib/types/custom-form-state-type";
import { Toast } from "@/lib/types/toast-type";
import { ZodError, ZodTypeAny } from "zod";

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

export const buildServerSuccess = (message: string) => {
  return buildServerResponse({ title: "Huhuu!", severity: "success", message });
}

export const buildServerError = (message: string) => {
  return buildServerResponse({ title: "Oops!", severity: "warning", message });
}

export const buildInternalServerError = () => {
  return buildServerResponse({
    title: "Outch!",
    severity: "error",
    message: "Internal server error. Please try again later."
  });
}

const buildServerResponse = (toast: Toast) => {
  return { toast };
}

const formDataToObject = (formData: FormData): { [key: string]: string | File } => {
  const obj: { [key: string]: string | File } = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
};
