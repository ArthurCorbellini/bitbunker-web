import { Toast } from "./toast-type";

export interface CustomFormState {
  success: boolean;
  formErrors?: {
    [key: string]: string[]
  }
  toast?: Toast,
  inputs?: {
    [key: string]: string | File
  };
}
