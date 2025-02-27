"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Combobox, ComboboxOptions } from "@/components/global/combobox";
import { MyForm } from "@/components/global/my-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogFooter } from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { assetService } from "@/lib/api/assetService";

export const BuyAndSellForm = () => {
  const t = useTranslations("common");
  const t2 = useTranslations("transactions");
  const tz = useTranslations("zodErrors");

  const TransactionSchema = z.object({
    assetId: z
      .string()
      .nonempty(tz("notEmpty")),
    amount: z
      .string()
      .nonempty(tz("notEmpty"))
      .transform((val) => Number(val))
      .refine((val) => val > 0, tz("mustBePositiveNumber")),
    unitPrice: z
      .string()
      .nonempty(tz("notEmpty"))
      .transform((val) => Number(val))
      .refine((val) => val > 0, tz("mustBePositiveNumber")),
    totalValue: z
      .string()
      .nonempty(tz("notEmpty"))
      .transform((val) => Number(val))
      .refine((val) => val > 0, tz("mustBePositiveNumber")),
    date: z
      .string()
      .nonempty(tz("notEmpty")),
    notes: z
      .string()
      .max(255, tz("textLengthLessThan", { count: 255 })),
  });

  const FormSchema = z.object({
    source: TransactionSchema,
    target: TransactionSchema
  });

  type BuyAndSellFormRequest = z.infer<typeof FormSchema>;

  const form = useForm<BuyAndSellFormRequest>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      source: {
        assetId: "",
        amount: 0,
        unitPrice: 0,
        totalValue: 0,
        date: "",
        notes: "",
      },
      target: {
        assetId: "",
        amount: 0,
        unitPrice: 0,
        totalValue: 0,
        date: "",
        notes: "",
      }
    }
  })

  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (values: BuyAndSellFormRequest) => {
    setIsSubmitting(true);
    // const response = await orderApi.createOrder(values);
    console.log(values)
    // to-do toast de sucesso ou erro

    setIsSubmitting(false);
  }

  const [assetOptions, setAssetOptions] = useState<ComboboxOptions[]>([]);
  const loadAssetOptions = async () => {
    const response = await assetService.fetch();
    if (!response.success) {
      // to-do handle error
    }

    const assets = response.data.map(p => {
      return {
        label: `${p.symbol} ${p.name}`,
        value: p.id.toString()
      }
    });

    setAssetOptions(assets);
  }

  useEffect(() => {
    loadAssetOptions();
  }, []);

  return (
    <MyForm form={form} onSubmit={onSubmit}>
      <div className="flex gap-2 items-center">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{t2("source")}</CardTitle>
            <CardDescription>{t2("sourceDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="source.assetId"
              render={() => (
                <FormItem>
                  <FormLabel>{t("asset")}</FormLabel>
                  <FormControl>
                    <Combobox
                      onSelect={(v) => form.setValue("source.assetId", v)}
                      options={assetOptions}
                      placeholder={t2("selectAsset")}
                      emptyMessage={t2("selectAssetEmpty")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
          </CardContent>
        </Card>
        <ChevronsRight className="text-muted-foreground/70" />
        to-do segundo card
      </div>
      <DialogFooter>
        <Button type="submit">{t2("save")}</Button>
      </DialogFooter>
    </MyForm>
  );
}