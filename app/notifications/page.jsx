"use client";

import { useEffect, useState } from "react";
import PageShell from "@/components/PageShell";
import { getNotifications, initializeLiteraGo } from "@/lib/client-store";

export default function NotificationsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    initializeLiteraGo();
    setItems(getNotifications());
  }, []);

  return (
    <PageShell>
      <section className="section-block" style={{ marginTop: 0 }}>
        <span className="kicker">Notifikasi</span>
        <h1 className="section-title">Pengingat <span>pengembalian</span></h1>
        <p className="section-lead">Halaman ini menampilkan pengingat jatuh tempo dan status peminjaman terbaru.</p>
      </section>

      <div className="notification-list">
        {items.map((item) => (
          <article className="notification-item" key={item.id}>
            <div className="notification-icon">🔔</div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <p style={{ color: "#be123c", marginTop: 4 }}>{item.date}</p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
