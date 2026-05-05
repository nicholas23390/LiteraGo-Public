export const appName = "LiteraGo";

export const navItems = [
  { label: "Beranda", href: "/home", icon: "🏠︎" },
  { label: "Kategori", href: "/kategori", icon: "▦" },
  { label: "Peminjaman", href: "/borrow", icon: "🕮" },
  { label: "Wishlist", href: "/wishlist", icon: "♥" },
  { label: "Bantuan", href: "/help", icon: "?" }
];

export const userProfile = {
  name: "",
  username: "",
  email: "",
  phone: "",
  location: "Surabaya",
  birthDate: ""
};

export const regions = [
  {
    province: "Jawa Timur",
    cities: ["Surabaya", "Malang", "Blitar", "Kediri", "Mojokerto", "Pasuruan"]
  },
  { province: "Jawa Tengah", cities: ["Semarang", "Solo", "Magelang", "Yogyakarta"] },
  { province: "Jawa Barat", cities: ["Bandung", "Bogor", "Cirebon", "Depok"] },
  { province: "Bali", cities: ["Denpasar", "Badung", "Gianyar"] },
  { province: "Sumatra", cities: ["Medan", "Padang", "Palembang"] },
  { province: "Sulawesi", cities: ["Makassar", "Manado", "Palu"] },
  { province: "Kalimantan", cities: ["Balikpapan", "Samarinda", "Pontianak"] }
];

export const libraries = [
  {
    id: "unesa-fmipa",
    name: "Perpustakaan FMIPA UNESA",
    city: "Surabaya",
    province: "Jawa Timur",
    distance: "0.7 km",
    address: "Gedung C1, Ketintang, Kec. Gayungan, Surabaya, Jawa Timur 60231",
    open: "08.00 - 16.00",
    rating: 4.8
  },
  {
    id: "lentera-ilmu",
    name: "Perpustakaan Umum Surabaya",
    city: "Surabaya",
    province: "Jawa Timur",
    distance: "7.8 km",
    address: "Jl. Gubernur Suryo No.15, Embong Kaliasin, Kec. Genteng, Surabaya, Jawa Timur 60271",
    open: "07.00 - 19.00",
    rating: 4.6
  },
  {
    id: "cekia",
    name: "Perpustakaan Cekia",
    city: "Malang",
    province: "Jawa Timur",
    distance: "72 km",
    address: "Jl. Veteran No. 25, Malang",
    open: "08.30 - 15.30",
    rating: 4.5
  },
  {
    id: "pelita-buku",
    name: "Perpustakaan Pelita Buku",
    city: "Kediri",
    province: "Jawa Timur",
    distance: "108 km",
    address: "Jl. Brawijaya No. 88, Kediri",
    open: "08.00 - 16.00",
    rating: 4.3
  }
];

export const categories = [
  "Sejarah",
  "Motivasi",
  "Teknologi",
  "Fiksi",
  "Biografi",
  "Komik",
  "Novel",
  "Majalah",
  "Koran"
];

