import { Asset } from "./asset-type";

export interface Order {
  id: number;
  asset: Asset;
  type: "BUY" | "SELL";
  quantity: number;
  fiatCurrencyMoved: number;
  notes?: string;
}
