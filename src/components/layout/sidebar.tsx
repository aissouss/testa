"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, LayoutDashboard, Layers, NotebookPen, RefreshCw, ScrollText, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/surahs", label: "Surahs", icon: BookOpen },
  { href: "/juz", label: "Juz", icon: Layers },
  { href: "/hizb", label: "Hizb", icon: Layers },
  { href: "/revision", label: "Revision", icon: RefreshCw },
  { href: "/study", label: "Study", icon: ScrollText },
  { href: "/notes", label: "Notes", icon: NotebookPen },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-full border-r bg-card p-4 md:w-64">
      <h1 className="mb-6 text-xl font-semibold">Quran Journal</h1>
      <nav className="space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm", active ? "bg-muted" : "hover:bg-muted")}>
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
