import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { flexRender, Table } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

interface Props<TData> {
  t: ReturnType<typeof useTranslations>,
  table: Table<TData>,
}

export function Body<TData>({ t, table }: Props<TData>) {
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} width={cell.column.columnDef.size}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
            {t("noResults")}.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}