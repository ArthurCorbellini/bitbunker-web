import { orderApi } from "@/lib/api/order-api";
import { OrderDataTable } from "./OrderDataTable";

export const OrderList = async () => {
  const response = await orderApi.fetchOrders();

  if (!response.success) {
    //to-do notificação
    response.error
  }

  if (response.data) {
    return (
      <OrderDataTable data={response.data} />
    );
  }
}