"use client"

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

import { useToast } from "@/components/generic/hooks/useToast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { createAssetCategory } from "../_actions/createAssetCategory";
import { CreateAssetCategoryFormType, useSchema } from "../_hooks/useSchema";

export const CategoryFormModal = () => {
  const t = useTranslations("categoryMenu");
  const { CreateAssetCategoryFormSchema } = useSchema();
  const { successToast, handleApiErrorToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateAssetCategoryFormType>({
    resolver: zodResolver(CreateAssetCategoryFormSchema),
    defaultValues: {
      name: "",
      recommendedPercentage: 0,
    }
  })

  const onSubmit = (values: CreateAssetCategoryFormType) => {
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

      </DialogContent>
    </Dialog>
  )
}
