"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { MyForm } from "@/components/generic/my-form";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { TransactionFormType, useSchema } from "../_hooks/useSchema";
import { useTransaction } from "../_hooks/useTransaction";
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
  const t2 = useTranslations("transactions");

  const { createTransaction } = useTransaction();
  const { TransactionFormSchema } = useSchema();

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
    createTransaction(values, type);
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
        <Button type="submit">{t2("save")}</Button>
      </DialogFooter>
    </MyForm>
  );
}