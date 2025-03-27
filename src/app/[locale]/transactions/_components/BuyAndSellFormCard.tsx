"use client"

import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import { MyAssetCombobox } from "@/components/api-custom/MyAssetCombobox";
import { MyInputNumber } from "@/components/generic/my-inputs/MyInputNumber";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface Props {
  side: "buy" | "sell",
}

export const BuyAndSellFormCard = ({
  side
}: Props) => {
  const t = useTranslations("common");
  const t2 = useTranslations("transactions");
  const { control } = useFormContext();

  const isSourceSide = side === "buy";

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
                      <MyAssetCombobox onSelect={field.onChange} />
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
                        type="number"
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
                        type="number"
                        decimalPlaces={2}
                        value={field.value}
                        onChange={field.onChange} />
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
                        type="number"
                        decimalPlaces={2}
                        value={field.value}
                        onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}