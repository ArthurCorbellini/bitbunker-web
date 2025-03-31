
export interface Transaction {
  id: number,
  asset: {
    id: number,
    symbol: string,
    name: string,
  },
  type: "BUY" | "SELL" | "WITHDRAWAL" | "DEPOSIT",
  amount: number,
  unitPrice: number,
  totalValue: number,
  dateTime: string,
  notes: string,
}

export interface CreateBuyAndSellTransactions {
  dateTime?: Date,
  notes?: string,
  buy: SourceTargetTransaction,
  sell: SourceTargetTransaction,
}

export interface SourceTargetTransaction {
  assetId: string,
  amount: number,
  unitPrice: number,
  totalValue: number,
}
