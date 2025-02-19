"use client"

import { PrimaryButton } from "@/components/legacy/button";
import Drawer from "@/components/legacy/drawer";
import { useToast } from "@/lib/store/toast-context";
import { useTranslations } from "next-intl";
import Form from "next/form";
import { useActionState, useEffect } from "react";
import { createOrder } from "../_actions/create-order-action";

export default function OrderForm() {
  const t = useTranslations("shared");
  const t2 = useTranslations("OrderForm");

  const [state, action, pending] = useActionState(createOrder, null);
  const { setToast } = useToast();

  useEffect(() => {
    if (state?.toast) {
      setToast(state.toast)
    }
  }, [state])

  return (
    <Drawer
      title={t2("title")}
      description={t2("description")}
      onCloseRoute="/orders"
      footer={
        <PrimaryButton
          type="submit"
          disabled={pending}>
          {pending ? `${t("saving")}...` : t("save")}
        </PrimaryButton>
      }>
      <Form action={action}>
        {/* to-do order form */}
      </Form>
    </Drawer>
  )
}