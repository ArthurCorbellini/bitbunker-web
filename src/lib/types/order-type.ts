import { Token } from "./token-type";

export interface Order {
  id: number;
  token: Token;
  type: "BUY" | "SELL";
  quantity: number;
  fiatCurrencyMoved: number;
  notes?: string;
}
