"use client"

import { AssetService } from "@/api/services/AssetService";
import { Asset } from "@/api/types/asset-types";
import { ComboboxOptions } from "@/components/global/my-combobox";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const AssetContext = createContext<Props | undefined>(undefined);

interface Props {
  isLoading: boolean,
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
  const [isLoading, setLoading] = useState(false);
  const [assets, setAssets] = useState<Asset[]>([])
  const [typeComboboxOptions, setTypeComboboxOptions] = useState<ComboboxOptions[]>([]);
  const [classificationComboboxOptions, setClassificationComboboxOptions] = useState<ComboboxOptions[]>([]);

  const loadAssets = async () => {
    setLoading(true);
    try {
      const response = await AssetService.fetchAll();
      if (!response.success) {
        //to-do notificação
        response.error
      }
      setAssets(response.data);
    } finally {
      setLoading(false);
    }
  }

  const loadCreateParams = async () => {
    setLoading(true);
    try {
      const response = await AssetService.getCreateParams();
      if (!response.success) {
        //to-do notificação
        response.error
      }
      setTypeComboboxOptions(
        response.data.typeOptions.map(p => ({
          label: `${p.key} - ${p.value}`,
          value: p.key.toString()
        }))
      );
      setClassificationComboboxOptions(
        response.data.classificationOptions.map(p => ({
          label: `${p.key} - ${p.value}`,
          value: p.key.toString()
        }))
      );
    } finally {
      setLoading(false);
    }
  }

  // to-do se o back trocar os valores, acho que as listas vão permanecer inalteradas... validar
  // uma opção é tirar o hook e retornar direto a consulta
  // validar melhor abordagem, e ajustar nas transações também
  useEffect(() => {
    loadAssets();
    loadCreateParams();
  }, []);

  return (
    <AssetContext.Provider
      value={{
        isLoading,
        assets,
        typeComboboxOptions,
        classificationComboboxOptions
      }}>
      {children}
    </AssetContext.Provider>
  );
}