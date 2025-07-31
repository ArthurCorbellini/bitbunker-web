import { useTranslations } from "next-intl";
import { ComponentProps, useState } from "react";

import { AssetApi } from "@/core/api/asset.api";
import { useToast } from "../generic/hooks/useToast";
import { ComboboxOptions, MyCombobox } from "../generic/my-combobox";

type MyAssetComboboxProps = Omit<ComponentProps<typeof MyCombobox>,
  | "options"
  | "placeholder"
  | "emptyMessage"
  | "onFocus"
  | "isLoading"
>;

export const MyAssetCombobox = ({ ...props }: MyAssetComboboxProps) => {
  const t = useTranslations("globalComponents.myAssetCombobox");
  const { handleApiErrorToast } = useToast();
  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState<ComboboxOptions[]>([]);

  const loadOptions = async () => {
    setLoading(true);
    try {
      const response = await AssetApi.fetchAssets();
      if (!response.success) {
        handleApiErrorToast(response.error);
        return;
      }

      setOptions(
        response.data ?
          response.data.map(p => ({
            value: p.id.toString(),
            label: `${p.symbol} - ${p.name}`,
          }))
          : []
      );
    } finally {
      setLoading(false);
    }
  }

  const onFocus = () => {
    if (isLoading || options.length) return;
    loadOptions();
  }

  return (
    <MyCombobox
      options={options}
      placeholder={t("placeholder")}
      emptyMessage={t("emptyMessage")}
      onFocus={onFocus}
      isLoading={isLoading}
      {...props} />
  )
}
