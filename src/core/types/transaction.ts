import { BuyAndSellFormType } from "@/app/[locale]/transactions/_hooks/useSchema";

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

export interface CreateBuyAndSellTransactions extends BuyAndSellFormType { };
