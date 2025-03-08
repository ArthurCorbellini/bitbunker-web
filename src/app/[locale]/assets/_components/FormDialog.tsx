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

export const FormDialog = () => {
  const t = useTranslations("assets");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus /> {t("addButton")}
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[75%]">
        <DialogHeader>
          <DialogTitle>
            {t("addTitle")}
          </DialogTitle>
          <DialogDescription>
            {t("addDescription")}
          </DialogDescription>
        </DialogHeader>
        to-do
      </DialogContent>
    </Dialog >
  )
}
