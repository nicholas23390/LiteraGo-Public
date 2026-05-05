import { books, defaultBorrowings, defaultWishlistIds, libraries, notifications, userProfile } from "./data";

const STORAGE_KEYS = {
  user: "literago_user",
  selectedLibrary: "literago_selected_library",
  cart: "literago_cart",
  wishlist: "literago_wishlist",
  borrowings: "literago_borrowings",
  notifications: "literago_notifications",
  checkout: "literago_checkout_draft",
  lastInvoice: "literago_last_invoice"
};

function isBrowser() {
  return typeof window !== "undefined";
}

export function readStorage(key, fallback) {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.warn("Gagal membaca localStorage", key, error);
    return fallback;
  }
}

export function writeStorage(key, value) {
  if (!isBrowser()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function normalizeLegacyUser(user) {
  if (!user) return userProfile;

  const nextUser = { ...userProfile, ...user };
  const wasOldDemoUser =
    nextUser.username === "Agus" ||
    nextUser.name === "Agus Widodo" ||
    nextUser.email === "aguswidodod@gmail.com" ||
    nextUser.phone === "087712365498";

  if (!wasOldDemoUser) return nextUser;

  const email = nextUser.email && nextUser.email !== "aguswidodod@gmail.com" ? nextUser.email : "";
  const derivedUsername = email ? email.split("@")[0] : "";

  return {
    ...nextUser,
    name: nextUser.name === "Agus Widodo" ? derivedUsername : nextUser.name,
    username: nextUser.username === "Agus" ? derivedUsername : nextUser.username,
    email,
    phone: nextUser.phone === "087712365498" ? "" : nextUser.phone,
    birthDate: nextUser.birthDate === "1999-08-12" ? "" : nextUser.birthDate
  };
}

export function initializeLiteraGo() {
  if (!isBrowser()) return;
  const storedUser = readStorage(STORAGE_KEYS.user, null);
  if (!storedUser) {
    writeStorage(STORAGE_KEYS.user, userProfile);
  } else {
    writeStorage(STORAGE_KEYS.user, normalizeLegacyUser(storedUser));
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.selectedLibrary)) {
    writeStorage(STORAGE_KEYS.selectedLibrary, libraries[0]);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.wishlist)) {
    writeStorage(STORAGE_KEYS.wishlist, defaultWishlistIds);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.borrowings)) {
    writeStorage(STORAGE_KEYS.borrowings, defaultBorrowings);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.notifications)) {
    writeStorage(STORAGE_KEYS.notifications, notifications);
  }
}

export function getCurrentUser() {
  return readStorage(STORAGE_KEYS.user, userProfile);
}

export function setCurrentUser(user) {
  writeStorage(STORAGE_KEYS.user, user);
}

export function getSelectedLibrary() {
  return readStorage(STORAGE_KEYS.selectedLibrary, libraries[0]);
}

export function setSelectedLibrary(library) {
  writeStorage(STORAGE_KEYS.selectedLibrary, library);
}

export function getCart() {
  return readStorage(STORAGE_KEYS.cart, []);
}

export function setCart(cart) {
  writeStorage(STORAGE_KEYS.cart, cart);
}

export function addToCart(bookId, libraryId) {
  const cart = getCart();
  const selectedBook = books.find((book) => book.id === bookId);
  const selectedLibrary = libraries.find((library) => library.id === libraryId) || getSelectedLibrary();
  if (!selectedBook) return cart;

  const existingIndex = cart.findIndex((item) => item.bookId === bookId);
  const defaultReturnDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  if (existingIndex >= 0) {
    cart[existingIndex] = {
      ...cart[existingIndex],
      qty: Math.min((cart[existingIndex].qty || 1) + 1, 3),
      libraryId: selectedLibrary.id
    };
  } else {
    cart.push({
      bookId,
      qty: 1,
      libraryId: selectedLibrary.id,
      returnDate: defaultReturnDate
    });
  }
  writeStorage(STORAGE_KEYS.cart, cart);
  return cart;
}

