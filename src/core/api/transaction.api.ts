import { ApiPayload } from "../types/api";
import { CreateBuyAndSellTransactions, CreateTransaction, Transaction } from "../types/transaction";
import { Api, NextFetchOptions } from "./base/base.api";

export class TransactionApi extends Api {

  static async fetchTransactions(
    next?: NextFetchOptions
  ): Promise<ApiPayload<Transaction[]>> {
    return this.get("/transaction", next);
  }

  static async createBuyAndSellTransactions(
    payload: CreateBuyAndSellTransactions
  ): Promise<ApiPayload> {
    return this.post("/transaction/buy-and-sell", payload);
  }

  static async createTransaction(
    payload: CreateTransaction
  ): Promise<ApiPayload> {
    return this.post("/transaction", payload);
  }
}
