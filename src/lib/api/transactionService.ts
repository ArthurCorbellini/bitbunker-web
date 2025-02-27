import { CreateRequest, CreateResponse, FetchResponse } from "../types/transactions";

export const transactionService = {
  fetch: async (): Promise<FetchResponse> => {
    const response: FetchResponse = {
      success: true,
      data: [
        {
          id: 1,
          asset: {
            id: 1,
            symbol: "BTC",
            name: "Bitcoin",
          },
          type: "BUY",
          amount: 2,
          unitPrice: 90000,
          totalValue: 180000,
          date: "2024-02-26T10:30:00",
          notes: "",
        },
        {
          id: 2,
          asset: {
            id: 1,
            symbol: "BTC",
            name: "Bitcoin",
          },
          type: "BUY",
          amount: 3,
          unitPrice: 80000,
          totalValue: 240000,
          date: "2024-02-26T10:30:00",
          notes: "",
        },
        {
          id: 3,
          asset: {
            id: 2,
            symbol: "BRL",
            name: "Real",
          },
          type: "DEPOSIT",
          amount: 20000,
          unitPrice: 0.17,
          totalValue: 3400,
          date: "2024-02-26T10:30:00",
          notes: "",
        },
      ]
    }

    return { success: true, data: response.data };
  },

  create: async (payload: CreateRequest): Promise<CreateResponse> => {
    return { success: true, data: "success" };
  },

  // fetchOrders: async (): Promise<FetchOrdersResponse> => {
  //   const response = await httpClient.get<Order[]>("/order");

  //   if (response.success) {
  //     return { success: true, data: response.data };
  //   }

  //   const error = convertResponseError(response);
  //   const t = await getTranslations("apiErrors");
  //   if (ApiErrorCode.INTERNAL_SERVER_ERROR === error)
  //     return { success: false, error: t("internalServerError") };

  //   return { success: false, error: t("unmappedError") };
  // },

  // createOrder: async (payload: CreateOrderRequest): Promise<CreateOrderResponse> => {
  //   const response = await httpClient.post<CreateOrderRequest, string>(
  //     "/order",
  //     payload
  //   );

  //   if (response.success) {
  //     const t = await getTranslations("orderApi");
  //     return { success: true, data: t("createOrder.success") };
  //   }

  //   const error = convertResponseError(response);
  //   const t = await getTranslations("apiErrors");
  //   if (ApiErrorCode.INTERNAL_SERVER_ERROR === error)
  //     return { success: false, error: t("internalServerError") };

  //   return { success: false, error: t("unmappedError") };
  // },
}