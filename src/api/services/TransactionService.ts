import { ApiResponse } from "../core/api-types";
import { CreateRequest, Transaction } from "../types/transaction";
import { BaseService } from "./base/BaseService";

export class TransactionService extends BaseService {
  static async fetchTransactions(): Promise<ApiResponse<Transaction[]>> {
    return this.get("/transaction");
  }

  static async createTransaction(payload: CreateRequest): Promise<ApiResponse> {
    return this.post("/transaction", payload);
  }
}
