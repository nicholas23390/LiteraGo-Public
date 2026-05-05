"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import BookCard from "@/components/BookCard";
import PageShell from "@/components/PageShell";
import SectionHeader from "@/components/SectionHeader";
import Toast from "@/components/Toast";
import { getCurrentUser, getSelectedLibrary, initializeLiteraGo } from "@/lib/client-store";
import { books, categories, libraries } from "@/lib/data";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [library, setLibrary] = useState(null);
  const [toast, setToast] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    initializeLiteraGo();
    setUser(getCurrentUser());
    setLibrary(getSelectedLibrary());
  }, []);

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  }

  const visibleBooks = useMemo(() => {
    const normalizedQuery = query.toLowerCase();
    return books.filter((book) => {
      const inLibrary = library ? book.libraryIds.includes(library.id) : true;
      const matchesQuery = [book.title, book.author, book.category, String(book.year)]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
      return inLibrary && matchesQuery;
    });
  }, [library, query]);

  const newest = visibleBooks.filter((book) => book.section === "Buku Terbaru").slice(0, 3);
  const popular = visibleBooks.filter((book) => book.section === "Buku Populer").slice(0, 3);
  const magazines = visibleBooks.filter((book) => book.section === "Majalah Populer").slice(0, 3);

  return (
    <PageShell>
      <section className="dashboard-hero">
        <div className="welcome-card">
          <div className="welcome-head">
            <span className="welcome-pill">👤 Hi {user?.username || "User"}!</span>
          </div>
          <div className="location-current">
            <span>📍</span>
            <div>
              <strong>Lokasi Saat ini</strong>
              <br />
              {library?.name || ""}
            </div>
          </div>
          <div className="search-row">
            <input
              className="input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari berdasarkan judul, penulis, kategori, tahun..."
            />
            <Link href="/libraries" className="primary-btn">
              Cari Perpustakaan
            </Link>
          </div>
          <div className="banner-card">
            <div>
              <h2>Temukan Perpustakaan, Pinjam Buku Lebih Mudah!</h2>
              <p>Cari pustaka terdekat, pilih buku, tentukan return date, lalu checkout dalam satu alur.</p>
              <div className="hero-actions" style={{ marginTop: 16 }}>
                <Link href="/libraries" className="secondary-btn small">
                  📍 Cari Perpustakaan
                </Link>
                <Link href="/kategori" className="secondary-btn small">
                  ▦ Lihat Kategori
                </Link>
              </div>
            </div>
            <div className="banner-illust">👩‍💻</div>
          </div>
        </div>
        <aside className="location-card">
          <div>
            <span className="kicker">Perpustakaan Aktif</span>
            <h2>{library?.name || libraries[0].name}</h2>
            <p>{library?.address || libraries[0].address}</p>
            <p> ⏰: {library?.open || libraries[0].open}</p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <strong>{visibleBooks.length}</strong>
              <span>Koleksi tersedia</span>
            </div>
            <div className="stat-card">
              <strong>{categories.length}</strong>
              <span>Kategori</span>
            </div>
          </div>
        </aside>
      </section>

      <SectionHeader title="Buku Terbaru" />
      <div className="book-grid">
        {(newest.length ? newest : visibleBooks.slice(0, 3)).map((book) => (
          <BookCard key={book.id} book={book} onToast={showToast} />
        ))}
      </div>

      <SectionHeader title="Buku Populer" />
      <div className="book-grid">
        {(popular.length ? popular : visibleBooks.slice(3, 6)).map((book) => (
          <BookCard key={book.id} book={book} onToast={showToast} />
        ))}
      </div>

      <SectionHeader title="Majalah Populer" />
      <div className="book-grid">
        {(magazines.length ? magazines : books.filter((book) => book.type === "Majalah").slice(0, 3)).map((book) => (
          <BookCard key={book.id} book={book} onToast={showToast} />
        ))}
      </div>

      <Toast message={toast} />
    </PageShell>
  );
}
