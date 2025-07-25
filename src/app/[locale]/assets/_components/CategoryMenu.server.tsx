import { AssetCategoryService } from "@/core/services/AssetCategoryService";
import { ApiErrorToast } from "../../_components/common/ApiErrorToast";
import { CategoryMenuClient } from "./CategoryMenu.client";

export const CategoryMenuServer = async () => {
  const response = await AssetCategoryService.fetchAll({
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