export const books = [
  {
    id: "filosofi-teras",
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    category: "Motivasi",
    type: "Buku",
    section: "Buku Populer",
    libraryIds: ["unesa-fmipa", "lentera-ilmu"],
    stock: 5,
    price: 20000,
    year: 2018,
    coverTone: "yellow",
    description:
      "Panduan praktis mengenal Stoisisme agar pembaca lebih tenang menghadapi masalah sehari-hari.",
    tags: ["rekomendasi", "tersedia", "populer"]
  },
  {
    id: "sebuah-seni",
    title: "Sebuah Seni Untuk Bersikap Bodo Amat",
    author: "Mark Manson",
    category: "Motivasi",
    type: "Buku",
    section: "Buku Populer",
    libraryIds: ["unesa-fmipa"],
    stock: 3,
    price: 20000,
    year: 2016,
    coverTone: "orange",
    description:
      "Buku pengembangan diri yang mengajak pembaca memilih hal penting dan berhenti mengejar validasi berlebihan.",
    tags: ["tersedia", "self improvement"]
  },
  {
    id: "pensiun-tanpa-waswas",
    title: "Pensiun Tanpa Waswas",
    author: "AM. Unggul Putranto, Andre Herlambang",
    category: "Motivasi",
    type: "Buku",
    section: "Buku Terbaru",
    libraryIds: ["unesa-fmipa"],
    stock: 2,
    price: 18000,
    year: 2026,
    coverTone: "cream",
    description: "Bacaan ringan tentang perencanaan pensiun dan pengelolaan risiko keuangan keluarga.",
    tags: ["terbaru", "tersedia"]
  },
  {
    id: "penyelesaian-sengketa-bisnis",
    title: "Penyelesaian Sengketa Bisnis",
    author: "R. Serfianto, D. Purnomo",
    category: "Teknologi",
    type: "Buku",
    section: "Buku Terbaru",
    libraryIds: ["unesa-fmipa", "cekia"],
    stock: 1,
    price: 18000,
    year: 2026,
    coverTone: "teal",
    description: "Materi pengantar penyelesaian sengketa bisnis untuk pembaca umum dan mahasiswa.",
    tags: ["terbaru", "bisnis"]
  },
  {
    id: "pengendali-gagak",
    title: "Pengendali Gagak (Ferals)",
    author: "Jacob Grey",
    category: "Fiksi",
    type: "Buku",
    section: "Buku Terbaru",
    libraryIds: ["lentera-ilmu"],
    stock: 0,
    price: 18000,
    year: 2026,
    coverTone: "dark",
    description: "Novel fantasi tentang anak yang memiliki hubungan misterius dengan burung gagak.",
    tags: ["tidak tersedia", "wishlist"]
  },
  {
    id: "seporsi-mie-ayam",
    title: "Seporsi Mie Ayam Sebelum Mati",
    author: "Brian Khrisna",
    category: "Novel",
    type: "Buku",
    section: "Buku Populer",
    libraryIds: ["unesa-fmipa", "pelita-buku"],
    stock: 4,
    price: 20000,
    year: 2025,
    coverTone: "gray",
    description: "Novel reflektif tentang kehidupan, luka, dan percakapan sederhana yang bermakna.",
    tags: ["populer", "tersedia"]
  },
  {
    id: "silent-parade",
    title: "Silent Parade",
    author: "Keigo Higashino",
    category: "Novel",
    type: "Buku",
    section: "Buku Populer",
    libraryIds: ["cekia"],
    stock: 0,
    price: 20000,
    year: 2021,
    coverTone: "red",
    description: "Misteri kriminal yang menegangkan dari penulis serial Detektif Galileo.",
    tags: ["tidak tersedia", "misteri"]
  },
  {
    id: "cantik-itu-luka",
    title: "Cantik itu Luka",
    author: "Eka Kurniawan",
    category: "Novel",
    type: "Buku",
    section: "Novel Rekomendasi",
    libraryIds: ["cekia", "pelita-buku"],
    stock: 0,
    price: 20000,
    year: 2002,
    coverTone: "pink",
    description: "Novel sastra Indonesia yang memadukan sejarah, keluarga, dan realisme magis.",
    tags: ["wishlist", "tidak tersedia"]
  },
  {
    id: "one-piece-01",
    title: "One Piece 01",
    author: "Eiichiro Oda",
    category: "Komik",
    type: "Buku",
    section: "Komik Rekomendasi",
    libraryIds: ["unesa-fmipa", "lentera-ilmu"],
    stock: 6,
    price: 15000,
    year: 1997,
    coverTone: "blue",
    description: "Komik petualangan bajak laut tentang mimpi dan persahabatan.",
    tags: ["komik", "tersedia", "populer"]
  },
  {
    id: "touche",
    title: "Touche",
    author: "Windhy Puspitadewi",
    category: "Fiksi",
    type: "Buku",
    section: "Komik Rekomendasi",
    libraryIds: ["pelita-buku"],
    stock: 2,
    price: 16000,
    year: 2014,
    coverTone: "green",
    description: "Cerita fiksi remaja dengan kemampuan unik dan konflik emosional.",
    tags: ["tersedia"]
  },
  {
    id: "bobo-48-2026",
    title: "Bobo / ED 48 2026",
    author: "BOBO",
    category: "Majalah",
    type: "Majalah",
    section: "Majalah Populer",
    libraryIds: ["unesa-fmipa"],
    stock: 8,
    price: 10000,
    year: 2026,
    coverTone: "green",
    description: "Majalah anak dengan cerita, pengetahuan, dan aktivitas ringan.",
    tags: ["majalah", "tersedia"]
  },
  {
    id: "kontan-24-2026",
    title: "Kontan / ED 24 2026",
    author: "Kontan",
    category: "Majalah",
    type: "Majalah",
    section: "Majalah Populer",
    libraryIds: ["unesa-fmipa"],
    stock: 5,
    price: 10000,
    year: 2026,
    coverTone: "lime",
    description: "Majalah bisnis dan keuangan untuk pembaca umum.",
    tags: ["majalah", "tersedia"]
  },
  {
    id: "otomotif-44-2026",
    title: "Otomotif / ED 44 2026",
    author: "Otomotif",
    category: "Majalah",
    type: "Majalah",
    section: "Majalah Populer",
    libraryIds: ["lentera-ilmu"],
    stock: 5,
    price: 10000,
    year: 2026,
    coverTone: "white",
    description: "Majalah otomotif dengan ulasan kendaraan dan tips perawatan.",
    tags: ["majalah", "tersedia"]
  },
  {
    id: "laut-bercerita",
    title: "Laut Bercerita",
    author: "Leila S. Chudori",
    category: "Sejarah",
    type: "Buku",
    section: "Wishlist",
    libraryIds: ["cekia"],
    stock: 3,
    price: 20000,
    year: 2017,
    coverTone: "navy",
    description: "Novel tentang persahabatan, keluarga, dan sejarah kelam aktivisme Indonesia.",
    tags: ["tersedia", "wishlist"]
  },
  {
    id: "bridgerton",
    title: "Bridgerton",
    author: "Julia Quinn",
    category: "Novel",
    type: "Buku",
    section: "Wishlist",
    libraryIds: ["pelita-buku"],
    stock: 0,
    price: 20000,
    year: 2000,
    coverTone: "rose",
    description: "Novel roman keluarga bangsawan dengan latar era Regency.",
    tags: ["wishlist", "tidak tersedia"]
  },
  {
    id: "you-do-you",
    title: "You Do You",
    author: "Fellexandro Ruby",
    category: "Motivasi",
    type: "Buku",
    section: "Wishlist",
    libraryIds: ["pelita-buku"],
    stock: 0,
    price: 20000,
    year: 2020,
    coverTone: "cyan",
    description: "Buku pengembangan diri untuk memahami arah karier dan keputusan hidup.",
    tags: ["wishlist", "tidak tersedia"]
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Motivasi",
    type: "Buku",
    section: "Wishlist",
    libraryIds: ["lentera-ilmu"],
    stock: 4,
    price: 20000,
    year: 2018,
    coverTone: "white",
    description: "Panduan membangun kebiasaan kecil yang berdampak besar dalam jangka panjang.",
    tags: ["tersedia", "wishlist"]
  }
];

