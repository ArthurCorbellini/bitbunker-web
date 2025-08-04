"use client"

import { useTranslations } from "next-intl";

import { H4, Muted, P } from "@/components/generic/my-typography";
import { AssetCategory } from "@/core/types/asset-category";
import { useNumberFormat } from "@/hooks/use-number-format";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/utils/shadcn-utils";
import { AddButton } from "./add-button";
import { MoreButton } from "./more-button";

export const SideMenuClient = ({ data }: {
  data?: AssetCategory[]
}) => {
  const t = useTranslations("categoryMenu");
  const pathname = usePathname();
  const { formatPercent } = useNumberFormat();

  const commonStyle = "rounded-md hover:bg-accent hover:text-accent-foreground";
  const activeStyle = "bg-accent text-accent-foreground"

  return (
    <div className="flex flex-col gap-2">
      <Link href={`/assets`} className={cn("p-2", commonStyle, pathname === "/assets" && activeStyle)}>
        <P>{t("overview")}</P>
      </Link>

      <H4>{t("title")}</H4>

      {data?.map((c) => {
        const href = `/assets/categories/${c.id}`;
        const active = pathname === href;
        return (
          <li
            key={c.id}
            className={cn("relative flex items-center", commonStyle, active && activeStyle)}
          >
            <Link href={href} className="p-2 flex-1">
              <P>{c.name}</P>
              <Muted>{t("dataCardLegend")}: {formatPercent(c.recommendedPercentage, 2)}</Muted>
            </Link>
            <MoreButton category={c} className="absolute right-2 top-1/2 -translate-y-1/2" />
          </li>
        )
      })}
      <AddButton />
    </div>
  );
}