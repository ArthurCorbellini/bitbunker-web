"use client"

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { useToast } from "@/components/generic/hooks/useToast";
import { MyDataTable } from "@/components/generic/my-data-table/MyDataTable";
import { useDataTable } from "@/components/generic/my-data-table/hooks/useDataTable";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ApiPayload } from "@/core/types/api";
import { Transaction } from "@/core/types/transaction";
import { convertCurrency, formatDate } from "@/utils/string-utils";

export const DataTable = ({ response }: {
  response: ApiPayload<Transaction[]>
}) => {
  const t = useTranslations("common");
  const { handleApiErrorToast } = useToast();

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "dateTime",
      header: t("date"),
      cell: ({ row }) => (formatDate(row.getValue("dateTime")))
    },
    {
      accessorKey: "asset.symbol",
      header: t("asset"),
    },
    {
      accessorKey: "type",
      header: t("type"),
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">{t("amount")}</div>,
      cell: ({ row }) => (
        <div className="text-right">
          {row.getValue("amount")}
        </div>
      )
    },
    {
      accessorKey: "unitPrice",
      header: () => <div className="text-right">{t("unitPrice")}</div>,
      cell: ({ row }) => (
        <div className="text-right">
          {convertCurrency(row.getValue("unitPrice"), "USD")}
        </div >
      )
    },
    {
      accessorKey: "totalValue",
      header: () => <div className="text-right">{t("totalValue")}</div>,
      cell: ({ row }) => (
        <div className="text-right">
          {convertCurrency(row.getValue("totalValue"), "USD")}
        </div >
      )
    },
    {
      id: "actions",
      size: 30,
      cell: ({ row }) => {
        // const order = row.original
        return (
          <div className="text-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{t("edit")}</DropdownMenuItem>
                <DropdownMenuItem>{t("delete")}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]

  const { table } = useDataTable({ columns, data: response.data })

  useEffect(() => {
    if (response.error)
      handleApiErrorToast(response.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response.error])

  return (
    <MyDataTable table={table} />
  );
}