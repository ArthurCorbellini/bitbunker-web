"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { AssetService } from "@/api/services/AssetService";
import { Asset, CreateAsset } from "@/api/types/asset";
import { useToast } from "@/components/generic/hooks/useToast";
import { useTranslations } from "next-intl";

const AssetContext = createContext<Props | undefined>(undefined);

interface Props {
  isLoading: boolean,
  assets: Asset[],
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
  const [isLoading, setLoading] = useState(false);
  const [assets, setAssets] = useState<Asset[]>([])
  const { successToast, handleApiErrorToast } = useToast();

  const create = async (asset: CreateAsset) => {
    setLoading(true);
    try {
      const response = await AssetService.createAsset(asset);
      if (!response.success) {
        handleApiErrorToast(response.error);
        return;
      }
      successToast(t2("createToastDescription"));
      loadAssets();
    } finally {
      setLoading(false);
    }
  }

  const loadAssets = async () => {
    setLoading(true);
    try {
      const response = await AssetService.fetchAllAssets();
      if (!response.success) {
        handleApiErrorToast(response.error);
        return;
      }
      setAssets(response.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAssets();
  }, []);

  return (
    <AssetContext.Provider
      value={{
        isLoading,
        assets,
        create,
      }}>
      {children}
    </AssetContext.Provider>
  );
}