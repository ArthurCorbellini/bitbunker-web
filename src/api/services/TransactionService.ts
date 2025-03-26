import { ApiResponse } from "../core/types";
import { CreateTransaction, Transaction } from "../types/transaction";
import { BaseService } from "./base/BaseService";

export class TransactionService extends BaseService {
  static async fetchTransactions(): Promise<ApiResponse<Transaction[]>> {
    return this.get("/transaction");
  }

  static async createTransaction(payload: CreateTransaction): Promise<ApiResponse> {
    return this.post("/transaction", payload);
  }
}
