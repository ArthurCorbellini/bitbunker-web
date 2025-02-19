"use client";

import { Link, usePathname } from "@/i18n/routing";

interface NavLinkProps {
  href: string;
  children: string;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const isActive = usePathname().startsWith(href);
  return (
    <Link href={href} className={isActive ? "text-blue-400" : "hover:text-blue-400 transition-colors"}>
      {children}
    </Link>
  );
}
