"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"
import * as React from "react"

import { Table } from "@/components/ui/table"
import { useTranslations } from "next-intl"
import { Body } from "./body"
import { Header } from "./header"
import { Options } from "./options"
import { Pagination } from "./pagination"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const t = useTranslations("globalComponents.dataTable");

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

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
          <Body t={t} columns={columns} table={table} />
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
