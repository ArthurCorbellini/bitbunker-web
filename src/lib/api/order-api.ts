import { Order } from "../types/order-type";
import { ApiResponse, httpClient } from "../util/api-util";

export const orderApi = {
  fetchOrders: async (): Promise<ApiResponse<Order[]>> => {
    return httpClient.get("/order");
  }
}