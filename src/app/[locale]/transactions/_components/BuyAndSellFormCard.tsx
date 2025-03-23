"use client"

import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import { MyCombobox } from "@/components/generic/my-combobox";
import { MyInputNumber } from "@/components/generic/my-inputs/MyInputNumber";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="w-2/3">
              <FormField
                control={control}
                name={`${side}.assetId`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("asset")}</FormLabel>
                    <FormControl>
                      <MyCombobox
                        onSelect={field.onChange}
                        options={assetComboboxOptions}
                        placeholder={t2("selectAsset")}
                        emptyMessage={t2("selectAssetEmpty")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
            </div>
            <div className="w-1/3">
              <FormField
                control={control}
                name={`${side}.amount`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("amount")}</FormLabel>
                    <FormControl>
                      <MyInputNumber
                        decimalPlaces={7}
                        value={field.value}
                        onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <FormField
                control={control}
                name={`${side}.unitPrice`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("unitPrice")}</FormLabel>
                    <FormControl>
                      <MyInputNumber
                        decimalPlaces={2}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={t2("unitPricePlaceholder")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
            </div>
            <div className="w-1/2">
              <FormField
                control={control}
                name={`${side}.totalValue`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("totalValue")}</FormLabel>
                    <FormControl>
                      <MyInputNumber
                        decimalPlaces={2}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={t2("totalValuePlaceholder")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card >
  );
}