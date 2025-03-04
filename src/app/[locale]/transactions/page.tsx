import { getTranslations } from "next-intl/server";

import { H2, Muted } from "@/components/global/my-typography";
import { transactionService } from "@/lib/api/transactionService";
import { DataTable } from "./_components/DataTable";
import { FormDialog } from "./_components/FormDialog";
import { TransactionProvider } from "./_hooks/useTransaction";

export default async function Page() {
  const t = await getTranslations("common");
  const t2 = await getTranslations("transactions");
  const response = await transactionService.fetch();

  if (!response.success) {
    //to-do notificação
    response.error
  }

  return (
    <TransactionProvider>
      <H2>{t("transactions")}</H2>
      <Muted>{t2("transactionsLegend")}</Muted>
      <div className="flex justify-end py-4">
        <FormDialog />
      </div>
      {response.data && <DataTable data={response.data} />}
    </TransactionProvider>
  );

}