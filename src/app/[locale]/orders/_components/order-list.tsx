import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import { getTranslations } from "next-intl/server";

import { RoundedButton, RoundedLink } from "@/components/legacy/button";
import { Body, BodyCell, BodyRow, Header, HeaderCell, HeaderRow, Table, TableTitle } from "@/components/legacy/data-table";
import { orderApi } from "@/lib/api/order-api";

export default async function OrderList() {
  const t = await getTranslations("shared");
  const t2 = await getTranslations("OrderList");
  const response = await orderApi.fetchOrders();

  if (!response.success) {
    //to-do notificação
    response.error
  }

  return (
    <>
      <TableTitle title={t("orders")}>
        <RoundedLink href="/orders/create">
          <PlusIcon className="h-5 w-5" />
        </RoundedLink>
      </TableTitle>
      <Table>
        <Header>
          <HeaderRow>
            <HeaderCell>{t("asset")}</HeaderCell>
            <HeaderCell>{t("type")}</HeaderCell>
            <HeaderCell>{t("quantity")}</HeaderCell>
            <HeaderCell>{t2("brlQuantity")}</HeaderCell>
            <HeaderCell>{t2("notes")}</HeaderCell>
            <HeaderCell addClassName="w-32 text-center">
              {t("actions")}
            </HeaderCell>
          </HeaderRow>
        </Header>
        <Body>
          {response.data?.map((o) => (
            <BodyRow key={o.id}>
              <BodyCell>{o.asset.symbol}</BodyCell>
              <BodyCell>{o.type}</BodyCell>
              <BodyCell>{o.quantity}</BodyCell>
              <BodyCell>{o.brlQuantity}</BodyCell>
              <BodyCell>{o.notes}</BodyCell>
              <BodyCell addClassName="w-32 text-center">
                <RoundedButton>
                  <PencilIcon className="h-5 w-5" />
                </RoundedButton>
                <RoundedButton>
                  <TrashIcon className="h-5 w-5" />
                </RoundedButton>
              </BodyCell>
            </BodyRow>
          ))}
        </Body>
      </Table>
    </>
  );
}