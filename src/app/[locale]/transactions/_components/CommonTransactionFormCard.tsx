"use client"

import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import { MyAssetCombobox } from "@/components/api-custom/MyAssetCombobox";
import { MyInputNumber } from "@/components/generic/my-inputs/MyInputNumber";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface Props {
  formField?: "buy" | "sell",
  title: string,
  description: string,
}

export const CommonTransactionFormCard = ({
  formField, title, description
}: Props) => {
  const t = useTranslations("common");
  const { control } = useFormContext();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="w-2/3">
              <FormField
                control={control}
                name={formField ? `${formField}.assetId` : "assetId"}
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
                name={formField ? `${formField}.amount` : "amount"}
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
                name={formField ? `${formField}.unitPrice` : "unitPrice"}
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
                name={formField ? `${formField}.totalValue` : "totalValue"}
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