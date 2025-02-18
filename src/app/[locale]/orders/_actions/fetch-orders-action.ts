"use server";

import { orderApi } from "@/lib/api/order-api";
import { Order } from "@/lib/types/order-type";

export const fetchOrders = async (): Promise<Order[]> => {
  const response = await orderApi.fetchOrders();
  if (response.success)
    return response.data;

  throw new Error('Failed to fetch Orders.'); // to-do melhorar tratamento de erro
}
