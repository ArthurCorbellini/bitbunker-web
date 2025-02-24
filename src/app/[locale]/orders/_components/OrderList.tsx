import { H2, Lead } from "@/components/global/typography";
import { Button } from "@/components/ui/button";
import { orderApi } from "@/lib/api/order-api";
import { Plus } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { OrderDataTable } from "./OrderDataTable";

export const OrderList = async () => {
  const t = await getTranslations("orders");
  const response = await orderApi.fetchOrders();

  if (!response.success) {
    //to-do notificação
    response.error
  }

  return (
    <>
      <H2>{t("transactions")}</H2>
      <Lead>{t("transactionsLegend")}</Lead>

      <div className="flex justify-end py-4">
        <Button>
          <Plus /> {t("addTransactions")}
        </Button>
      </div>
      {response.data &&
        <OrderDataTable data={response.data} />
      }
    </>
  );
}