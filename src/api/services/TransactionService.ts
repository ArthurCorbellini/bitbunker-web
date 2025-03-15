import { ApiResponse } from "../core/api-types";
import { httpClient } from "../core/api-utils";
import { CreateRequest, Transaction } from "../types/transaction";

export class TransactionService {
  static async fetchAll(): Promise<ApiResponse<Transaction[]>> {
    return httpClient.get("/transaction");
  }

  static async create(payload: CreateRequest): Promise<ApiResponse> {
    return httpClient.post("/transaction", payload);
  }
}
