export interface Alert {
  severity: "info" | "warning" | "error";
  title?: string;
  message: string;
}

export interface Token {
  ucid: number,
  name: string,
  symbol: string,
  classification: string
}