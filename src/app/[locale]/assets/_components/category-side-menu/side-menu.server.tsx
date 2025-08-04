
import { ApiErrorToast } from "@/app/[locale]/_components/common/ApiErrorToast";
import { assetCategoryApi } from "@/core/api/asset-category.api";
import { SideMenuClient } from "./side-menu.client";

export const SideMenuServer = async () => {
  const response = await assetCategoryApi.getAll({
    tags: ["categories"]
  });

  return (
    <>
      <ApiErrorToast error={response.error} />
      <SideMenuClient data={response.data} />
    </>
  );
}