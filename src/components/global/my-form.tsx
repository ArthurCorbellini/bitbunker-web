import { ReactNode } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Form } from "../ui/form";

interface MyFormProps<T extends FieldValues> {
  children: ReactNode,
  form: UseFormReturn<T>,
  onSubmit: (formData: T) => void,
}

export const MyForm = <T extends FieldValues>({
  children,
  form,
  onSubmit
}: MyFormProps<T>) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {children}
      </form>
    </Form>
  );
}