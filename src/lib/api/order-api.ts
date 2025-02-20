import { getTranslations } from "next-intl/server";
import { CreateOrderRequest, CreateOrderResponse, FetchOrdersResponse, Order } from "../types/order-type";
import { ApiErrorCode, convertResponseError, httpClient } from "../util/api-util";

export const orderApi = {
  fetchOrders: async (): Promise<FetchOrdersResponse> => {
    const response = await httpClient.get<Order[]>("/order");

    if (response.success) {
      return { success: true, data: response.data };
    }

    const error = convertResponseError(response);
    const t = await getTranslations("apiErrors");
    if (ApiErrorCode.INTERNAL_SERVER_ERROR === error)
      return { success: false, error: t("internalServerError") };

    return { success: false, error: t("unmappedError") };
  },

  createOrder: async (payload: CreateOrderRequest): Promise<CreateOrderResponse> => {
    const response = await httpClient.post<CreateOrderRequest, string>(
      "/order",
      payload
    );

    if (response.success) {
      const t = await getTranslations("orderApi");
      return { success: true, data: t("createOrder.success") };
    }

    const error = convertResponseError(response);
    const t = await getTranslations("apiErrors");
    if (ApiErrorCode.INTERNAL_SERVER_ERROR === error)
      return { success: false, error: t("internalServerError") };

    return { success: false, error: t("unmappedError") };
  },
}