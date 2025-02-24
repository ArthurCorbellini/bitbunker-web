"use client"

import { DataTable } from "@/components/global/data-table/data-table";
import { useDataTable } from "@/components/global/data-table/hooks/useDataTable";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Order } from "@/lib/types/order-type";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";

export const OrderDataTable = ({
  data,
}: {
  data: Order[]
}) => {
  const t = useTranslations("global");
  const t2 = useTranslations("orders");

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "asset.symbol",
      header: t2("asset"),
    },
    {
      accessorKey: "type",
      header: t2("type"),
    },
    {
      accessorKey: "quantity",
      header: t("quantity"),
    },
    {
      accessorKey: "brlQuantity",
      header: () => <div className="text-right">{t2("brl")}</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("brlQuantity"))
        const formatted = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(amount)

        return <div className="text-right">{formatted}</div>
      },
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

  const { table } = useDataTable({ columns, data })

  return (
    <DataTable table={table} />
  );
}