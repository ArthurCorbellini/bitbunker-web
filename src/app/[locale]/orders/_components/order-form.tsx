"use client"

import { PrimaryButton } from "@/components/button";
import Drawer from "@/components/drawer";
import { useTranslations } from "next-intl";

export default function OrderForm() {
  const t1 = useTranslations("shared");
  const t2 = useTranslations("OrderForm");
  return (
    <Drawer
      title={t2("title")}
      description={t2("description")}
      onCloseRoute="/orders"
      footer={
        <PrimaryButton type="submit">
          {t1("save")}
        </PrimaryButton>
      }>
      teste
    </Drawer>
  )
}