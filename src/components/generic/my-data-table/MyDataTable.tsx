"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { flexRender, Table as TanstackTable } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Settings2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface DataTableProps<TData> {
  table: TanstackTable<TData>,
}

interface GeneralProps<TData> {
  t: ReturnType<typeof useTranslations>,
  table: TanstackTable<TData>,
}

export function MyDataTable<TData>({ table, }: DataTableProps<TData>) {
  const t = useTranslations("globalComponents.myDataTable");

  const [rowsSelected, setRowsSelected] = useState(0);
  const [numberOfRows, setNumberOfRows] = useState(0);

  useEffect(() => {
    setRowsSelected(table.getFilteredSelectedRowModel().rows.length);
    setNumberOfRows(table.getFilteredRowModel().rows.length);
  }, [table]);

  return (
    <div>
      <div className="flex items-center py-4">
        <Options t={t} table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
          <Header t={t} table={table} />
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

function Header<TData>({ table }: GeneralProps<TData>) {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
}

function Body<TData>({ t, table }: GeneralProps<TData>) {
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

function Options<TData>({ t, table, }: GeneralProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex">
          <Settings2 />
          {t("view")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>{t("toggleColumns")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                {column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function Pagination<TData>({ t, table }: GeneralProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const numberOfPages = table.getPageCount();

  return (
    <div className="flex items-center space-x-6 lg:space-x-8">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">{t("rowsPerPage")}</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value))
          }}>
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 50, 100, 500].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        {`${t("page")} ${currentPage} ${t("of")} ${numberOfPages}`}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}>
          <span className="sr-only">{t("goFirstPage")}</span>
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}>
          <span className="sr-only">{t("goPreviousPage")}</span>
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}>
          <span className="sr-only">{t("goNextPage")}</span>
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}>
          <span className="sr-only">{t("goLastPage")}</span>
          <ChevronsRight />
        </Button>
      </div>
    </div>
  )
}
