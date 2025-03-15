"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CreateAsset } from "@/api/types/asset";
import { MyCombobox } from "@/components/global/my-combobox";
import { MyForm } from "@/components/global/my-form";
import { MyInputNumber } from "@/components/global/my-inputs/MyInputNumber";
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
import { useAsset } from "../_hooks/useAsset";

export const FormDialog = () => {
  const t = useTranslations("common");
  const t2 = useTranslations("assets");
  const tz = useTranslations("zodErrors");
  const {
    isLoading,
    typeComboboxOptions,
    classificationComboboxOptions,
    create
  } = useAsset();

  const FormSchema = z.object({
    ucid: z.string().min(1, tz("notEmpty")),
    name: z.string().min(1, tz("notEmpty")),
    symbol: z.string().min(1, tz("notEmpty")),
    type: z.string().min(1, tz("notEmpty")),
    classification: z.string().min(1, tz("notEmpty")),
  });

  type FormType = z.infer<typeof FormSchema>;

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ucid: "",
      name: "",
      symbol: "",
      type: "",
      classification: "",
    }
  })

  const onSubmit = (values: FormType) => {
    create(values as CreateAsset);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus /> {t2("addButton")}
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[33%]">
        <DialogHeader>
          <DialogTitle>
            {t2("addTitle")}
          </DialogTitle>
          <DialogDescription>
            {t2("addDescription")}
          </DialogDescription>
        </DialogHeader>
        <MyForm form={form} onSubmit={onSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="w-1/3">
                <FormField
                  control={form.control}
                  name="ucid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t2("ucid")}</FormLabel>
                      <FormControl>
                        <MyInputNumber
                          type="string"
                          decimalPlaces={0}
                          value={field.value}
                          onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
              </div>
              <div className="w-2/3">
                <FormField
                  control={form.control}
                  name="symbol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("symbol")}</FormLabel>
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
            <div className="w-full">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("type")}</FormLabel>
                    <FormControl>
                      <MyCombobox
                        onSelect={field.onChange}
                        options={typeComboboxOptions}
                        placeholder={t2("selectType")}
                        emptyMessage={t2("selectTypeEmpty")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="classification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t2("classification")}</FormLabel>
                    <FormControl>
                      <MyCombobox
                        onSelect={field.onChange}
                        options={classificationComboboxOptions}
                        placeholder={t2("selectClassification")}
                        emptyMessage={t2("selectClassificationEmpty")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{t2("save")}</Button>
          </DialogFooter>
        </MyForm>
      </DialogContent>
    </Dialog >
  )
}
