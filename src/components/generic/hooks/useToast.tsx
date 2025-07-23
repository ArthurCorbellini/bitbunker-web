import { ApiError } from "@/core/types/api";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { toast } from "sonner";

export const useToast = () => {
  const t = useTranslations("globalComponents.toast");

  const handleApiErrorToast = (apiError: ApiError | null) => {
    if (apiError?.display)
      errorToast(
        apiError.messages.length > 1 ? (
          apiError.messages.map((p, index) => (
            <p key={index}>• {p}</p>
          ))
        ) : (
          <p>{apiError.messages[0]}</p>
        )
      );
    else
      errorToast(t("defaultErrorMessage"));
  }

  const successToast = (description: ReactNode) => {
    toast.success(t("success"), { description })
  }

  const errorToast = (description: ReactNode) => {
    toast.error(t("error"), { description })
  }

  const warningToast = (description: ReactNode) => {
    toast.warning(t("warning"), { description })
  }

  const infoToast = (description: ReactNode) => {
    toast.info(t("info"), { description })
  }

  const loadingToast = (description: ReactNode) => {
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
