"use client"

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { useToast } from "@/components/generic/hooks/useToast";
import { MyForm } from "@/components/generic/my-form";
import { MyInputNumber } from "@/components/generic/my-inputs/MyInputNumber";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateAssetCategory } from "@/core/types/asset-category";
import { intlZodResolver } from "@/core/zod/intlZodResolver";
import { CreateAssetCategorySchema } from "@/core/zod/schemas";
import { createAssetCategory } from "../_actions/createAssetCategory";

export const CategoryFormModal = () => {
  const t = useTranslations("categoryMenu");
  const { successToast, handleApiErrorToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateAssetCategory>({
    resolver: intlZodResolver(CreateAssetCategorySchema),
    defaultValues: {
      name: "",
      recommendedPercentage: 0,
    }
  })

  const onSubmit = (values: CreateAssetCategory) => {
    startTransition(() => {
      createAssetCategory(values).then((res) => {
        if (res.success) {
          successToast(t("createToastDescription"));
          form.reset();
        } else
          handleApiErrorToast(res.error);
      });
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={() => form.reset()}>
          <Plus /> {t("addButton")}
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[33%]">
        <DialogHeader>
          <DialogTitle>
            {t("addTitle")}
          </DialogTitle>
          <DialogDescription>
            {t("addDescription")}
          </DialogDescription>
        </DialogHeader>
        <MyForm form={form} onSubmit={onSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("name")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
              </div>
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name={"recommendedPercentage"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("recommendedPercentage")}</FormLabel>
                    <FormControl>
                      <MyInputNumber
                        type="number"
                        decimalPlaces={2}
                        value={field.value}
                        onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? t("saving") : t("save")}
            </Button>
          </DialogFooter>
        </MyForm>
      </DialogContent>
    </Dialog>
  )
}
