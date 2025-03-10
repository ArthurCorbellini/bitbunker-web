"use client"

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useAsset } from "../_hooks/useAsset";

export const FormDialog = () => {
  const t = useTranslations("common");
  const t2 = useTranslations("assets");
  const {
    isLoading,
    typeComboboxOptions,
    classificationComboboxOptions,
    create
  } = useAsset();

  const FormSchema = z.object({
    ucid: z
      .number(),
    name: z
      .string(),
    symbol: z
      .string(),
    type: z
      .string(),
    classification: z
      .string(),
  });

  type FormRequest = z.infer<typeof FormSchema>;

  const form = useForm<FormRequest>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ucid: undefined,
      name: "",
      symbol: "",
      type: "",
      classification: "",
    }
  })

  const onSubmit = (values: FormRequest) => {
    create(values);
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
                          decimalPlaces={0}
                          placeholder=""
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
