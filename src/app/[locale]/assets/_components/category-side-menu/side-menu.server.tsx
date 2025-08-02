
import { assetCategoryApi } from "@/core/api/asset-category.api";
import { ApiErrorToast } from "../../../_components/common/ApiErrorToast";
import { SideMenuClient } from "./side-menu.client";

export const SideMenuServer = async () => {
  const response = await assetCategoryApi.getAll({
    tags: [
      "saveAssetCategory"
    ]
  });

  return (
    <>
      <ApiErrorToast error={response.error} />
      <SideMenuClient data={response.data} />
    </>
  );
}