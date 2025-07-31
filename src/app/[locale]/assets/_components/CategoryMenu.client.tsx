"use client"

import { useTranslations } from "next-intl";

import { H4, Muted, P } from "@/components/generic/my-typography";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AssetCategory } from "@/core/types/asset-category";
import { useNumberFormat } from "@/hooks/use-number-format";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/utils/shadcn-utils";
import { MoreHorizontal, PenIcon, Plus, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { CategoryFormModal } from "./CategoryFormModal";

export const CategoryMenuClient = ({ data }: {
  data?: AssetCategory[]
}) => {
  const t = useTranslations("categoryMenu");
  const pathname = usePathname();
  const { formatPercent } = useNumberFormat();
  const [open, setOpen] = useState(false)
  const [assetCategory, setAssetCategory] = useState<AssetCategory>();

  const commonStyle = "p-2 rounded-md hover:bg-accent hover:text-accent-foreground";
  const activeStyle = "bg-accent text-accent-foreground"

  const openModal = (category?: AssetCategory) => {
    setAssetCategory(category);
    setOpen(true);
  }

  return (
    <div className="flex flex-col gap-2">
      <Link href={`/assets`}>
        <article className={cn(commonStyle, pathname === "/assets" && activeStyle)}>
          <P>{t("overview")}</P>
        </article>
      </Link>

      <H4>{t("title")}</H4>

      {data?.map((c) => {
        const href = `/assets/categories/${c.id}`;
        const active = pathname === href;
        return (
          <Link key={c.id} href={href}>
            <article className={cn("flex justify-between items-center", commonStyle, active && activeStyle)}>
              <div>
                <P>{c.name}</P>
                <Muted>{t("dataCardLegend")}: {formatPercent(c.recommendedPercentage, 2)}</Muted>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="link" size="icon">
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => openModal(c)}>
                    <PenIcon />
                    {t("edit")}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trash2Icon />
                    {t("delete")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </article>
          </Link>
        )
      })}

      <Button onClick={() => openModal()}>
        <Plus /> {t("addButton")}
      </Button>

      <CategoryFormModal
        open={open}
        onOpenChange={setOpen}
        editAssetCategory={assetCategory} />
    </div>
  );
}