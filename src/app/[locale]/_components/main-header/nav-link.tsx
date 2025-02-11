"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
