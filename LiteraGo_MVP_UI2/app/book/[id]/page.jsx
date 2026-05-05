"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import BookCover from "@/components/BookCover";
import PageShell from "@/components/PageShell";
import Toast from "@/components/Toast";
import { addToCart, getSelectedLibrary, getWishlist, initializeLiteraGo, toggleWishlist } from "@/lib/client-store";
import { books, findBook, findLibrary, formatRupiah } from "@/lib/data";

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [library, setLibrary] = useState(null);
  const [toast, setToast] = useState("");
  const [liked, setLiked] = useState(false);

  const book = findBook(params.id);

  useEffect(() => {
    initializeLiteraGo();
    setLibrary(getSelectedLibrary());
    if (book) setLiked(getWishlist().includes(book.id));
  }, [book]);

  const librariesAvailable = useMemo(() => {
    if (!book) return [];
    return book.libraryIds.map((id) => findLibrary(id)).filter(Boolean);
  }, [book]);

  if (!book) {
    return (
      <PageShell>
        <div className="empty-state">
          <h1>Buku tidak ditemukan</h1>
          <Link className="primary-btn" href="/kategori">Kembali ke Kategori</Link>
        </div>
      </PageShell>
    );
  }

  const availableHere = book.stock > 0 && library && book.libraryIds.includes(library.id);

  function handleAddToCart() {
    if (!availableHere) {
      const next = toggleWishlist(book.id);
      setLiked(next.includes(book.id));
      setToast("Stok belum tersedia di perpustakaan aktif. Buku masuk Wishlist.");
      return;
    }
    addToCart(book.id, library.id);
    window.dispatchEvent(new Event("literago:cart"));
    setToast("Buku masuk keranjang. Lanjut pilih durasi/tanggal peminjaman.");
    setTimeout(() => router.push("/cart"), 650);
  }

  function handleWishlist() {
    const next = toggleWishlist(book.id);
    setLiked(next.includes(book.id));
    setToast(next.includes(book.id) ? "Buku disimpan ke Wishlist." : "Buku dihapus dari Wishlist.");
  }

  return (
    <PageShell>
      <section className="detail-grid">
        <BookCover book={book} size="lg" />
        <div className="detail-info">
          <span className={`status-pill ${availableHere ? "available" : "unavailable"}`}>
            {availableHere ? "Stok tersedia" : "Tidak tersedia di perpustakaan aktif"}
          </span>
          <h1>{book.title}</h1>
          <p className="section-lead">{book.description}</p>
          <div className="detail-meta">
            <div><span>Penulis</span><strong>{book.author}</strong></div>
            <div><span>Kategori</span><strong>{book.category}</strong></div>
            <div><span>Biaya</span><strong>{formatRupiah(book.price)}</strong></div>
          </div>
          <div className="db-note">
            <strong>Perpustakaan aktif:</strong> {library?.name || "Belum dipilih"}. Stok buku akan menjadi data dari tabel <code>library_books</code> ketika database sudah dibuat.
          </div>
          <div className="hero-actions">
            <button className="primary-btn" onClick={handleAddToCart}>
              {availableHere ? "Pilih Durasi / Tanggal Peminjaman" : "Tambah ke Wishlist"}
            </button>
            <button className="secondary-btn" onClick={handleWishlist}>
              {liked ? "Hapus dari Wishlist" : "Simpan Wishlist"}
            </button>
            <Link className="ghost-btn" href="/kategori">Kembali</Link>
          </div>
        </div>
      </section>

      <section className="section-block">
        <h2 className="section-title">Daftar perpustakaan yang punya koleksi ini</h2>
        <div className="library-list">
          {librariesAvailable.map((item) => (
            <article className="library-card" key={item.id}>
              <div>
                <h3>{item.name}</h3>
                <p>{item.address}</p>
              </div>
              <span className="status-pill available">{book.stock > 0 ? `${book.stock} stok` : "Kosong"}</span>
            </article>
          ))}
        </div>
      </section>
      <Toast message={toast} />
    </PageShell>
  );
}
