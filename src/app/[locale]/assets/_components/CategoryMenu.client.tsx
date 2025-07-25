"use client"

import { H4, Muted, P } from "@/components/generic/my-typography";
import { AssetCategory } from "@/core/types/asset-category";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/utils/shadcn-utils";
import { toPercent } from "@/utils/string-utils";
import { useTranslations } from "next-intl";
import { CategoryFormModal } from "./CategoryFormModal";

export const CategoryMenuClient = ({ data }: {
  data?: AssetCategory[]
}) => {
  const t = useTranslations("categoryMenu");
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2">
      <Link
        href={`/assets`}
        className={cn(
          "p-2 rounded-md hover:bg-accent hover:text-accent-foreground",
          pathname === "/assets" && "bg-accent text-accent-foreground"
        )}
      >
        <article>
          <P>{t("overview")}</P>
        </article>
      </Link>

      <H4 className="py-2">{t("title")}</H4>

      {data?.map((c) => {
        const href = `/assets/categories/${c.id}`;
        const active = pathname === href;
        return (
          <Link
            href={href}
            key={c.id}
            className={cn(
              "p-2 rounded-md hover:bg-accent hover:text-accent-foreground",
              active && "bg-accent text-accent-foreground"
            )}
          >
            <article>
              <P>{c.name}</P>
              <Muted>{t("dataCardLegend")}: {toPercent(c.recommendedPercentage)}</Muted>
            </article>
          </Link>
        )
      })}

      <CategoryFormModal />
    </div>
  );
}