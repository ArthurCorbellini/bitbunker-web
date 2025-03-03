"use client"

import { ComboboxOptions } from "@/components/global/my-combobox"
import { assetService } from "@/lib/api/assetService"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

interface Props {
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
  const [assetComboboxOptions, setAssetComboboxOptions] = useState<ComboboxOptions[]>([]);

  const loadAssetCombobox = async () => {
    const response = await assetService.fetch();
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
    loadAssetCombobox();
  }, []);

  return (
    <TransactionContext.Provider value={{
      assetComboboxOptions
    }}>
      {children}
    </TransactionContext.Provider>
  );
}