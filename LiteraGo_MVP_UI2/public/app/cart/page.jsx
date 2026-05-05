"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BookCover from "@/components/BookCover";
import EmptyState from "@/components/EmptyState";
import PageShell from "@/components/PageShell";
import Toast from "@/components/Toast";
import {
  getCart,
  getSelectedLibrary,
  initializeLiteraGo,
  removeFromCart,
  saveCheckoutDraft,
  updateCartItem
} from "@/lib/client-store";
import { books, findBook, findLibrary, formatRupiah, paymentMethods } from "@/lib/data";

export default function CartPage() {
  const router = useRouter();
  const [cart, setCartState] = useState([]);
  const [library, setLibrary] = useState(null);
  const [pickupDate, setPickupDate] = useState(new Date().toISOString().slice(0, 10));
  const [pickupTime, setPickupTime] = useState("12:00");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    initializeLiteraGo();
    setCartState(getCart());
    setLibrary(getSelectedLibrary());
  }, []);

  const cartDetails = useMemo(() => {
    return cart.map((item) => ({ ...item, book: findBook(item.bookId), library: findLibrary(item.libraryId) })).filter((item) => item.book);
  }, [cart]);

  const subtotal = cartDetails.reduce((total, item) => total + (item.book?.price || 0) * (item.qty || 1), 0);
  const tax = Math.round(subtotal * 0.1);
  const selectedPayment = paymentMethods.find((method) => method.id === paymentMethod);
  const total = subtotal + tax + (selectedPayment?.admin || 0);

  function handleRemove(bookId) {
    const next = removeFromCart(bookId);
    setCartState(next);
    window.dispatchEvent(new Event("literago:cart"));
  }

  function handleUpdate(bookId, updates) {
    const next = updateCartItem(bookId, updates);
    setCartState(next);
    window.dispatchEvent(new Event("literago:cart"));
  }

  function handleContinue() {
    if (!cartDetails.length) {
      setToast("Keranjang masih kosong.");
      return;
    }
    const hasReturnDate = cartDetails.every((item) => item.returnDate);
    if (!hasReturnDate || !pickupDate || !pickupTime || !paymentMethod) {
      setToast("Lengkapi tanggal pengembalian, waktu pengambilan, dan metode pembayaran.");
      return;
    }
    setLoading(true);
    const payload = {
      items: cartDetails.map(({ book, library: itemLibrary, ...rest }) => rest),
      pickupDate,
      pickupTime,
      paymentMethod,
      libraryId: library?.id || cartDetails[0]?.libraryId
    };
    saveCheckoutDraft(payload);
    setTimeout(() => router.push("/payment"), 650);
  }

  if (!cartDetails.length) {
    return (
      <PageShell>
        <EmptyState
          title="Keranjang masih kosong"
          description="Tambahkan buku dari Homepage, Kategori, atau Detail Buku sebelum menentukan tanggal peminjaman."
          actionHref="/kategori"
          actionLabel="Cari Buku"
        />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="section-block" style={{ marginTop: 0 }}>
        <span className="kicker">Your Cart</span>
        <h1 className="section-title">Pilih durasi / tanggal <span>peminjaman</span></h1>
        <p className="section-lead">Lengkapi return date, waktu pengambilan, dan metode pembayaran sebelum masuk ke payment gateway.</p>
      </section>

      <section className="cart-layout">
        <div className="panel-card">
          <div className="notice">📍 {library?.name || "Perpustakaan FMIPA UNESA"}</div>
          <div className="cart-items">
            {cartDetails.map((item) => (
              <article className="cart-item" key={item.bookId}>
                <BookCover book={item.book} size="sm" />
                <div>
                  <h3>{item.book.title}</h3>
                  <p>{item.book.author}</p>
                  <div className="cart-item-fields">
                    <label className="form-group">
                      <span className="field-label">Return Date</span>
                      <input
                        className="input"
                        type="date"
                        value={item.returnDate || ""}
                        onChange={(event) => handleUpdate(item.bookId, { returnDate: event.target.value })}
                      />
                    </label>
                    <label className="form-group">
                      <span className="field-label">Jumlah</span>
                      <select
                        className="select"
                        value={item.qty || 1}
                        onChange={(event) => handleUpdate(item.bookId, { qty: Number(event.target.value) })}
                      >
                        {[1, 2, 3].map((qty) => <option key={qty} value={qty}>{qty} pcs</option>)}
                      </select>
                    </label>
                    <button className="danger-btn small" onClick={() => handleRemove(item.bookId)}>Hapus</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="panel-card">
          <h2>Order Detail</h2>
          <div className="checkout-summary">
            {cartDetails.map((item) => (
              <div key={item.bookId}>
                <strong>{item.book.title} - {item.qty || 1}pcs</strong>
                <br />
                <span>Jangka waktu sampai: {item.returnDate || "DD/MM/YYYY"}</span>
              </div>
            ))}
          </div>

          <div className="form-group" style={{ marginTop: 18 }}>
            <label>Waktu Pengambilan</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <input className="input" type="date" value={pickupDate} onChange={(event) => setPickupDate(event.target.value)} />
              <input className="input" type="time" value={pickupTime} onChange={(event) => setPickupTime(event.target.value)} />
            </div>
          </div>

          <h3>Metode Pembayaran:</h3>
          <div className="payment-methods">
            {paymentMethods.map((method) => (
              <label key={method.id} className={`payment-option ${paymentMethod === method.id ? "active" : ""}`}>
                <input type="radio" checked={paymentMethod === method.id} onChange={() => setPaymentMethod(method.id)} />
                <span>{method.label}</span>
              </label>
            ))}
          </div>

          <div className="total-line"><span>Subtotal</span><span>{formatRupiah(subtotal)}</span></div>
          <div className="total-line"><span>Total + PPN/Admin</span><span>{formatRupiah(total)}</span></div>
          <button className="primary-btn full-width" onClick={handleContinue} disabled={loading}>
            {loading ? "Menyimpan..." : "LANJUTKAN"}
          </button>
          <Link className="secondary-btn full-width" href="/kategori" style={{ marginTop: 10 }}>Tambah Buku Lagi</Link>
        </aside>
      </section>
      <Toast message={toast} type="error" />
    </PageShell>
  );
}
