import { ReactNode } from "react";

const TableTitle = ({ title, children }: {
  title: string,
  children?: ReactNode
}) => {
  return (
    <div className="flex mb-4 items-center w-full space-x-2">
      <h1 className="text-2xl font-bold">
        {title}
      </h1>
      {children}
    </div>
  );
}

const Table = ({ children }: { children: ReactNode }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        {children}
      </table>
    </div>
  );
}

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <thead>
      {children}
    </thead>
  );
}

const HeaderRow = ({ children }: { children: ReactNode }) => {
  return (
    <tr className="border-b border-t border-gray-800 px-4 py-2 text-left">
      {children}
    </tr>
  );
}

const HeaderCell = ({ children }: { children: ReactNode }) => {
  return (
    <th className="px-4 py-2">
      {children}
    </th>
  );
}

const HeaderCellActions = ({ children }: { children: ReactNode }) => {
  return (
    <th className="px-4 py-2 w-40 text-center">
      {children}
    </th>
  );
}

const Body = ({ children }: { children: ReactNode }) => {
  return (
    <tbody>
      {children}
    </tbody>
  );
}

const BodyRow = ({ children }: { children: ReactNode }) => {
  return (
    <tr className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
      {children}
    </tr>
  );
}

const BodyCell = ({ children }: { children: ReactNode }) => {
  return (
    <td className="px-4 py-6">
      {children}
    </td>
  );
}

const BodyCellActions = ({ children }: { children: ReactNode }) => {
  return (
    <td className="px-4 py-3 space-x-2 text-center">
      {children}
    </td>
  );
}

export {
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
};

