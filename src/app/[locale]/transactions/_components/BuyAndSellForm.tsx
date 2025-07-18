"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { useToast } from "@/components/generic/hooks/useToast";
import { MyForm } from "@/components/generic/my-form";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { createBuyAndSellTransactions } from "../_actions/createBuyAndSellTransactions";
import { BuyAndSellFormType, useSchema } from "../_hooks/useSchema";
import { CommonTransactionFormCard } from "./CommonTransactionFormCard";
import { CommonTransactionFormFields } from "./CommonTransactionFormFields";

export const BuyAndSellForm = () => {
  const t = useTranslations("transactions");

  const { BuyAndSellFormSchema } = useSchema();
  const { successToast, handleApiErrorToast } = useToast();
  const [isPending, startTransition] = useTransition();

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
    startTransition(() => {
      createBuyAndSellTransactions(values).then((res) => {
        if (res.success) {
          successToast(t("createToastDescription"));
          form.reset();
        } else
          handleApiErrorToast(res.error);
      });
    })
  }

  return (
    <MyForm form={form} onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <CommonTransactionFormFields />
        <div className="flex gap-4 items-center">
          <CommonTransactionFormCard
            formField="buy"
            title={t("source")}
            description={t("sourceDescription")} />
          <CommonTransactionFormCard
            formField="sell"
            title={t("target")}
            description={t("targetDescription")} />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" disabled={isPending}>
          {isPending ? t("saving") : t("save")}
        </Button>
      </DialogFooter>
    </MyForm>
  );
}