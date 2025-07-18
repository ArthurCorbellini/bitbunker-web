import { ApiResponse } from "../types/api";
import { CreateBuyAndSellTransactions, CreateTransaction, Transaction } from "../types/transaction";
import { BaseService, NextFetchOptions } from "./base/BaseService";

export class TransactionService extends BaseService {

  static async fetchTransactions(
    next?: NextFetchOptions
  ): Promise<ApiResponse<Transaction[]>> {
    return this.get("/transaction", next);
  }

  static async createBuyAndSellTransactions(
    payload: CreateBuyAndSellTransactions
  ): Promise<ApiResponse> {
    return this.post("/transaction/buy-and-sell", payload);
  }

  static async createTransaction(
    payload: CreateTransaction
  ): Promise<ApiResponse> {
    return this.post("/transaction", payload);
  }
}
