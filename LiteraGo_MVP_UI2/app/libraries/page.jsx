"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PageShell from "@/components/PageShell";
import Toast from "@/components/Toast";
import { setSelectedLibrary } from "@/lib/client-store";
import { libraries, regions } from "@/lib/data";

export default function LibrariesPage() {
  const router = useRouter();
  const [activeProvince, setActiveProvince] = useState("Jawa Timur");
  const [activeCity, setActiveCity] = useState("Surabaya");
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");

  const visibleLibraries = useMemo(() => {
    return libraries.filter((library) => {
      const byCity = activeCity ? library.city.toLowerCase() === activeCity.toLowerCase() : true;
      const byProvince = activeProvince ? library.province === activeProvince : true;
      const byQuery = [library.name, library.city, library.address].join(" ").toLowerCase().includes(query.toLowerCase());
      return byCity && byProvince && byQuery;
    });
  }, [activeCity, activeProvince, query]);

  function chooseLibrary(library) {
    setSelectedLibrary(library);
    setToast(`${library.name} dipilih. Koleksi akan menyesuaikan lokasi ini.`);
    setTimeout(() => router.push("/home"), 800);
  }

  return (
    <PageShell>
      <div className="section-block" style={{ marginTop: 0 }}>
        <span className="kicker">Search Perpustakaan</span>
        <h1 className="section-title">Cari berdasarkan <span>wilayah</span></h1>
        <p className="section-lead">
          Pilih wilayah terlebih dahulu agar stok buku dan lokasi pengambilan sesuai dengan flow peminjaman LiteraGo.
        </p>
      </div>

      <section className="library-layout">
        <div className="region-panel">
          <div className="region-header">
            <button className="secondary-btn small" onClick={() => history.back()} aria-label="Kembali">‹</button>
            <input
              className="input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari berdasarkan wilayah"
            />
          </div>
          {regions.map((region) => (
            <div className="accordion-item" key={region.province}>
              <button
                className="accordion-trigger"
                onClick={() => {
                  setActiveProvince(region.province);
                  setActiveCity(region.cities[0]);
                }}
              >
                {region.province}
                <span>{activeProvince === region.province ? "⌃" : "⌄"}</span>
              </button>
              {activeProvince === region.province && (
                <div className="city-grid">
                  {region.cities.map((city) => (
                    <button
                      key={city}
                      className={activeCity === city ? "active" : ""}
                      onClick={() => setActiveCity(city)}
                    >
                      {city.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="library-panel">
          <span className="kicker">Daftar perpustakaan</span>
          <h2>{activeCity}, {activeProvince}</h2>
          <div className="library-list">
            {visibleLibraries.length === 0 && (
              <div className="notice">Belum ada data perpustakaan untuk filter ini. Coba wilayah lain.</div>
            )}
            {visibleLibraries.map((library) => (
              <article className="library-card" key={library.id}>
                <div>
                  <h3>{library.name}</h3>
                  <p>📍 {library.address}</p>
                  <p>⏰ {library.open} · ⭐ {library.rating} · {library.distance}</p>
                </div>
                <button className="primary-btn small" onClick={() => chooseLibrary(library)}>
                  Gunakan Perpustakaan
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Toast message={toast} />
    </PageShell>
  );
}