export function removeFromCart(bookId) {
  const nextCart = getCart().filter((item) => item.bookId !== bookId);
  writeStorage(STORAGE_KEYS.cart, nextCart);
  return nextCart;
}

export function updateCartItem(bookId, updates) {
  const nextCart = getCart().map((item) => (item.bookId === bookId ? { ...item, ...updates } : item));
  writeStorage(STORAGE_KEYS.cart, nextCart);
  return nextCart;
}

export function getWishlist() {
  return readStorage(STORAGE_KEYS.wishlist, defaultWishlistIds);
}

export function setWishlist(ids) {
  writeStorage(STORAGE_KEYS.wishlist, ids);
}

export function toggleWishlist(bookId) {
  const wishlist = getWishlist();
  const next = wishlist.includes(bookId)
    ? wishlist.filter((id) => id !== bookId)
    : [bookId, ...wishlist];
  writeStorage(STORAGE_KEYS.wishlist, next);
  return next;
}

export function saveCheckoutDraft(payload) {
  writeStorage(STORAGE_KEYS.checkout, payload);
}

export function getCheckoutDraft() {
  return readStorage(STORAGE_KEYS.checkout, null);
}

export function getBorrowings() {
  return readStorage(STORAGE_KEYS.borrowings, defaultBorrowings);
}

export function createBorrowing({ items, paymentMethod, pickupDate, pickupTime, libraryId, borrower }) {
  const subtotal = items.reduce((total, item) => {
    const book = books.find((entry) => entry.id === item.bookId);
    return total + (book?.price || 0) * (item.qty || 1);
  }, 0);
  const total = Math.round(subtotal * 1.1);
  const borrowingId = `YTTA${Math.floor(200 + Math.random() * 700)}`;
  const returnDate = items[0]?.returnDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const payload = {
    id: borrowingId,
    status: "Lunas",
    paymentMethod,
    libraryId,
    createdAt: new Date().toISOString().slice(0, 10),
    pickupDate,
    pickupTime,
    returnDate,
    dueLabel: new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(
      new Date(returnDate)
    ),
    subtotal,
    total,
    borrower: borrower || getCurrentUser(),
    items: items.map((item) => item.bookId)
  };
  const nextBorrowings = [payload, ...getBorrowings()];
  writeStorage(STORAGE_KEYS.borrowings, nextBorrowings);
  writeStorage(STORAGE_KEYS.lastInvoice, payload);
  writeStorage(STORAGE_KEYS.cart, []);

  const borrowedTitles = payload.items
    .map((bookId) => books.find((book) => book.id === bookId)?.title)
    .filter(Boolean)
    .join(", ");

  const nextNotifications = [
    {
      id: `notif-${Date.now()}`,
      title: "Peminjaman Berhasil",
      body: `Peminjaman ${borrowedTitles} berhasil dibuat. Jangan lupa mengembalikan pada ${payload.dueLabel}.`,
      date: new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date()),
      type: "success"
    },
    ...readStorage(STORAGE_KEYS.notifications, notifications)
  ];
  writeStorage(STORAGE_KEYS.notifications, nextNotifications);

  return payload;
}

export function getLastInvoice() {
  return readStorage(STORAGE_KEYS.lastInvoice, null);
}

export function getNotifications() {
  return readStorage(STORAGE_KEYS.notifications, notifications);
}

export { STORAGE_KEYS };

/*
  CATATAN INTEGRASI DATABASE:
  File ini sengaja memakai localStorage agar MVP bisa dicoba tanpa database.
  Saat Supabase sudah siap, fungsi-fungsi berikut adalah kandidat diganti menjadi query database:
  - getCurrentUser / setCurrentUser -> Supabase Auth + table profiles
  - getSelectedLibrary / setSelectedLibrary -> table user_preferences atau profiles.selected_library_id
  - getCart / addToCart / updateCartItem / removeFromCart -> tables carts dan cart_items
  - getWishlist / toggleWishlist -> table wishlists
  - createBorrowing -> tables borrowings, borrowing_items, payments, notifications
*/
