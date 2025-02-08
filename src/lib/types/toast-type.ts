export interface Toast {
  severity: "success" | "info" | "warning" | "error";
  message: string;
  title?: string;
}
