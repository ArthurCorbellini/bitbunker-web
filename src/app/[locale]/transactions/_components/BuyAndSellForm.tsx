"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { MyForm } from "@/components/generic/my-form";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { BuyAndSellFormType, useSchema } from "../_hooks/useSchema";
import { useTransaction } from "../_hooks/useTransaction";
import { CommonTransactionFormCard } from "./CommonTransactionFormCard";
import { CommonTransactionFormFields } from "./CommonTransactionFormFields";

export const BuyAndSellForm = () => {
  const t2 = useTranslations("transactions");

  const { createBuyAndSellTransactions } = useTransaction();
  const { BuyAndSellFormSchema } = useSchema();

  const form = useForm<BuyAndSellFormType>({
    resolver: zodResolver(BuyAndSellFormSchema),
    defaultValues: {
      dateTime: new Date(),
      notes: "",
      buy: {
        assetId: "",
        amount: 0,
        unitPrice: 0,
        totalValue: 0,
      },
      sell: {
        assetId: "",
        amount: 0,
        unitPrice: 0,
        totalValue: 0,
      },
    }
  })

  const onSubmit = async (values: BuyAndSellFormType) => {
    createBuyAndSellTransactions(values);
  }

  return (
    <MyForm form={form} onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <CommonTransactionFormFields />
        <div className="flex gap-4 items-center">
          <CommonTransactionFormCard
            formField="buy"
            title={t2("source")}
            description={t2("sourceDescription")} />
          <CommonTransactionFormCard
            formField="sell"
            title={t2("target")}
            description={t2("targetDescription")} />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">{t2("save")}</Button>
      </DialogFooter>
    </MyForm>
  );
}