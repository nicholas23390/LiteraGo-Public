"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import BookCover from "@/components/BookCover";
import EmptyState from "@/components/EmptyState";
import PageShell from "@/components/PageShell";
import Toast from "@/components/Toast";
import { addToCart, getSelectedLibrary, getWishlist, initializeLiteraGo, setWishlist, toggleWishlist } from "@/lib/client-store";
import { books, findLibrary } from "@/lib/data";

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [filter, setFilter] = useState("Semua");
  const [library, setLibrary] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    initializeLiteraGo();
    setWishlistIds(getWishlist());
    setLibrary(getSelectedLibrary());
  }, []);

  const wishlistBooks = useMemo(() => {
    const entries = wishlistIds.map((id) => books.find((book) => book.id === id)).filter(Boolean);
    return entries.filter((book) => {
      if (filter === "Tersedia") return book.stock > 0;
      if (filter === "Tidak Tersedia") return book.stock === 0;
      return true;
    });
  }, [wishlistIds, filter]);

  function handleRemove(bookId) {
    const next = toggleWishlist(bookId);
    setWishlistIds(next);
    setToast("Buku dihapus dari Wishlist.");
  }

  function handleBorrow(book) {
    const targetLibrary = library || findLibrary(book.libraryIds[0]);
    addToCart(book.id, targetLibrary.id);
    window.dispatchEvent(new Event("literago:cart"));
    const next = wishlistIds.filter((id) => id !== book.id);
    setWishlist(next);
    setWishlistIds(next);
    setToast("Buku tersedia dan sudah masuk keranjang.");
  }

  return (
    <PageShell>
      <section className="section-block" style={{ marginTop: 0 }}>
        <span className="kicker">Wishlist</span>
        <h1 className="section-title">Simpan buku yang belum tersedia atau ingin kamu <span>baca nanti</span></h1>
        <div className="tabs">
          {["Semua", "Tersedia", "Tidak Tersedia"].map((item) => (
            <button key={item} className={`tab-btn ${filter === item ? "active" : ""}`} onClick={() => setFilter(item)}>
              {item}
            </button>
          ))}
        </div>
      </section>

      {wishlistBooks.length === 0 ? (
        <EmptyState
          title="Wishlist kosong"
          description="Buku yang kamu simpan akan tampil di sini."
          actionHref="/kategori"
          actionLabel="Cari Buku"
        />
      ) : (
        <div className="wishlist-list">
          {wishlistBooks.map((book) => {
            const libraryName = findLibrary(book.libraryIds[0])?.name || "Perpustakaan";
            const available = book.stock > 0;
            return (
              <article className="wishlist-item" key={book.id}>
                <BookCover book={book} size="sm" />
                <div>
                  <span className={`status-pill ${available ? "available" : "unavailable"}`}>{available ? "Tersedia" : "Tidak Tersedia"}</span>
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                  <p>{libraryName}</p>
                </div>
                <div className="row-actions">
                  {available ? (
                    <button className="primary-btn small" onClick={() => handleBorrow(book)}>Pinjam Sekarang</button>
                  ) : (
                    <Link className="secondary-btn small" href={`/book/${book.id}`}>Lihat Detail</Link>
                  )}
                  <button className="danger-btn small" onClick={() => handleRemove(book.id)}>Hapus</button>
                </div>
              </article>
            );
          })}
        </div>
      )}
      <Toast message={toast} />
    </PageShell>
  );
}
