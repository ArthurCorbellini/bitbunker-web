"use client"

import { PrimaryButton } from "@/components/legacy/button";
import Drawer from "@/components/legacy/drawer";
import { getOrderSchema } from "@/lib/schemas/order-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { orderApi } from "@/lib/api/order-api";
import { CreateOrderRequest } from "@/lib/types/order-type";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function OrderForm() {
  const t = useTranslations("shared");
  const t2 = useTranslations("OrderForm");
  const t3 = useTranslations("errors");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateOrderRequest>({
    resolver: zodResolver(getOrderSchema(t3))
  })

  async function onSubmit(values: CreateOrderRequest) {
    setIsSubmitting(true);
    const response = await orderApi.createOrder(values);

    // to-do toast de sucesso ou erro

    setIsSubmitting(false);
  }

  return (
    <Drawer
      title={t2("title")}
      description={t2("description")}
      onCloseRoute="/orders"
      footer={
        <PrimaryButton
          type="submit"
          disabled={isSubmitting}>
          {isSubmitting ? `${t("saving")}...` : t("save")}
        </PrimaryButton>
      }>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Drawer>
  )
}