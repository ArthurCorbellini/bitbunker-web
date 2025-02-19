import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";

import { RoundedButton } from "@/components/legacy/button";
import { Body, BodyCell, BodyRow, Header, HeaderCell, HeaderRow, Table, TableTitle } from "@/components/legacy/data-table";

import { getTranslations } from "next-intl/server";
import { fetchAssets } from "./_actions/fetch-assets-action";
import CreateAsset from "./_components/create-asset";

export default async function Assets() {
  const t = await getTranslations("shared");
  const data = await fetchAssets();

  return (
    <>
      <TableTitle title={t("assets")}>
        <CreateAsset />
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
          {data.map((asset) => (
            <BodyRow key={asset.ucid}>
              <BodyCell>{asset.ucid}</BodyCell>
              <BodyCell>{asset.name}</BodyCell>
              <BodyCell>{asset.symbol}</BodyCell>
              <BodyCell>{asset.classification}</BodyCell>
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