import { Toast } from "./toast.interface"

export interface CustomFormState {
  formErrors?: {
    [key: string]: string[]
  }
  serverResponse?: Toast
}
