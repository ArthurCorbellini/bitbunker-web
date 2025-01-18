import Image from "next/image";
import Link from "next/link";
import NavLink from "./nav-link";

export default function MainHeader() {
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
              <NavLink href="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink href="/orders">Orders</NavLink>
            </li>
            <li>
              <NavLink href="/tokens">Tokens</NavLink>
            </li>
            <li>
              <NavLink href="/tests">Tests</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
