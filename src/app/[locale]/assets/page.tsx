import { getTranslations } from "next-intl/server";

import { H2, Muted } from "@/components/generic/my-typography";
import { AssetService } from "@/core/services/AssetService";
import { DataTable } from "./_components/DataTable";
import { FormDialog } from "./_components/FormDialog";

export default async function Page() {
  const t = await getTranslations("common");
  const t2 = await getTranslations("assets");
  const response = await AssetService.fetchAssets({
    tags: ["createAsset"]
  });

  return (
    <>
      <H2>{t("assets")}</H2>
      <Muted>{t2("legend")}</Muted>
      <div className="flex justify-end py-4">
        <FormDialog />
      </div>
      <DataTable response={response} />
    </>
  );
}