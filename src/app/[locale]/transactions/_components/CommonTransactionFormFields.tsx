import { Pen } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import { MyDateTimePicker } from "@/components/generic/MyDateTimePicker";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

export const CommonTransactionFormFields = () => {
  const t2 = useTranslations("transactions");
  const { control } = useFormContext();

  return (
    <div className="flex gap-4 items-center">
      <div className="w-1/4">
        <FormField
          control={control}
          name="dateTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t2("dateHourTransaction")}</FormLabel>
              <FormControl>
                <MyDateTimePicker {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
      </div>
      <div className="w-3/4 ml-auto">
        <FormField
          control={control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t2("notes")}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Pen /> {t2("notesButton")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={t2("notesPlaceholder")}
                      className="h-32" />
                  </FormControl>
                </PopoverContent>
              </Popover>
            </FormItem>
          )} />
      </div>
    </div>
  );
}