import { getTranslations } from "next-intl/server";

import { H2, Muted } from "@/components/generic/my-typography";
import { DataTable } from "./_components/DataTable";
import { FormDialog } from "./_components/FormDialog";
import { TransactionProvider } from "./_hooks/useTransaction";

export default async function Page() {
  const t = await getTranslations("common");
  const t2 = await getTranslations("transactions");

  return (
    <TransactionProvider>
      <H2>{t("transactions")}</H2>
      <Muted>{t2("transactionsLegend")}</Muted>
      <div className="flex justify-end py-4">
        <FormDialog />
      </div>
      <DataTable />
    </TransactionProvider>
  );
}
