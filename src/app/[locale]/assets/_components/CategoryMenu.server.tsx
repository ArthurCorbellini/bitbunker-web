
import { assetCategoryApi } from "@/core/api/asset-category.api";
import { ApiErrorToast } from "../../_components/common/ApiErrorToast";
import { CategoryMenuClient } from "./CategoryMenu.client";

export const CategoryMenuServer = async () => {
  const response = await assetCategoryApi.fetchAll({
    tags: [
      "createAssetCategory"
    ]
  });

  return (
    <>
      <ApiErrorToast error={response.error} />
      <CategoryMenuClient data={response.data} />
    </>
  );
}