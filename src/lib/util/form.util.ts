import { ZodError, ZodObject } from "zod";
import { Alert } from "../interfaces";

export const urlRoot = process.env.API_URL;

export const validateFormData = ({ schema, formData }: {
  schema: ZodObject<any>;
  formData: FormData;
}) => {
  return schema.safeParse(formDataToObject(formData));
};

export const convertFormError = (err: ZodError) => {
  return err.errors.reduce((acc, error) => {
    const pathKey = error.path.join('.');

    if (!acc[pathKey])
      acc[pathKey] = [];

    acc[pathKey].push(error.message);

    return acc;
  }, {} as Record<string, string[]>);
};

export const convertFormAlert = ({ severity, title, message }: {
  severity: "info" | "warning" | "error",
  title?: string,
  message: string
}): {
  _alert: Alert
} => {
  return { _alert: { severity, title, message } }
}

const formDataToObject = (formData: FormData): { [key: string]: any } => {
  const obj: { [key: string]: any } = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
};
