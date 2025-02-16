
export interface Order {
  // token: Token;
  id: number;
  type: "BUY" | "SELL";
  quantity: number;
  // fiatCurrencyMoved: number;
  notes?: string;
}
