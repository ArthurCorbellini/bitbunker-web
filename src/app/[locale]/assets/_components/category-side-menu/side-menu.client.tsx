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

  const commonStyle = "p-2 rounded-md hover:bg-accent hover:text-accent-foreground";
  const activeStyle = "bg-accent text-accent-foreground"

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

              <MoreButton category={c} />
            </article>
          </Link>
        )
      })}

      <AddButton />
    </div>
  );
}