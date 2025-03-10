"use client"

import { AssetService } from "@/api/services/AssetService"
import { TransactionService } from "@/api/services/TransactionService"
import { Transaction } from "@/api/types/transaction-types"
import { ComboboxOptions } from "@/components/global/my-combobox"

import { createContext, ReactNode, useContext, useEffect, useState } from "react"

interface Props {
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
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [assetComboboxOptions, setAssetComboboxOptions] = useState<ComboboxOptions[]>([]);

  const loadTransactions = async () => {
    const response = await TransactionService.fetchAll();

    if (!response.success) {
      //to-do notificação
      response.error
    }

    setTransactions(response.data);
  }

  const loadAssetCombobox = async () => {
    const response = await AssetService.fetchAll();
    if (!response.success) {
      // to-do handle error
    }

    const assets = response.data.map(p => {
      return {
        label: `${p.symbol} - ${p.name}`,
        value: p.id.toString()
      }
    });

    setAssetComboboxOptions(assets);
  }

  useEffect(() => {
    loadTransactions();
    loadAssetCombobox();
  }, []);

  return (
    <TransactionContext.Provider value={{
      transactions,
      assetComboboxOptions
    }}>
      {children}
    </TransactionContext.Provider>
  );
}