export const defaultWishlistIds = ["laut-bercerita", "cantik-itu-luka", "bridgerton", "you-do-you", "atomic-habits"];

export const defaultBorrowings = [
  {
    id: "YTTA215",
    status: "Lunas",
    paymentMethod: "COD",
    libraryId: "unesa-fmipa",
    createdAt: "2026-12-01",
    pickupDate: "2026-12-01",
    returnDate: "2026-12-08",
    dueLabel: "21 Desember 2026",
    subtotal: 20000,
    total: 22000,
    borrower: userProfile,
    items: ["filosofi-teras"]
  },
  {
    id: "YTTA216",
    status: "Lunas",
    paymentMethod: "BCA Virtual Account",
    libraryId: "unesa-fmipa",
    createdAt: "2026-12-21",
    pickupDate: "2026-12-21",
    returnDate: "2026-12-28",
    dueLabel: "31 Desember 2026",
    subtotal: 20000,
    total: 22000,
    borrower: userProfile,
    items: ["sebuah-seni"]
  },
  {
    id: "YTTA217",
    status: "Lunas",
    paymentMethod: "DANA",
    libraryId: "pelita-buku",
    createdAt: "2026-12-31",
    pickupDate: "2026-12-31",
    returnDate: "2027-01-06",
    dueLabel: "31 Desember 2026",
    subtotal: 20000,
    total: 22000,
    borrower: userProfile,
    items: ["seporsi-mie-ayam"]
  }
];

