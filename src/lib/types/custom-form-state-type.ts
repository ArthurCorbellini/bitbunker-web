import { Toast } from "./toast-type"

export interface CustomFormState {
  formErrors?: {
    [key: string]: string[]
  }
  toast?: Toast
}
