import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";

import { RoundedButton } from "@/components/my-ui/button";
import {
  Body,
  BodyCell,
  BodyRow,
  Header,
  HeaderCell,
  HeaderRow,
  Table,
  TableTitle
} from "@/components/my-ui/data-table";

import { Token } from "@/lib/interfaces";
import CreateToken from "./create-token";

const testData = [
  { ucid: 1, name: "Bitcoin", symbol: "BTC", classification: "Tier S" },
  { ucid: 1027, name: "Ethereum", symbol: "ETH", classification: "Tier A" },
  { ucid: 5426, name: "Solana", symbol: "SOL", classification: "Tier A" },
];

async function fetchTokens() {
  const url = process.env.API_URL;
  if (!url)
    throw new Error('API_URL is not defined in environment variables.');

  const response = await fetch(url + "/token");
  if (!response.ok)
    throw new Error('Failed to fetch Tokens.');

  return await response.json();
}

export default async function Tokens() {
  // const data: Token[] = testData;
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