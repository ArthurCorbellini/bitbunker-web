import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid";

const responseObject = [
  { id: 1, ucid: 1, name: "Bitcoin", symbol: "BTC", classification: "Tier S" },
  { id: 2, ucid: 1027, name: "Ethereum", symbol: "ETH", classification: "Tier A" },
  { id: 3, ucid: 5426, name: "Solana", symbol: "SOL", classification: "Tier A" },
];

export default function Tokens() {
  return (
    <div className="p-8">
      <div className="flex mb-4 items-center w-full space-x-2">
        <h1 className="text-2xl font-bold">
          Tokens
        </h1>
        <button className="px-3 py-3 bg-gray-700 rounded-full hover:bg-blue-700 transition">
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-t border-gray-800 px-4 py-2 text-left">
              <th className="px-4 py-2">
                UCID
              </th>
              <th className="px-4 py-2">
                Nome
              </th>
              <th className="px-4 py-2">
                Symbol
              </th>
              <th className="px-4 py-2">
                Classification
              </th>
              <th className="px-4 py-2 w-40 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {responseObject.map((token) => (
              <tr key={token.id} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                <td className="px-4 py-6">
                  {token.ucid}
                </td>
                <td className="px-4 py-6">
                  {token.name}
                </td>
                <td className="px-4 py-6">
                  {token.symbol}
                </td>
                <td className="px-4 py-6">
                  {token.classification}
                </td>
                <td className="px-4 py-3 space-x-2 text-center">
                  <button className="px-3 py-3 bg-gray-700 rounded-full hover:bg-blue-700 transition">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button className="px-3 py-3 bg-gray-700 rounded-full hover:bg-blue-700 transition">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}