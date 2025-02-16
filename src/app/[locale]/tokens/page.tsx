import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";

import { RoundedButton } from "@/components/button";
import { Body, BodyCell, BodyRow, Header, HeaderCell, HeaderRow, Table, TableTitle } from "@/components/data-table";

import { getTranslations } from "next-intl/server";
import { fetchTokens } from "./_actions/fetch-tokens-action";
import CreateToken from "./_components/create-token";

export default async function Tokens() {
  const t = await getTranslations("shared");
  const data = await fetchTokens();

  return (
    <>
      <TableTitle title={t("tokens")}>
        <CreateToken />
      </TableTitle>
      <Table>
        <Header>
          <HeaderRow>
            <HeaderCell>{t("ucid")}</HeaderCell>
            <HeaderCell>{t("name")}</HeaderCell>
            <HeaderCell>{t("symbol")}</HeaderCell>
            <HeaderCell>{t("classification")}</HeaderCell>
            <HeaderCell addClassName="w-32 text-center">
              {t("actions")}
            </HeaderCell>
          </HeaderRow>
        </Header>
        <Body>
          {data.map((token) => (
            <BodyRow key={token.ucid}>
              <BodyCell>{token.ucid}</BodyCell>
              <BodyCell>{token.name}</BodyCell>
              <BodyCell>{token.symbol}</BodyCell>
              <BodyCell>{token.classification}</BodyCell>
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