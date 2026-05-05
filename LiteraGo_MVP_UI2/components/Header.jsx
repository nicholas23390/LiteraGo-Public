"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getCart, getCurrentUser, initializeLiteraGo } from "@/lib/client-store";
import { navItems } from "@/lib/data";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    initializeLiteraGo();
    setUser(getCurrentUser());
    setCartCount(getCart().reduce((total, item) => total + (item.qty || 1), 0));

    const refresh = () => {
      setCartCount(getCart().reduce((total, item) => total + (item.qty || 1), 0));
      setUser(getCurrentUser());
    };
    window.addEventListener("literago:cart", refresh);
    window.addEventListener("literago:user", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("literago:cart", refresh);
      window.removeEventListener("literago:user", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <button className="hamburger" aria-label="Buka menu" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          <span />
          <span />
          <span />
        </button>
        <nav className={`main-nav ${open ? "open" : ""}`}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "active" : ""}
              onClick={closeMenu}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link href="/notifications" className="icon-btn" aria-label="Notifikasi">
            🔔
          </Link>
          <Link href="/cart" className="icon-btn cart-btn" aria-label="Keranjang">
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <Link href="/profile" className="avatar" aria-label="Akun">
            {user?.username?.slice(0, 1) || "U"}
          </Link>
        </div>
      </div>
    </header>
  );
}
