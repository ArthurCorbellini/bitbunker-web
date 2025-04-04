import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "./mode-toggle"

export const AppHeader = () => {
  return (
    <header className="sticky p-4 flex">
      <SidebarTrigger className="-ml-1" />
      <ModeToggle />
    </header>
  )
}