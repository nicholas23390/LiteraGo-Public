"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { addToCart, getSelectedLibrary, getWishlist, toggleWishlist } from "@/lib/client-store";
import { libraries } from "@/lib/data";
import BookCover from "./BookCover";

export default function BookCard({ book, compact = false, onToast }) {
  const [liked, setLiked] = useState(false);
  const [library, setLibrary] = useState(null);

  useEffect(() => {
    setLiked(getWishlist().includes(book.id));
    setLibrary(getSelectedLibrary());
  }, [book.id]);

  const stockAvailableAtSelectedLibrary = library
    ? book.stock > 0 && book.libraryIds.includes(library.id)
    : book.stock > 0;

  function handleAddToCart() {
    const selected = library || libraries[0];
    if (!stockAvailableAtSelectedLibrary) {
      const next = toggleWishlist(book.id);
      setLiked(next.includes(book.id));
      onToast?.("Buku belum tersedia di perpustakaan ini, sudah masuk Wishlist.");
      return;
    }
    addToCart(book.id, selected.id);
    window.dispatchEvent(new Event("literago:cart"));
    onToast?.(`${book.title} ditambahkan ke keranjang.`);
  }

  function handleWishlist() {
    const next = toggleWishlist(book.id);
    setLiked(next.includes(book.id));
    onToast?.(next.includes(book.id) ? "Buku berhasil masuk Wishlist." : "Buku dihapus dari Wishlist.");
  }

  return (
    <article className={`book-card ${compact ? "compact" : ""}`}>
      <button className={`wishlist-mini ${liked ? "active" : ""}`} onClick={handleWishlist} aria-label="Tambah ke Wishlist">
        ♥
      </button>
      <Link href={`/book/${book.id}`} className="book-card-cover">
        <BookCover book={book} size={compact ? "sm" : "md"} />
      </Link>
      <div className="book-card-body">
        <Link href={`/book/${book.id}`} className="book-title">
          {book.title}
        </Link>
        <p>{book.author}</p>
        <div className="card-meta">
          <span>{book.category}</span>
          <span className={stockAvailableAtSelectedLibrary ? "available" : "unavailable"}>
            {stockAvailableAtSelectedLibrary ? "Tersedia" : "Tidak tersedia"}
          </span>
        </div>
        <button className="primary-btn small" onClick={handleAddToCart}>
          {stockAvailableAtSelectedLibrary ? "Tambah ke Keranjang" : "Tambah Wishlist"}
        </button>
      </div>
    </article>
  );
}
