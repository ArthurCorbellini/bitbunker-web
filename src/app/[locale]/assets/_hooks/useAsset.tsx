"use client"

import { createContext, ReactNode, useContext, useState } from "react";

import { useToast } from "@/components/generic/hooks/useToast";
import { AssetService } from "@/core/services/AssetService";
import { Asset, CreateAsset } from "@/core/types/asset";
import { useTranslations } from "next-intl";

const AssetContext = createContext<Props | undefined>(undefined);

interface Props {
  assets: { data: Asset[], isLoading: boolean },
  loadAssets: () => void,
  createAsset: (asset: CreateAsset) => void,
}

export const useAsset = (): Props => {
  const context = useContext(AssetContext)
  if (!context)
    throw new Error("useAsset deve ser usado dentro de AssetProvider.")
  return context
}

export const AssetProvider = ({ children }: { children: ReactNode }) => {
  const t2 = useTranslations("assets");
  const { successToast, handleApiErrorToast } = useToast();

  const [assets, setAssets] = useState<{
    isLoading: boolean,
    data: Asset[]
  }>({
    isLoading: true,
    data: []
  });

  const createAsset = async (asset: CreateAsset) => {
    const response = await AssetService.createAsset(asset);
    if (!response.success) {
      handleApiErrorToast(response.error);
      return;
    }
    successToast(t2("createToastDescription"));
    loadAssets();
  }

  const loadAssets = async () => {
    setAssets(prev => ({ ...prev, isLoading: true }));

    const response = await AssetService.fetchAssets();
    if (!response.success) {
      handleApiErrorToast(response.error);
      setAssets(prev => ({ ...prev, isLoading: false }));
      return;
    }

    setAssets({ data: response.data, isLoading: false });
  }

  return (
    <AssetContext.Provider
      value={{
        assets,
        createAsset,
        loadAssets
      }}>
      {children}
    </AssetContext.Provider>
  );
}