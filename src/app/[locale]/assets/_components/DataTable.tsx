"use client"

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { Asset } from "@/api/types/asset";
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
import { useAsset } from "../_hooks/useAsset";

export const DataTable = () => {
  const t = useTranslations("common");
  const t2 = useTranslations("assets");
  const { assets, loadAssets } = useAsset();

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
      accessorKey: "classification",
      header: t2("classification"),
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

  const { table } = useDataTable({ columns, data: assets.data })

  useEffect(() => {
    loadAssets()
  }, [])

  return (
    <MyDataTable table={table} />
  );
}