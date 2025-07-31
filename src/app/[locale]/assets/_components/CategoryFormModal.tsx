"use client"

import { useTranslations } from "next-intl";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";

import { saveAssetCategory } from "@/app/_actions/asset-category.action";
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
import { AssetCategory, AssetCategoryFormType } from "@/core/types/asset-category";
import { intlZodResolver } from "@/core/zod/intlZodResolver";
import { AssetCategoryFormSchema } from "@/core/zod/schemas";

interface CategoryFormModalProps {
  open: boolean,
  onOpenChange: (open: boolean) => void,
  editAssetCategory?: AssetCategory,
}

export const CategoryFormModal = ({
  open,
  onOpenChange,
  editAssetCategory,
}: CategoryFormModalProps) => {
  const t = useTranslations("categoryMenu");
  const { successToast, handleApiErrorToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const defaultValues = {
    name: "",
    recommendedPercentage: 0,
  }

  const form = useForm<AssetCategoryFormType>({
    resolver: intlZodResolver(AssetCategoryFormSchema),
    defaultValues
  })

  const onSubmit = (values: AssetCategoryFormType) => {
    startTransition(() => {
      saveAssetCategory(values).then((res) => {
        if (res.success) {
          form.reset();
          successToast(t("createToastDescription"));
          onOpenChange(false);
        } else
          handleApiErrorToast(res.error);
      });
    })
  }

  useEffect(() => {
    if (open) {
      form.reset(editAssetCategory ?? defaultValues);
    }
  }, [open, editAssetCategory, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[33%]">
        <DialogHeader>
          <DialogTitle>
            {editAssetCategory ? t("editTitle") : t("addTitle")}
          </DialogTitle>
          <DialogDescription>
            {editAssetCategory ? t("editDescription") : t("addDescription")}
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
