import Image from "next/image";
import Link from "next/link";

export default function MainHeader() {
  return (
    <header>
      <div className="bg-red-700">
        <div className="w-24">
          <Link href="/">
            <Image
              className="dark:invert"
              src="/globe.svg"
              alt="logo"
              width={100}
              height={100}
              priority
            />
          </Link>
        </div>

        <nav>
          <ul>
            <li>
              <Link href="/tests">Tests</Link>
            </li>
            <li>
              <Link href="/orders">Orders</Link>
            </li>
            <li>
              <Link href="/tokens">Tokens</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
