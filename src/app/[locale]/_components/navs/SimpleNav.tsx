import { Link, usePathname } from "@/i18n/routing";
import { LucideIcon } from "lucide-react";

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

export const SimpleNav = ({
  groupLabel,
  items,
  ...props
}: {
  groupLabel?: string,
  items: {
    label: string,
    url: string,
    icon: LucideIcon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) => {
  const isActive = (url: string) => {
    return usePathname().startsWith(url);
  }

  return (
    <SidebarGroup {...props}>
      {groupLabel &&
        <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>
      }
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.label}>
            <SidebarMenuButton
              asChild
              tooltip={item.label}
              isActive={isActive(item.url)}>
              <Link href={item.url}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}