import { useLocale } from "next-intl";

export const useLocaleFormat = () => {
  const locale = useLocale();

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: locale === "en",
    }).format(new Date(date));
  };

  return {
    formatDateTime
  };
}