
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

export interface FetchResponse {
  success: boolean;
  data?: Transaction[];
  error?: string;
}

export interface CreateRequest {

}

export interface CreateResponse {

}