"use client"

import { createContext, ReactNode, useContext, useState } from "react"

import { TransactionService } from "@/api/services/TransactionService"
import { CreateBuyAndSellTransactions, Transaction } from "@/api/types/transaction"
import { useToast } from "@/components/generic/hooks/useToast"
import { useTranslations } from "next-intl"

interface Props {
  transactions: { data: Transaction[], isLoading: boolean },
  loadTransactions: () => void,
  createTransaction: (transaction: CreateBuyAndSellTransactions) => void,
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

  const createTransaction = async (transaction: CreateBuyAndSellTransactions) => {
    const response = await TransactionService.createBuyAndSellTransactions(transaction);
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
        createTransaction
      }}>
      {children}
    </TransactionContext.Provider>
  );
}