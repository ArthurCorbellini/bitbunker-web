"use client"

import { AssetService } from "@/api/services/AssetService";
import { Asset } from "@/api/types/asset-types";
import { ComboboxOptions } from "@/components/global/my-combobox";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const AssetContext = createContext<Props | undefined>(undefined);

interface Props {
  assets: Asset[],
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
  const [assets, setAssets] = useState<Asset[]>([])
  const [typeComboboxOptions, setTypeComboboxOptions] = useState<ComboboxOptions[]>([]);
  const [classificationComboboxOptions, setClassificationComboboxOptions] = useState<ComboboxOptions[]>([]);

  const loadAssets = async () => {
    const response = await AssetService.fetchAll();

    if (!response.success) {
      //to-do notificação
      response.error
    }

    setAssets(response.data);
  }

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
    loadAssets();
    loadTypeComboboxOptions();
    loadClassificationComboboxOptions();
  }, []);

  return (
    <AssetContext.Provider
      value={{
        assets,
        typeComboboxOptions,
        classificationComboboxOptions
      }}>
      {children}
    </AssetContext.Provider>
  );
}