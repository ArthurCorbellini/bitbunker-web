export interface CustomFormState {
  formErrors?: {
    [key: string]: string[]
  }
  serverResponse?: Toast
}

export interface Toast {
  severity: "success" | "info" | "warning" | "error";
  message: string;
  title?: string;
}

export interface Token {
  ucid: number,
  name: string,
  symbol: string,
  classification: string
}