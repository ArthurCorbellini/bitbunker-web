import { getTranslations } from "next-intl/server";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid";

import { RoundedButton, RoundedLink } from "@/components/button";
import { Body, BodyCell, BodyRow, Header, HeaderCell, HeaderRow, Table, TableTitle } from "@/components/data-table";
import { fetchOrders } from "../_actions/fetch-orders-action";

export default async function OrderList() {
  const t = await getTranslations("shared");
  const data = await fetchOrders();

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
            <HeaderCell>{t("token")}</HeaderCell>
            <HeaderCell>{t("type")}</HeaderCell>
            <HeaderCell>{t("quantity")}</HeaderCell>
            <HeaderCell addClassName="w-32 text-center">
              {t("actions")}
            </HeaderCell>
          </HeaderRow>
        </Header>
        <Body>
          {data.map((o) => (
            <BodyRow key={o.id}>
              <BodyCell>{o.token.symbol}</BodyCell>
              <BodyCell>{o.type}</BodyCell>
              <BodyCell>{o.quantity}</BodyCell>
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