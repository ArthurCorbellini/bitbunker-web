"use client"

import { Table as TanstackTable } from "@tanstack/react-table"

import { Table } from "@/components/ui/table"
import { useTranslations } from "next-intl"
import { Body } from "./body"
import { Header } from "./header"
import { Options } from "./options"
import { Pagination } from "./pagination"

interface Props<TData> {
  table: TanstackTable<TData>,
}

export function DataTable<TData>({ table, }: Props<TData>) {
  const t = useTranslations("globalComponents.dataTable");

  const rowsSelected = table.getFilteredSelectedRowModel().rows.length;
  const numberOfRows = table.getFilteredRowModel().rows.length;

  return (
    <div>
      <div className="flex items-center py-4">
        <Options t={t} table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
          <Header table={table} />
          <Body t={t} table={table} />
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="flex-1 text-sm text-muted-foreground px-4">
          {`${rowsSelected} ${t("of")} ${numberOfRows} ${t("rowsSelected")}.`}
        </div>
        <Pagination t={t} table={table} />
      </div>
    </div>
  )
}
