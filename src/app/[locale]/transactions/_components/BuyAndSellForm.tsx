"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Pen } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { MyForm } from "@/components/global/my-form";
import { MyDateTimePicker } from "@/components/global/MyDateTimePicker";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
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
  });

  const FormSchema = z.object({
    date: z
      .date(),
    // .nonempty(tz("notEmpty")),
    notes: z
      .string(),
    //   .max(255, tz("textLengthLessThan", { count: 255 })),
    source: TransactionSchema,
    target: TransactionSchema,
  });

  type BuyAndSellFormRequest = z.infer<typeof FormSchema>;

  const form = useForm<BuyAndSellFormRequest>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: new Date(), // todo corrigir data para multiplo de 5
      notes: "",
      source: {
        assetId: "",
        amount: 0,
        unitPrice: 0,
        totalValue: 0,
      },
      target: {
        assetId: "",
        amount: 0,
        unitPrice: 0,
        totalValue: 0,
      },
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
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <div className="w-1/4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t2("dateHourTransaction")}</FormLabel>
                  <FormControl>
                    <MyDateTimePicker {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
          </div>
          <div className="w-3/4 ml-auto">
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t2("notes")}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Pen /> {t2("notesButton")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder={t2("notesPlaceholder")}
                          className="h-32" />
                      </FormControl>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )} />
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <BuyAndSellFormCard side="source" />
          <BuyAndSellFormCard side="target" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">{t2("save")}</Button>
      </DialogFooter>
    </MyForm>
  );
}