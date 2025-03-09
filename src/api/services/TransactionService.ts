import { CreateRequest, CreateResponse, FetchResponse } from "../types/transaction-types";

export class TransactionService {
  static async create(payload: CreateRequest): Promise<CreateResponse> {
    return { success: true, data: "success" };
  }

  static async fetchAll(): Promise<FetchResponse> {
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
  }
}
