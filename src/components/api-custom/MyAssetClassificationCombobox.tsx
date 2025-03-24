import { useTranslations } from "next-intl";
import { ComponentProps, useState } from "react";

import { AssetService } from "@/api/services/AssetService";
import { useToast } from "../generic/hooks/useToast";
import { ComboboxOptions, MyCombobox } from "../generic/my-combobox";

type MyAssetClassificationComboboxProps = Omit<ComponentProps<typeof MyCombobox>,
  | "options"
  | "placeholder"
  | "emptyMessage"
  | "onFocus"
  | "isLoading"
>;

export const MyAssetClassificationCombobox = ({ ...props }: MyAssetClassificationComboboxProps) => {
  const t = useTranslations("globalComponents.myAssetClassificationCombobox");
  const { handleApiErrorToast } = useToast();
  const [isLoading, setLoading] = useState(false);
  const [typeOptions, setTypeOptions] = useState<ComboboxOptions[]>([]);

  const loadOptions = async () => {
    setLoading(true);
    try {
      const response = await AssetService.getAssetClassificationOptions();
      if (!response.success) {
        handleApiErrorToast(response.error);
        return;
      }

      setTypeOptions(response.data.map(p => ({ value: p.id, label: p.label })));
    } finally {
      setLoading(false);
    }
  }

  const onFocus = () => {
    if (isLoading || typeOptions.length) return;
    loadOptions();
  }

  return (
    <MyCombobox
      options={typeOptions}
      placeholder={t("placeholder")}
      emptyMessage={t("emptyMessage")}
      onFocus={onFocus}
      isLoading={isLoading}
      {...props} />
  )
}
