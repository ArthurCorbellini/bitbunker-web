"use client"

import { useTranslations } from "next-intl"
import { createContext, ReactNode, useContext, useState } from "react"

import { useToast } from "@/components/generic/hooks/useToast"
import { TransactionService } from "@/core/services/TransactionService"
import { Transaction } from "@/core/types/transaction"
import { BuyAndSellFormType, TransactionFormType } from "./useSchema"

interface Props {
  transactions: { data: Transaction[], isLoading: boolean },
  loadTransactions: () => void,
  createBuyAndSellTransactions: (transaction: BuyAndSellFormType) => void,
  createTransaction: (transaction: TransactionFormType, type: "deposit" | "withdrawal") => void,
}

export const useTransaction = (): Props => {
  const context = useContext(TransactionContext)
  if (!context)
    throw new Error("useTransaction deve ser usado dentro de TransactionProvider.")
  return context
}

export const TransactionContext = createContext<Props | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const t2 = useTranslations("transactions");
  const { successToast, handleApiErrorToast } = useToast();

  const [transactions, setTransactions] = useState<{
    isLoading: boolean,
    data: Transaction[]
  }>({
    isLoading: true,
    data: []
  });

  const createBuyAndSellTransactions = async (transaction: BuyAndSellFormType) => {
    const response = await TransactionService.createBuyAndSellTransactions(transaction);
    if (!response.success) {
      handleApiErrorToast(response.error);
      return;
    }
    successToast(t2("createToastDescription"));
    loadTransactions();
  }

  const createTransaction = async (
    transaction: TransactionFormType,
    type: "deposit" | "withdrawal",
  ) => {
    const response = await TransactionService.createTransaction({ type, ...transaction });
    if (!response.success) {
      handleApiErrorToast(response.error);
      return;
    }
    successToast(t2("createToastDescription"));
    loadTransactions();
  }

  const loadTransactions = async () => {
    setTransactions(prev => ({ ...prev, isLoading: true }));

    const response = await TransactionService.fetchTransactions();
    if (!response.success) {
      handleApiErrorToast(response.error);
      setTransactions(prev => ({ ...prev, isLoading: false }));
      return;
    }

    setTransactions({ data: response.data, isLoading: false });
  }

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loadTransactions,
        createBuyAndSellTransactions,
        createTransaction,
      }}>
      {children}
    </TransactionContext.Provider>
  );
}