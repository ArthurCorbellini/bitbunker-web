import { z } from "zod";
import { getOrderSchema } from "../schemas/order-schema";
import { Asset } from "./asset-type";

export interface Order {
  id: number;
  asset: Asset;
  type: "DEPOSIT" | "BUY" | "SELL";
  quantity: number;
  brlQuantity: number;
  notes?: string;
}

export interface FetchOrdersResponse {
  success: boolean;
  data?: Order[];
  error?: string;
}

export type CreateOrderRequest = z.infer<ReturnType<typeof getOrderSchema>>;

export interface CreateOrderResponse {
  success: boolean;
  data?: string;
  error?: string;
}
