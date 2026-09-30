"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Dumbbell,
  Pill,
  Apple,
} from "lucide-react";

const TAB_ITEMS = [
  {
    href: "/profile",
    label: "Profilo",
    icon: User,
  },
  {
    href: "/workout",
    label: "Allenamento",
    icon: Dumbbell,
  },
  {
    href: "/supplements",
    label: "Integratori",
    icon: Pill,
  },
  {
    href: "/nutrition",
    label: "Nutrizione",
    icon: Apple,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
      <div className="flex justify-around">
        {TAB_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-1 flex-col items-center justify-center py-3 text-xs font-medium transition-colors ${
                isActive
                  ? "border-t-2 border-blue-500 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon size={24} className="mb-1" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
