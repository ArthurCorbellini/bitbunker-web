import { useTranslations } from "next-intl";
import Image from "next/image";

import { Link } from "@/i18n/routing";
import { ModeToggle } from "./mode-toggle";
import NavLink from "./nav-link";

export default function MainHeader() {
  const t = useTranslations("shared");

  return (
    <header>
      <div className="flex items-center space-x-4 p-4">
        <Link href="/">
          <Image
            className="dark:invert"
            src="/globe.svg"
            alt="logo"
            width={50}
            height={50}
            priority
          />
        </Link>

        <nav className="p-4">
          <ul className="flex space-x-6 items-center">
            <li>
              <NavLink href="/dashboard">{t("dashboard")}</NavLink>
            </li>
            <li>
              <NavLink href="/orders">{t("orders")}</NavLink>
            </li>
            <li>
              <NavLink href="/assets">{t("assets")}</NavLink>
            </li>
            <li>
              <ModeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
