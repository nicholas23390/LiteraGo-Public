"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import PageShell from "@/components/PageShell";
import EmptyState from "@/components/EmptyState";
import Toast from "@/components/Toast";
import { createBorrowing, getCheckoutDraft, getCurrentUser, initializeLiteraGo } from "@/lib/client-store";
import { findBook, findLibrary, formatRupiah, paymentMethods } from "@/lib/data";

export default function PaymentPage() {
  const router = useRouter();
  const [draft, setDraft] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    initializeLiteraGo();
    setDraft(getCheckoutDraft());
  }, []);

  const details = useMemo(() => {
    if (!draft) return null;
    const items = draft.items.map((item) => ({ ...item, book: findBook(item.bookId) })).filter((item) => item.book);
    const subtotal = items.reduce((total, item) => total + (item.book?.price || 0) * (item.qty || 1), 0);
    const tax = Math.round(subtotal * 0.1);
    const method = paymentMethods.find((entry) => entry.id === draft.paymentMethod) || paymentMethods[2];
    return {
      items,
      subtotal,
      tax,
      method,
      library: findLibrary(draft.libraryId),
      total: subtotal + tax + method.admin
    };
  }, [draft]);

  function handlePay() {
    setLoading(true);

    // TODO DATABASE:
    // Ketika Supabase sudah siap, bagian ini diganti menjadi Server Action untuk insert:
    // borrowings, borrowing_items, payments, dan notifications.
    setTimeout(() => {
      createBorrowing({
        ...draft,
        borrower: getCurrentUser(),
        paymentMethod: details.method.label
      });
      setToast("Pembayaran berhasil dan data peminjaman tersimpan.");
      setTimeout(() => router.push("/invoice"), 750);
    }, 900);
  }

  if (!draft || !details) {
    return (
      <PageShell>
        <EmptyState
          title="Belum ada transaksi"
          description="Silakan isi keranjang dan lanjutkan checkout terlebih dahulu."
          actionHref="/cart"
          actionLabel="Buka Keranjang"
        />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="section-block" style={{ marginTop: 0 }}>
        <span className="kicker">Payment Gateway</span>
        <h1 className="section-title">Konfirmasi <span>peminjaman</span></h1>
        <p className="section-lead">
          Simulasi payment gateway. Untuk MVP tanpa database, tombol bayar akan menyimpan data ke localStorage lalu membuat invoice.
        </p>
      </section>

      <section className="payment-layout">
        <div className="payment-gateway">
          <h2>{details.method.label}</h2>
          <p>{details.method.instruction}</p>
          <div className="va-box">
            <span className="field-label">Nomor Pembayaran</span>
            <div className="va-number">8808 2026 4040 7299</div>
            <p>Batas pembayaran: 24 jam setelah checkout.</p>
          </div>
          <div className="db-note">
            <strong>Catatan integrasi:</strong> nanti form ini dapat memakai Server Action <code>createBorrowingAction</code> dan tabel <code>payments</code> agar status pembayaran tersimpan di database.
          </div>
          <div className="hero-actions">
            <button className="primary-btn" onClick={handlePay} disabled={loading}>
              {loading ? "Memproses Pembayaran..." : "BAYAR & SIMPAN PEMINJAMAN"}
            </button>
            <Link className="secondary-btn" href="/cart">Kembali ke Cart</Link>
          </div>
        </div>

        <aside className="panel-card">
          <h2>Ringkasan Order</h2>
          <p>📍 {details.library?.name}</p>
          <div className="checkout-summary" style={{ marginTop: 16 }}>
            {details.items.map((item) => (
              <div key={item.bookId}>
                <strong>{item.book.title}</strong>
                <br />
                <span>{item.qty} pcs · Return Date {item.returnDate}</span>
              </div>
            ))}
          </div>
          <div className="total-line"><span>Subtotal</span><span>{formatRupiah(details.subtotal)}</span></div>
          <div className="total-line"><span>PPN</span><span>{formatRupiah(details.tax)}</span></div>
          <div className="total-line"><span>Admin</span><span>{formatRupiah(details.method.admin)}</span></div>
          <div className="total-line"><span>Total</span><span>{formatRupiah(details.total)}</span></div>
        </aside>
      </section>
      <Toast message={toast} />
    </PageShell>
  );
}