export const notifications = [
  {
    id: "notif-1",
    title: "Segera Jatuh Tempo!!",
    body: "Peminjaman Buku Madilog akan jatuh tempo pada 20 Desember 2026.",
    date: "17-12-2026 05.00",
    type: "due"
  },
  {
    id: "notif-2",
    title: "Segera Jatuh Tempo!!",
    body: "Peminjaman Buku Bungkam Suara akan jatuh tempo pada 20 Desember 2026.",
    date: "17-12-2026 05.00",
    type: "due"
  },
  {
    id: "notif-3",
    title: "Segera Jatuh Tempo!!",
    body: "Peminjaman Buku Filosofi Teras akan jatuh tempo pada 20 Desember 2026.",
    date: "17-12-2026 05.00",
    type: "due"
  }
];

export const faqs = [
  {
    group: "Rekomendasi",
    question: "Kenapa saya harus memilih perpustakaan terlebih dahulu?",
    answer:
      "Agar daftar buku, stok, dan lokasi pengambilan yang muncul sesuai dengan perpustakaan yang kamu pilih."
  },
  {
    group: "Rekomendasi",
    question: "Apakah koleksi buku di setiap perpustakaan sama?",
    answer:
      "Tidak selalu. Setiap perpustakaan bisa memiliki stok dan koleksi berbeda, sehingga pemilihan lokasi penting dilakukan di awal."
  },
  {
    group: "Peminjaman",
    question: "Apa yang harus dilakukan jika buku yang saya cari tidak tersedia?",
    answer: "Kamu bisa menyimpannya ke Wishlist agar lebih mudah dicek kembali saat stok sudah tersedia."
  },
  {
    group: "Peminjaman",
    question: "Di mana saya bisa melihat detail buku yang sedang dipinjam?",
    answer: "Buka menu Peminjaman untuk melihat kode pinjaman, tanggal pinjam, tanggal kembali, dan status pembayaran."
  },
  {
    group: "Pembayaran",
    question: "Apa yang harus dilakukan jika pembayaran saya gagal?",
    answer:
      "Ulangi proses dari halaman payment gateway atau pilih metode pembayaran lain seperti COD untuk simulasi MVP."
  },
  {
    group: "Akun",
    question: "Apa yang harus saya lakukan jika saya lupa kata sandi akun saya?",
    answer: "Gunakan tautan lupa kata sandi pada halaman login. Fitur ini masih berupa placeholder untuk integrasi auth."
  },
  {
    group: "Notifikasi",
    question: "Mengapa saya tidak menerima notifikasi pengingat pengembalian?",
    answer: "Pastikan izin notifikasi aktif. Pada MVP ini notifikasi masih ditampilkan di halaman Notifikasi."
  },
  {
    group: "Notifikasi",
    question: "Bagaimana cara mengaktifkan notifikasi di aplikasi LiteraGo?",
    answer: "Nanti saat backend siap, pengaturan notifikasi dapat disimpan di tabel user_settings atau profile."
  }
];

export const paymentMethods = [
  {
    id: "bca",
    label: "BCA Virtual Account",
    admin: 2500,
    instruction: "Transfer ke nomor VA 8808 2026 4040 7299 sebelum batas waktu pembayaran."
  },
  {
    id: "dana",
    label: "DANA",
    admin: 1500,
    instruction: "Lanjutkan pembayaran melalui aplikasi DANA dengan nomor ponsel yang terdaftar."
  },
  {
    id: "cod",
    label: "Cash On Delivery (COD)",
    admin: 2000,
    instruction: "Bayar saat mengambil buku di perpustakaan yang dipilih."
  }
];

export function findBook(id) {
  return books.find((book) => book.id === id);
}

export function findLibrary(id) {
  return libraries.find((library) => library.id === id);
}

export function formatRupiah(amount = 0) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(amount);
}
