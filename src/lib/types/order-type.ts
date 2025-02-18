import { Asset } from "./asset-type";

export interface Order {
  id: number;
  asset: Asset;
  type: "DEPOSIT" | "BUY" | "SELL";
  quantity: number;
  brlQuantity: number;
  notes?: string;
}
