# LiteraGo MVP - Aplikasi Peminjaman Buku

Project ini adalah versi MVP interaktif untuk tugas Studi Independen. Aplikasi dibuat dengan **Next.js App Router + CSS responsive** dan bisa langsung dicoba tanpa database.

## Fitur yang sudah jadi

- Landing page pembuka LiteraGo.
- Login dan Register dummy.
- Homepage dengan search buku, lokasi aktif, section buku terbaru/populer/majalah.
- Cari perpustakaan berdasarkan wilayah dan kota.
- Kategori buku dengan filter Buku/Majalah/Koran, kategori, search judul/penulis/tahun.
- Detail buku dengan kondisi stok tersedia atau tidak tersedia.
- Keranjang untuk menentukan return date, waktu pengambilan, jumlah buku, dan metode pembayaran.
- Payment gateway simulasi: BCA Virtual Account, DANA, dan COD.
- Invoice / ticket peminjaman setelah pembayaran berhasil.
- Riwayat Peminjaman/Borrow.
- Wishlist interaktif.
- Pusat Bantuan/FAQ.
- Profile settings dummy.
- Notifikasi pengingat pengembalian.
- Responsive desktop dan mobile. Pada mobile, navbar berubah menjadi hamburger menu dan bottom navigation.

## Cara menjalankan

```bash
npm install
npm run dev
```

Lalu buka:

```bash
http://localhost:3000
```

## Alur demo yang disarankan

1. Buka `/login`, isi email dan password apa saja.
2. Pilih perpustakaan dari `/libraries`.
3. Buka `/kategori`, pilih buku yang tersedia.
4. Klik tambah ke keranjang atau buka detail buku.
5. Di `/cart`, isi return date, waktu pengambilan, dan metode pembayaran.
6. Lanjut ke `/payment`, klik bayar.
7. Invoice muncul di `/invoice`, lalu riwayat masuk ke `/borrow`.
8. Coba buku yang tidak tersedia, maka akan masuk ke `/wishlist`.

## Catatan penting untuk database

Saat ini data disimpan di browser menggunakan `localStorage`, supaya project langsung jalan tanpa setup database. Bagian yang harus diganti saat tim mulai integrasi database sudah diberi komentar `TODO DATABASE` atau `TODO SUPABASE`.

File penting:

- `lib/data.js` = data dummy buku, perpustakaan, FAQ, notifikasi.
- `lib/client-store.js` = simulasi penyimpanan localStorage. Ini kandidat utama diganti menjadi query Supabase.
- `app/payment/page.jsx` = proses konfirmasi pembayaran dan pembuatan peminjaman.
- `app/actions.js` = contoh Server Action untuk nanti.
- `DATABASE_SCHEMA_DRAFT.md` = draft tabel database.

## Struktur halaman

```text
app/
  page.jsx               Landing page
  login/page.jsx          Login
  register/page.jsx       Register
  home/page.jsx           Homepage aplikasi
  libraries/page.jsx      Search perpustakaan
  kategori/page.jsx       Kategori dan katalog buku
  book/[id]/page.jsx      Detail buku
  cart/page.jsx           Your Cart / checkout awal
  payment/page.jsx        Payment gateway simulasi
  invoice/page.jsx        Invoice/ticket peminjaman
  borrow/page.jsx         Riwayat peminjaman
  wishlist/page.jsx       Wishlist
  help/page.jsx           Pusat bantuan
  profile/page.jsx        Akun dan profile settings
  notifications/page.jsx  Notifikasi
```

## Warna utama UI

- Primary blue: `#32649b`
- Dark blue: `#17446f`
- Accent orange/red: `#ef674c`
- Soft background: `#f6f9fc`

## Integrasi nanti

Ketika sudah memakai Supabase:

1. Isi `.env.local` berdasarkan `.env.example`.
2. Buat tabel dari `DATABASE_SCHEMA_DRAFT.md`.
3. Ganti fungsi localStorage di `lib/client-store.js` menjadi Supabase query.
4. Pakai `app/actions.js` untuk Server Actions agar form checkout benar-benar menyimpan data.
5. Untuk auth, ganti login/register dummy menjadi Supabase Auth.

## Update UI 2

Perubahan terbaru:

- Logo sudah diganti memakai file `public/logo-literago.png` dari aset terbaru.
- Halaman Login tidak lagi memakai contoh email/nama Agus.
- Halaman Register sekarang memiliki field `Nama / Username`; nilai ini akan disimpan ke localStorage dan tampil sebagai sapaan di homepage.
- Nomor telepon default dikosongkan. User dapat mengisi sendiri lewat halaman Profile.
- Ditambahkan micro-interactions: hover lift card, animasi button, animasi hamburger menu, animasi toast, efek shine banner, dan transisi input agar UI lebih hidup.

Jika browser masih menampilkan data lama karena localStorage localhost, buka DevTools Console lalu jalankan:

```js
localStorage.clear();
location.reload();
```
