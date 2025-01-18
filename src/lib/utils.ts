import { ZodError, ZodObject } from "zod";

export const validateFormData = ({ schema, formData }: {
  schema: ZodObject<any>;
  formData: FormData;
}) => {
  try {
    schema.parse(formDataToObject(formData));
  } catch (err) {
    if (err instanceof ZodError)
      throw err.errors.reduce((acc, error) => {
        const pathKey = error.path.join('.');
        if (!acc[pathKey])
          acc[pathKey] = [];
        acc[pathKey].push(error.message);
        return acc;
      }, {} as Record<string, string[]>);
    throw ["Unknown error occurred"];
  }
};

const formDataToObject = (formData: FormData): { [key: string]: any } => {
  const obj: { [key: string]: any } = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
};
