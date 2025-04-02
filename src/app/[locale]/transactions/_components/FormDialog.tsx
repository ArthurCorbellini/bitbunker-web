"use client"

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BuyAndSellForm } from "./BuyAndSellForm";
import { TransactionForm } from "./TransactionForm";

export const FormDialog = () => {
  const t = useTranslations("transactions");
  const t2 = useTranslations("transactions");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus /> {t("addTransactions")}
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[75%]">
        <DialogHeader>
          <DialogTitle>
            {t("title")}
          </DialogTitle>
          <DialogDescription>
            {t("description")}
          </DialogDescription>
        </DialogHeader>
        <Tabs>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="buySell">{t("buySell")}</TabsTrigger>
            <TabsTrigger value="deposit">{t("deposit")}</TabsTrigger>
            <TabsTrigger value="withdrawal">{t("withdrawal")}</TabsTrigger>
          </TabsList>
          <TabsContent value="buySell">
            <BuyAndSellForm />
          </TabsContent>
          <TabsContent value="deposit">
            <TransactionForm
              type="deposit"
              title={t2("deposit")}
              description={t2("depositDescription")} />
          </TabsContent>
          <TabsContent value="withdrawal">
            <TransactionForm
              type="withdrawal"
              title={t2("withdrawal")}
              description={t2("withdrawalDescription")} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog >
  )
}
