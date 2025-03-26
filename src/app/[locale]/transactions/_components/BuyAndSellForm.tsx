"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Pen } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CreateBuyAndSellTransactions } from "@/api/types/transaction";
import { MyForm } from "@/components/generic/my-form";
import { MyDateTimePicker } from "@/components/generic/MyDateTimePicker";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useTransaction } from "../_hooks/useTransaction";
import { BuyAndSellFormCard } from "./BuyAndSellFormCard";

export const BuyAndSellForm = () => {
  const t2 = useTranslations("transactions");
  const tz = useTranslations("zodErrors");
  const { createTransaction } = useTransaction();

  const SourceTargetSchema = z.object({
    assetId: z.string().min(1, tz("notEmpty")),
    amount: z.number().nonnegative(tz("mustBePositiveValue")),
    unitPrice: z.number().nonnegative(tz("mustBePositiveValue")),
    totalValue: z.number().nonnegative(tz("mustBePositiveValue"))
  });

  const FormSchema = z.object({
    date: z.date(),
    notes: z.string(),
    source: SourceTargetSchema,
    target: SourceTargetSchema,
  });

  type FormType = z.infer<typeof FormSchema>;

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: new Date(),
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

  const onSubmit = async (values: FormType) => {
    createTransaction(values as CreateBuyAndSellTransactions);
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