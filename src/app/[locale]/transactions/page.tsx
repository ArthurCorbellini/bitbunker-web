import { getTranslations } from "next-intl/server";

import { H2, Muted } from "@/components/global/typography";
import { transactionService } from "@/lib/api/transactionService";
import { DataTable } from "./_components/DataTable";
import { FormDialog } from "./_components/FormDialog";

export default async function Page() {
  const t = await getTranslations("common");
  const t2 = await getTranslations("transactions");
  const response = await transactionService.fetch();

  if (!response.success) {
    //to-do notificação
    response.error
  }

  return (
    <>
      <H2>{t("transactions")}</H2>
      <Muted>{t2("transactionsLegend")}</Muted>
      <div className="flex justify-end py-4">
        <FormDialog />
      </div>
      {response.data &&
        <DataTable data={response.data} />
      }
    </>
  );

}