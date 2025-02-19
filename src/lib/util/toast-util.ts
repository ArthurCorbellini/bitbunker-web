import { Toast } from "../types/toast-type";

export const successToast = (message: string): Toast => {
  return { title: "Huhuu!", severity: "success", message };
}

export const infoToast = (message: string): Toast => {
  return { title: "Hey!", severity: "info", message };
}

export const warningToast = (message: string): Toast => {
  return { title: "Oops!", severity: "warning", message };
}

export const errorToast = (message: string): Toast => {
  return { title: "Outch!", severity: "error", message };
}
