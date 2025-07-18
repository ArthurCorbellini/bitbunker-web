"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { useToast } from "@/components/generic/hooks/useToast";
import { MyForm } from "@/components/generic/my-form";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { createTransaction } from "../_actions/createTransaction";
import { TransactionFormType, useSchema } from "../_hooks/useSchema";
import { CommonTransactionFormCard } from "./CommonTransactionFormCard";
import { CommonTransactionFormFields } from "./CommonTransactionFormFields";

interface Props {
  type: "deposit" | "withdrawal",
  title: string,
  description: string,
}

export const TransactionForm = ({
  type, title, description
}: Props) => {
  const t = useTranslations("transactions");

  const { TransactionFormSchema } = useSchema();
  const { successToast, handleApiErrorToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<TransactionFormType>({
    resolver: zodResolver(TransactionFormSchema),
    defaultValues: {
      dateTime: new Date(),
      notes: "",
      assetId: "",
      amount: 0,
      unitPrice: 0,
      totalValue: 0,
    }
  })

  const onSubmit = async (values: TransactionFormType) => {
    startTransition(() => {
      createTransaction(values, type).then((res) => {
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
        <CommonTransactionFormCard
          title={title}
          description={description} />
      </div>
      <DialogFooter>
        <Button type="submit" disabled={isPending}>
          {isPending ? t("saving") : t("save")}
        </Button>
      </DialogFooter>
    </MyForm>
  );
}