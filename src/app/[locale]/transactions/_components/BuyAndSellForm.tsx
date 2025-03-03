"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { MyForm } from "@/components/global/my-form";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { BuyAndSellFormCard } from "./BuyAndSellFormCard";

export const BuyAndSellForm = () => {
  const t = useTranslations("common");
  const t2 = useTranslations("transactions");
  const tz = useTranslations("zodErrors");

  const TransactionSchema = z.object({
    assetId: z
      .string(),
    // .nonempty(tz("notEmpty")),
    amount: z
      .number(),
    // .nonempty(tz("notEmpty"))
    // .transform((val) => Number(val))
    // .refine((val) => val > 0, tz("mustBePositiveNumber")),
    unitPrice: z
      .number(),
    //   .nonempty(tz("notEmpty"))
    //   .transform((val) => Number(val))
    //   .refine((val) => val > 0, tz("mustBePositiveNumber")),
    totalValue: z
      .number()
    //   .nonempty(tz("notEmpty"))
    //   .transform((val) => Number(val))
    //   .refine((val) => val > 0, tz("mustBePositiveNumber")),
    // date: z
    //   .string()
    //   .nonempty(tz("notEmpty")),
    // notes: z
    //   .string()
    //   .max(255, tz("textLengthLessThan", { count: 255 })),
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
        // date: "",
        // notes: "",
      },
      target: {
        assetId: "",
        amount: 0,
        unitPrice: 0,
        totalValue: 0,
        // date: "",
        // notes: "",
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

  return (
    <MyForm form={form} onSubmit={onSubmit}>
      <div className="flex gap-2 items-center">
        <BuyAndSellFormCard side="source" />
        <ChevronsRight className="text-muted-foreground/70" />
        <BuyAndSellFormCard side="target" />
      </div>
      <DialogFooter>
        <Button type="submit">{t2("save")}</Button>
      </DialogFooter>
    </MyForm>
  );
}