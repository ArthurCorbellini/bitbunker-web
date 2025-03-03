"use client"

import { Combobox } from "@/components/global/my-combobox";
import { MyInputNumber } from "@/components/global/my-inputs/MyInputNumber";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { useTransaction } from "../_hooks/useTransaction";

interface Props {
  side: "source" | "target",
}

export const BuyAndSellFormCard = ({
  side
}: Props) => {
  const t = useTranslations("common");
  const t2 = useTranslations("transactions");

  const { control } = useFormContext();
  const { assetComboboxOptions } = useTransaction();

  const isSourceSide = side === "source";

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {isSourceSide ? t2("source") : t2("target")}
        </CardTitle>
        <CardDescription>
          {isSourceSide ? t2("sourceDescription") : t2("targetDescription")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name={`${side}.assetId`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("asset")}</FormLabel>
              <FormControl>
                <Combobox
                  onSelect={field.onChange}
                  options={assetComboboxOptions}
                  placeholder={t2("selectAsset")}
                  emptyMessage={t2("selectAssetEmpty")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        <FormField
          control={control}
          name={`${side}.amount`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("amount")}</FormLabel>
              <FormControl>
                <MyInputNumber
                  decimalPlaces={5}
                  value={field.value}
                  onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        <FormField
          control={control}
          name={`${side}.unitPrice`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("unitPrice")}</FormLabel>
              <FormControl>
                <MyInputNumber
                  decimalPlaces={5}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={t2("unitPricePlaceholder")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        <FormField
          control={control}
          name={`${side}.totalValue`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("totalValue")}</FormLabel>
              <FormControl>
                <MyInputNumber
                  decimalPlaces={5}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={t2("totalValuePlaceholder")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
      </CardContent>
    </Card>
  );
}