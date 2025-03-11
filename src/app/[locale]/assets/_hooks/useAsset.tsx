"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { AssetService } from "@/api/services/AssetService";
import { Asset, CreateAsset } from "@/api/types/asset-types";
import { useToast } from "@/components/global/hooks/useToast";
import { ComboboxOptions } from "@/components/global/my-combobox";
import { useTranslations } from "next-intl";

const AssetContext = createContext<Props | undefined>(undefined);

interface Props {
  isLoading: boolean,
  assets: Asset[],
  typeComboboxOptions: ComboboxOptions[],
  classificationComboboxOptions: ComboboxOptions[],
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
  const [typeComboboxOptions, setTypeComboboxOptions] = useState<ComboboxOptions[]>([]);
  const [classificationComboboxOptions, setClassificationComboboxOptions] = useState<ComboboxOptions[]>([]);
  const { successToast, errorToast } = useToast();

  const create = async (asset: CreateAsset) => {
    setLoading(true);
    try {
      const response = await AssetService.createAsset(asset);
      if (!response.success) {
        errorToast(); // to-do o erro pode ser tratado melhor
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
        errorToast(); // to-do o erro pode ser tratado melhor
        return;
      }
      setAssets(response.data);
    } finally {
      setLoading(false);
    }
  }

  const loadCreateParams = async () => {
    setLoading(true);
    try {
      const response = await AssetService.getCreateAssetParams();
      if (!response.success) {
        errorToast(); // to-do o erro pode ser tratado melhor
        return;
      }
      setTypeComboboxOptions(
        response.data.typeOptions.map(p => ({
          label: p.value,
          value: p.key,
        }))
      );
      setClassificationComboboxOptions(
        response.data.classificationOptions.map(p => ({
          label: p.value,
          value: p.key,
        }))
      );
    } finally {
      setLoading(false);
    }
  }

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
        classificationComboboxOptions,
        create,
      }}>
      {children}
    </AssetContext.Provider>
  );
}