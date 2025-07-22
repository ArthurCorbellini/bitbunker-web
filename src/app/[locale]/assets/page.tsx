import { getTranslations } from "next-intl/server";

import { H2, Muted } from "@/components/generic/my-typography";
import { AssetService } from "@/core/services/AssetService";
import { AssetDataTable } from "./_components/AssetDataTable";
import { AssetFormDialog } from "./_components/AssetFormDialog";

export default async function Page() {
  const t = await getTranslations("assets");
  const assetApiResponse = await AssetService.fetchAssets({
    tags: ["createAsset"]
  });

  return (
    <>
      <H2>{t("title")}</H2>
      <Muted>{t("legend")}</Muted>
      <div className="flex justify-end py-4">
        <AssetFormDialog />
      </div>
      <AssetDataTable response={assetApiResponse} />
    </>
  );
}