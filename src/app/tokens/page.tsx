import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";

import { RoundedButton } from "@/components/my-ui/button";
import {
  Body,
  BodyCell,
  BodyCellActions,
  BodyRow,
  Header,
  HeaderCell,
  HeaderCellActions,
  HeaderRow,
  Table,
  TableTitle
} from "@/components/my-ui/data-table";
import CreateToken from "./create-token";

interface Token {
  ucid: number;
  name: string;
  symbol: string;
  classification: string;
}

export default async function Tokens() {
  const url = process.env.API_URL;
  if (!url)
    throw new Error('API_URL is not defined in environment variables.');

  const response = await fetch(url + "/token");
  if (!response.ok)
    throw new Error('Failed to fetch Tokens.');

  const data: Token[] = await response.json();

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
            <HeaderCellActions>Actions</HeaderCellActions>
          </HeaderRow>
        </Header>
        <Body>
          {data.map((token) => (
            <BodyRow key={token.ucid}>
              <BodyCell>{token.ucid}</BodyCell>
              <BodyCell>{token.name}</BodyCell>
              <BodyCell>{token.symbol}</BodyCell>
              <BodyCell>{token.classification}</BodyCell>
              <BodyCellActions>
                <RoundedButton>
                  <PencilIcon className="h-5 w-5" />
                </RoundedButton>
                <RoundedButton>
                  <TrashIcon className="h-5 w-5" />
                </RoundedButton>
              </BodyCellActions>
            </BodyRow>
          ))}
        </Body>
      </Table>
    </>
  );
}