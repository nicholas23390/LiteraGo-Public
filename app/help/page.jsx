"use client";

import { useMemo, useState } from "react";
import PageShell from "@/components/PageShell";
import Toast from "@/components/Toast";
import { faqs } from "@/lib/data";

export default function HelpPage() {
  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState("FAQ");
  const [toast, setToast] = useState("");
  const groups = ["FAQ", "Rekomendasi", "Pembayaran", "Keamanan", "Peminjaman", "Akun", "Notifikasi"];

  const visibleFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const byGroup = activeGroup === "FAQ" || activeGroup === "Keamanan" ? true : faq.group === activeGroup;
      const byQuery = [faq.group, faq.question, faq.answer].join(" ").toLowerCase().includes(query.toLowerCase());
      return byGroup && byQuery;
    });
  }, [query, activeGroup]);

  function contact(type) {
    setToast(`${type} masih simulasi MVP. Nanti bisa terhubung ke WhatsApp, telepon, atau email resmi.`);
    setTimeout(() => setToast(""), 2500);
  }

  return (
    <PageShell>
      <section className="section-block" style={{ marginTop: 0 }}>
        <span className="kicker">Pusat Bantuan</span>
        <h1 className="section-title">Ada kendala saat memakai <span>LiteraGo?</span></h1>
        <input
          className="input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cari bantuan..."
        />
        <div className="tabs">
          {groups.map((group) => (
            <button key={group} className={`tab-btn ${activeGroup === group ? "active" : ""}`} onClick={() => setActiveGroup(group)}>
              {group}
            </button>
          ))}
        </div>
      </section>

      <section className="help-grid">
        <div className="faq-list">
          {visibleFaqs.map((faq) => (
            <article className="faq-item" key={faq.question}>
              <h3>[{faq.group}] {faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
        <aside className="panel-card">
          <h2>HUBUNGI KAMI</h2>
          <p>Butuh bantuan langsung? Pilih salah satu kontak berikut.</p>
          <div className="contact-stack" style={{ marginTop: 18 }}>
            <button className="primary-btn" onClick={() => contact("Chat Sekarang")}>Chat Sekarang</button>
            <button className="secondary-btn" onClick={() => contact("Telepon")}>Telepon</button>
            <button className="secondary-btn" onClick={() => contact("Email")}>Email</button>
          </div>
        </aside>
      </section>
      <Toast message={toast} />
    </PageShell>
  );
}
