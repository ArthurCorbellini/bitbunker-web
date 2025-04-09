"use client"

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";

import { useToast } from "@/components/generic/hooks/useToast";
import { useDataTable } from "@/components/generic/my-data-table/hooks/useDataTable";
import { MyDataTable } from "@/components/generic/my-data-table/MyDataTable";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ApiResponse } from "@/core/types/api";
import { Asset } from "@/core/types/asset";
import { useEffect } from "react";

export const DataTable = ({ response }: {
  response: ApiResponse<Asset[]>
}) => {
  const t = useTranslations("common");
  const t2 = useTranslations("assets");
  const { handleApiErrorToast } = useToast();

  const columns: ColumnDef<Asset>[] = [
    {
      accessorKey: "ucid",
      header: t2("ucid"),
    },
    {
      accessorKey: "name",
      header: t("name"),
    },
    {
      accessorKey: "symbol",
      header: t("symbol"),
    },
    {
      accessorKey: "type",
      header: t("type"),
    },
    {
      accessorKey: "tier",
      header: t2("tier"),
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