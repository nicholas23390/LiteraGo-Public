# Draft Database Schema LiteraGo

Dokumen ini bukan implementasi wajib sekarang. Ini panduan bagian mana yang nanti perlu dibuat tabel agar MVP terhubung ke database.

## 1. profiles

Menyimpan profil user setelah login/register.

| Kolom | Tipe | Catatan |
| --- | --- | --- |
| id | uuid | Primary key, sama dengan auth.users.id |
| name | text | Nama lengkap |
| username | text | Nama tampilan |
| email | text | Email user |
| phone | text | Nomor HP |
| birth_date | date | Tanggal lahir |
| selected_library_id | uuid | FK ke libraries.id |
| created_at | timestamptz | default now() |

Dipakai di:

- `app/login/page.jsx`
- `app/register/page.jsx`
- `app/profile/page.jsx`
- `lib/client-store.js` fungsi `getCurrentUser`, `setCurrentUser`, `getSelectedLibrary`.

## 2. libraries

Menyimpan data perpustakaan.

| Kolom | Tipe | Catatan |
| --- | --- | --- |
| id | uuid | Primary key |
| name | text | Nama perpustakaan |
| city | text | Kota/kecamatan |
| province | text | Provinsi |
| address | text | Alamat |
| open_time | text | Jam buka |
| distance_label | text | Opsional untuk tampilan |
| rating | numeric | Rating |
| created_at | timestamptz | default now() |

Dipakai di:

- `app/libraries/page.jsx`
- `app/home/page.jsx`
- `app/book/[id]/page.jsx`

## 3. books

Menyimpan master data buku/majalah/koran.

| Kolom | Tipe | Catatan |
| --- | --- | --- |
| id | uuid | Primary key |
| title | text | Judul buku |
| author | text | Penulis/penerbit |
| category | text | Sejarah, Motivasi, Teknologi, Fiksi, Biografi, Komik, Novel, Majalah, Koran |
| type | text | Buku/Majalah/Koran |
| year | int | Tahun |
| price | int | Biaya peminjaman |
| description | text | Detail buku |
| cover_url | text | Opsional |
| created_at | timestamptz | default now() |

Dipakai di:

- `app/home/page.jsx`
- `app/kategori/page.jsx`
- `app/book/[id]/page.jsx`
- `components/BookCard.jsx`

## 4. library_books

Tabel stok buku per perpustakaan.

| Kolom | Tipe | Catatan |
| --- | --- | --- |
| id | uuid | Primary key |
| library_id | uuid | FK ke libraries.id |
| book_id | uuid | FK ke books.id |
| stock | int | Jumlah stok |
| shelf_code | text | Opsional |
| updated_at | timestamptz | default now() |

Dipakai di:

- Kondisi `Stok tersedia` pada detail buku.
- Filter koleksi berdasarkan perpustakaan aktif.

## 5. carts dan cart_items

Menyimpan keranjang sementara user.

### carts

| Kolom | Tipe | Catatan |
| --- | --- | --- |
| id | uuid | Primary key |
| user_id | uuid | FK ke profiles.id |
| library_id | uuid | FK ke libraries.id |
| status | text | active/checked_out |
| created_at | timestamptz | default now() |

### cart_items

| Kolom | Tipe | Catatan |
| --- | --- | --- |
| id | uuid | Primary key |
| cart_id | uuid | FK ke carts.id |
| book_id | uuid | FK ke books.id |
| qty | int | Jumlah |
| return_date | date | Tanggal pengembalian |
| created_at | timestamptz | default now() |

Dipakai di:

- `components/BookCard.jsx` saat tambah ke keranjang.
- `app/cart/page.jsx` saat update tanggal pengembalian, qty, hapus item.

## 6. wishlists

Menyimpan buku yang ingin dibaca atau belum tersedia.

| Kolom | Tipe | Catatan |
| --- | --- | --- |
| id | uuid | Primary key |
| user_id | uuid | FK ke profiles.id |
| book_id | uuid | FK ke books.id |
| created_at | timestamptz | default now() |

Dipakai di:

- `app/wishlist/page.jsx`
- `components/BookCard.jsx`
- `app/book/[id]/page.jsx`

## 7. borrowings

Menyimpan transaksi peminjaman utama.

| Kolom | Tipe | Catatan |
| --- | --- | --- |
| id | uuid | Primary key |
| code | text | Contoh YTTA215 |
| user_id | uuid | FK ke profiles.id |
| library_id | uuid | FK ke libraries.id |
| pickup_date | date | Tanggal pengambilan |
| pickup_time | time | Waktu pengambilan |
| return_date | date | Tanggal pengembalian |
| status | text | pending/active/returned/cancelled |
| subtotal | int | Subtotal |
| total | int | Total termasuk PPN/admin |
| created_at | timestamptz | default now() |

Dipakai di:

- `app/payment/page.jsx`
- `app/invoice/page.jsx`
- `app/borrow/page.jsx`

## 8. borrowing_items

Menyimpan item buku dalam satu transaksi.

| Kolom | Tipe | Catatan |
| --- | --- | --- |
| id | uuid | Primary key |
| borrowing_id | uuid | FK ke borrowings.id |
| book_id | uuid | FK ke books.id |
| qty | int | Jumlah |
| price | int | Harga saat transaksi |
| created_at | timestamptz | default now() |

## 9. payments

Menyimpan status pembayaran.

| Kolom | Tipe | Catatan |
| --- | --- | --- |
| id | uuid | Primary key |
| borrowing_id | uuid | FK ke borrowings.id |
| method | text | BCA Virtual Account/DANA/COD |
| status | text | pending/paid/failed |
| amount | int | Nominal |
| va_number | text | Opsional |
| paid_at | timestamptz | Opsional |
| created_at | timestamptz | default now() |

Dipakai di:

- `app/payment/page.jsx`
- `app/invoice/page.jsx`

## 10. notifications

Menyimpan notifikasi user.

| Kolom | Tipe | Catatan |
| --- | --- | --- |
| id | uuid | Primary key |
| user_id | uuid | FK ke profiles.id |
| borrowing_id | uuid | FK ke borrowings.id, opsional |
| title | text | Judul notifikasi |
| body | text | Isi notifikasi |
| type | text | due/success/warning |
| is_read | boolean | default false |
| created_at | timestamptz | default now() |

Dipakai di:

- `app/notifications/page.jsx`
- `app/payment/page.jsx` setelah peminjaman berhasil.

## 11. help_faqs

Menyimpan FAQ agar bisa dikelola dari database.

| Kolom | Tipe | Catatan |
| --- | --- | --- |
| id | uuid | Primary key |
| group_name | text | Rekomendasi/Peminjaman/Pembayaran/Akun/Notifikasi |
| question | text | Pertanyaan |
| answer | text | Jawaban |
| created_at | timestamptz | default now() |

Dipakai di:

- `app/help/page.jsx`

## Urutan integrasi yang disarankan

1. Supabase Auth + `profiles`.
2. `libraries`, `books`, `library_books` untuk mengganti data dummy katalog.
3. `wishlists` karena fiturnya sederhana.
4. `carts` dan `cart_items`.
5. `borrowings`, `borrowing_items`, `payments` pada payment gateway.
6. `notifications` setelah peminjaman berhasil atau mendekati jatuh tempo.
