import { ApiResponse } from "../core/api-types";
import { httpClient } from "../core/api-utils";
import { CreateRequest, Transaction } from "../types/transaction-types";

export class TransactionService {
  static async create(payload: CreateRequest): Promise<ApiResponse> {
    return httpClient.post("/transaction", payload);
  }

  static async fetchAll(): Promise<ApiResponse<Transaction[]>> {
    const response: ApiResponse<Transaction[]> = {
      success: true,
      apiPath: "",
      timestamp: "",
      error: null,
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

    return response;
  }
}
