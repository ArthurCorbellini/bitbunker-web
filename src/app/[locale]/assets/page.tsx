import { getTranslations } from "next-intl/server";

import { H2, Muted } from "@/components/global/my-typography";
import { assetService } from "@/lib/api/assetService";
import { DataTable } from "./_components/DataTable";
import { FormDialog } from "./_components/FormDialog";

export default async function Page() {
  const t = await getTranslations("common");
  const t2 = await getTranslations("assets");
  const response = await assetService.fetchAll();

  if (!response.success) {
    //to-do notificação
    response.error
  }

  return (
    <>
      <H2>{t("assets")}</H2>
      <Muted>{t2("legend")}</Muted>
      <div className="flex justify-end py-4">
        <FormDialog />
      </div>
      {response.data && <DataTable data={response.data} />}
    </>
  );
}