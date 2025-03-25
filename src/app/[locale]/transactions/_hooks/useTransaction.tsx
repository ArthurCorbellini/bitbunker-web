"use client"

import { createContext, ReactNode, useContext, useState } from "react"

import { TransactionService } from "@/api/services/TransactionService"
import { Transaction } from "@/api/types/transaction"
import { useToast } from "@/components/generic/hooks/useToast"

interface Props {
  transactions: { data: Transaction[], isLoading: boolean },
  loadTransactions: () => void,
}

export const useTransaction = (): Props => {
  const context = useContext(TransactionContext)
  if (!context)
    throw new Error("useTransaction deve ser usado dentro de TransactionProvider.")
  return context
}

export const TransactionContext = createContext<Props | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const { handleApiErrorToast } = useToast();

  const [transactions, setTransactions] = useState<{
    isLoading: boolean,
    data: Transaction[]
  }>({
    isLoading: true,
    data: []
  });

  const loadTransactions = async () => {
    setTransactions(prev => ({ ...prev, isLoading: true }));
    try {
      const response = await TransactionService.fetchTransactions();
      if (!response.success) {
        handleApiErrorToast(response.error);
        return;
      }
      setTransactions({ data: response.data, isLoading: false });
    } finally {
      setTransactions(prev => ({ ...prev, isLoading: false }));
    }
  }

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loadTransactions
      }}>
      {children}
    </TransactionContext.Provider>
  );
}