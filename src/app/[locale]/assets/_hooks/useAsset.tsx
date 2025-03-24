"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { AssetService } from "@/api/services/AssetService";
import { Asset, CreateAsset } from "@/api/types/asset";
import { useToast } from "@/components/generic/hooks/useToast";
import { useTranslations } from "next-intl";

const AssetContext = createContext<Props | undefined>(undefined);

interface Props {
  assets: { data: Asset[], isLoading: boolean },
  create: (asset: CreateAsset) => void,
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

  const create = async (asset: CreateAsset) => {
    setAssets(prev => ({ ...prev, isLoading: true }));
    try {
      const response = await AssetService.createAsset(asset);
      if (!response.success) {
        handleApiErrorToast(response.error);
        return;
      }
      successToast(t2("createToastDescription"));
      loadAssets();
    } finally {
      setAssets(prev => ({ ...prev, isLoading: false }));
    }
  }

  const loadAssets = async () => {
    setAssets(prev => ({ ...prev, isLoading: true }));
    try {
      const response = await AssetService.fetchAllAssets();
      if (!response.success) {
        handleApiErrorToast(response.error);
        return;
      }
      setAssets({ data: response.data, isLoading: false });
    } finally {
      setAssets(prev => ({ ...prev, isLoading: false }));
    }
  }

  useEffect(() => {
    loadAssets();
  }, []);

  return (
    <AssetContext.Provider
      value={{
        assets,
        create,
      }}>
      {children}
    </AssetContext.Provider>
  );
}