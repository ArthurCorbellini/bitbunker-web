import Image from "next/image";
import Link from "next/link";

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
              <Link href="/" className="hover:text-blue-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-blue-400 transition-colors">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/orders" className="hover:text-blue-400 transition-colors">
                Orders
              </Link>
            </li>
            <li>
              <Link href="/tokens" className="hover:text-blue-400 transition-colors">
                Tokens
              </Link>
            </li>
            <li>
              <Link href="/tests" className="hover:text-blue-400 transition-colors">
                Tests
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
