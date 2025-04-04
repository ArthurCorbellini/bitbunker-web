"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader
} from "@/components/ui/sidebar"
import { ArrowRightLeftIcon, BitcoinIcon, CircleHelpIcon, ClipboardListIcon, FileUpIcon, LayoutDashboardIcon, SettingsIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { SimpleNav } from "./navs/SimpleNav"

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const t = useTranslations("sidebar");

  const generalMenu = [
    {
      label: t("dashboard"),
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      label: t("transactions"),
      url: "/transactions",
      icon: ArrowRightLeftIcon,
    },
    {
      label: t("assets"),
      url: "/assets",
      icon: BitcoinIcon,
    },
  ]

  const toolsMenu = [
    {
      label: t("reports"),
      url: "#",
      icon: ClipboardListIcon,
    },
    {
      label: t("dataImport"),
      url: "#",
      icon: FileUpIcon,
    },
  ]

  const bottomMenu = [
    {
      label: t("settings"),
      url: "#",
      icon: SettingsIcon,
    },
    {
      label: t("getHelp"),
      url: "#",
      icon: CircleHelpIcon,
    },
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        header
      </SidebarHeader>
      <SidebarContent>
        <SimpleNav groupLabel={t("general")} items={generalMenu} />
        <SimpleNav groupLabel={t("tools")} items={toolsMenu} />
        <SimpleNav items={bottomMenu} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        footer
      </SidebarFooter>
    </Sidebar>
  )
}
