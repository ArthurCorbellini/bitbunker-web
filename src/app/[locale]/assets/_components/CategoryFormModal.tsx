"use client"

import { useTranslations } from "next-intl";
import { useEffect, useTransition } from "react";
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
  DialogTitle
} from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AssetCategory, CreateAssetCategory } from "@/core/types/asset-category";
import { intlZodResolver } from "@/core/zod/intlZodResolver";
import { CreateAssetCategorySchema } from "@/core/zod/schemas";
import { createAssetCategory } from "../_actions/createAssetCategory";

interface CategoryFormModalProps {
  open: boolean,
  onOpenChange: (open: boolean) => void,
  assetCategory?: AssetCategory,
}

export const CategoryFormModal = ({
  open,
  onOpenChange,
  assetCategory,
}: CategoryFormModalProps) => {
  const t = useTranslations("categoryMenu");
  const { successToast, handleApiErrorToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const defaultValues = {
    name: "",
    recommendedPercentage: 0,
  }

  const form = useForm<CreateAssetCategory>({
    resolver: intlZodResolver(CreateAssetCategorySchema),
    defaultValues
  })

  const onSubmit = (values: CreateAssetCategory) => {
    startTransition(() => {
      createAssetCategory(values).then((res) => {
        if (res.success) {
          successToast(t("createToastDescription"));
          form.reset();
          onOpenChange(false);
        } else
          handleApiErrorToast(res.error);
      });
    })
  }

  useEffect(() => {
    if (open) {
      form.reset(assetCategory ?? defaultValues);
    }
  }, [open, assetCategory, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                      <MyInputNumber {...field} decimalPlaces={2} />
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
