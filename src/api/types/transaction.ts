
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
  date: string,
  notes: string,
}

export interface CreateTransaction {
  date?: Date,
  notes?: string,
  source: SourceTargetTransaction,
  target: SourceTargetTransaction,
}

export interface SourceTargetTransaction {
  assetId: string,
  amount: number,
  unitPrice: number,
  totalValue: number,
}
