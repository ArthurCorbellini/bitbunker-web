"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react"

import { AssetService } from "@/api/services/AssetService"
import { TransactionService } from "@/api/services/TransactionService"
import { Transaction } from "@/api/types/transaction-types"
import { ComboboxOptions } from "@/components/global/my-combobox"

interface Props {
  isLoading: boolean,
  transactions: Transaction[],
  assetComboboxOptions: ComboboxOptions[],
}

export const useTransaction = (): Props => {
  const context = useContext(TransactionContext)
  if (!context)
    throw new Error("useTransaction deve ser usado dentro de TransactionProvider.")
  return context
}

export const TransactionContext = createContext<Props | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [assetComboboxOptions, setAssetComboboxOptions] = useState<ComboboxOptions[]>([]);

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const response = await TransactionService.fetchAll();
      if (!response.success) {
        //to-do notificação
        response.error
      }
      setTransactions(response.data);
    } finally {
      setLoading(false);
    }
  }

  const loadAssetCombobox = async () => {
    setLoading(true);
    try {
      const response = await AssetService.fetchAllAssets();
      if (!response.success) {
        // to-do handle error
      }
      setAssetComboboxOptions(
        response.data.map(p => ({
          label: `${p.symbol} - ${p.name}`,
          value: p.id.toString()
        }))
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTransactions();
    loadAssetCombobox();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        isLoading,
        transactions,
        assetComboboxOptions
      }}>
      {children}
    </TransactionContext.Provider>
  );
}