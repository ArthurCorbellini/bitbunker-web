import { ReactNode } from "react";

export default function RoundedButton({ children }: { children: ReactNode }) {
  return (
    <button className="px-3 py-3 bg-gray-700 rounded-full hover:bg-blue-700 transition">
      {children}
    </button>
  );
}
