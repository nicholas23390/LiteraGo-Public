"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/data";

export default function MobileBottomNav() {
  const pathname = usePathname();
  return (
    <nav className="bottom-nav" aria-label="Navigasi bawah">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} className={pathname === item.href ? "active" : ""}>
          <span>{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
