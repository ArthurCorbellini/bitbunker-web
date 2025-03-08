"use client"

import { ComboboxOptions } from "@/components/global/my-combobox";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const AssetContext = createContext<Props | undefined>(undefined);

interface Props {
  typeComboboxOptions: ComboboxOptions[],
  classificationComboboxOptions: ComboboxOptions[],
}

export const useAsset = (): Props => {
  const context = useContext(AssetContext)
  if (!context)
    throw new Error("useAsset deve ser usado dentro de AssetProvider.")
  return context
}

export const AssetProvider = ({ children }: { children: ReactNode }) => {
  const [typeComboboxOptions, setTypeComboboxOptions] = useState<ComboboxOptions[]>([]);
  const [classificationComboboxOptions, setClassificationComboboxOptions] = useState<ComboboxOptions[]>([]);

  const loadTypeComboboxOptions = async () => {
    setTypeComboboxOptions([]); // to-do
  }

  const loadClassificationComboboxOptions = async () => {
    setClassificationComboboxOptions([]); // to-do
  }

  // to-do se o back trocar os valores, acho que as listas vão permanecer inalteradas... validar
  // uma opção é tirar o hook e retornar direto a consulta
  // validar melhor abordagem, e ajustar nas transações também
  useEffect(() => {
    loadTypeComboboxOptions();
    loadClassificationComboboxOptions();
  }, []);

  return (
    <AssetContext.Provider value={{
      typeComboboxOptions,
      classificationComboboxOptions
    }}>
      {children}
    </AssetContext.Provider>
  );
}