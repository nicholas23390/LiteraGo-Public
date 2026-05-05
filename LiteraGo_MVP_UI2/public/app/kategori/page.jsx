"use client";

import { useEffect, useMemo, useState } from "react";
import BookCard from "@/components/BookCard";
import PageShell from "@/components/PageShell";
import Toast from "@/components/Toast";
import { getSelectedLibrary, initializeLiteraGo } from "@/lib/client-store";
import { books, categories } from "@/lib/data";

export default function CategoryPage() {
  const [library, setLibrary] = useState(null);
  const [activeType, setActiveType] = useState("Buku");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    initializeLiteraGo();
    setLibrary(getSelectedLibrary());
  }, []);

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  }

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const inLibrary = library ? book.libraryIds.includes(library.id) : true;
      const byType = activeType === "Semua" ? true : book.type === activeType;
      const byCategory = activeCategory === "Semua" ? true : book.category === activeCategory;
      const byQuery = [book.title, book.author, book.year, book.category].join(" ").toLowerCase().includes(query.toLowerCase());
      return inLibrary && byType && byCategory && byQuery;
    });
  }, [library, activeType, activeCategory, query]);

  const novelRecommendations = filteredBooks.filter((book) => ["Novel", "Fiksi"].includes(book.category)).slice(0, 3);
  const comicRecommendations = filteredBooks.filter((book) => book.category === "Komik").slice(0, 3);

  return (
    <PageShell>
      <section className="section-block" style={{ marginTop: 0 }}>
        <span className="kicker">Kategori</span>
        <h1 className="section-title">Cari berdasarkan judul, nama penulis, <span>tahun</span></h1>
        <p className="section-lead">
          Perpustakaan aktif: <strong>{library?.name || "Perpustakaan FMIPA UNESA"}</strong>. Kamu bisa ganti melalui halaman Cari Perpustakaan.
        </p>
        <input
          className="input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cari berdasarkan judul, nama penulis, tahun"
        />
        <div className="tabs">
          {["Buku", "Majalah", "Koran", "Semua"].map((type) => (
            <button
              key={type}
              className={`tab-btn ${activeType === type ? "active" : ""}`}
              onClick={() => setActiveType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2>Kategori Buku</h2>
          <button className="chip-btn" onClick={() => setActiveCategory("Semua")}>Lihat Semua</button>
        </div>
        <div className="filter-bar">
          <button
            className={`chip-btn ${activeCategory === "Semua" ? "active" : ""}`}
            onClick={() => setActiveCategory("Semua")}
          >
            Semua
          </button>
          {categories.slice(0, 6).map((category) => (
            <button
              key={category}
              className={`chip-btn ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <div className="section-header"><h2>Hasil Pencarian</h2><span>{filteredBooks.length} koleksi</span></div>
      <div className="book-grid">
        {filteredBooks.slice(0, 6).map((book) => <BookCard key={book.id} book={book} onToast={showToast} />)}
      </div>

      <div className="section-header"><h2>Novel Rekomendasi</h2><button className="chip-btn">Lihat Semua</button></div>
      <div className="book-grid">
        {(novelRecommendations.length ? novelRecommendations : books.filter((book) => book.category === "Novel").slice(0, 3)).map((book) => (
          <BookCard key={book.id} book={book} onToast={showToast} />
        ))}
      </div>

      <div className="section-header"><h2>Komik Rekomendasi</h2><button className="chip-btn">Lihat Semua</button></div>
      <div className="book-grid">
        {(comicRecommendations.length ? comicRecommendations : books.filter((book) => book.category === "Komik").slice(0, 3)).map((book) => (
          <BookCard key={book.id} book={book} onToast={showToast} />
        ))}
      </div>
      <Toast message={toast} />
    </PageShell>
  );
}
