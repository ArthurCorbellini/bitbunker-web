import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";

import { RoundedButton } from "@/components/my-ui/button";
import { Body, BodyCell, BodyRow, Header, HeaderCell, HeaderRow, Table, TableTitle } from "@/components/my-ui/data-table";
import { Token } from "@/lib/interfaces";
import { convertResponseData } from "@/lib/util/api.util";
import { urlRoot } from "@/lib/util/form.util";
import CreateToken from "./create-token";

async function fetchTokens() {
  const response = await fetch(urlRoot + "/token");
  if (response.ok)
    return await convertResponseData(response);

  throw new Error('Failed to fetch Tokens.');
}

export default async function Tokens() {
  const data: Token[] = await fetchTokens();

  return (
    <>
      <TableTitle title="Tokens">
        <CreateToken />
      </TableTitle>
      <Table>
        <Header>
          <HeaderRow>
            <HeaderCell>UCID</HeaderCell>
            <HeaderCell>Name</HeaderCell>
            <HeaderCell>Symbol</HeaderCell>
            <HeaderCell>Classification</HeaderCell>
            <HeaderCell addClassName="w-32 text-center">
              Actions
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