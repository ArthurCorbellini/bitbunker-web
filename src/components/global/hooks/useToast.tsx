import { ApiResponseError } from "@/api/core/api-types";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export const useToast = () => {
  const t = useTranslations("globalComponents.toast");

  const handleApiErrorToast = (apiError: ApiResponseError | null) => {
    if (apiError?.display)
      apiError.messages.forEach(e => errorToast(e));
    else
      errorToast(t("defaultErrorMessage"));
  }

  const successToast = (description: string) => {
    toast.success(t("success"), { description })
  }

  const errorToast = (description: string) => {
    toast.error(t("error"), { description })
  }

  const warningToast = (description: string) => {
    toast.warning(t("warning"), { description })
  }

  const infoToast = (description: string) => {
    toast.info(t("info"), { description })
  }

  const loadingToast = (description: string) => {
    toast.loading(t("loading"), { description })
  }

  return {
    successToast,
    errorToast,
    warningToast,
    infoToast,
    loadingToast,
    handleApiErrorToast,
  };
}
