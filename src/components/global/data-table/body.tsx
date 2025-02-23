import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ColumnDef, flexRender, Table } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

interface Props<TData, TValue> {
  t: ReturnType<typeof useTranslations>,
  columns: ColumnDef<TData, TValue>[],
  table: Table<TData>,
}

export function Body<TData, TValue>({ t, columns, table }: Props<TData, TValue>) {
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            {t("noResults")}.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}