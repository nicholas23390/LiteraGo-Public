import "./globals.css";

export const metadata = {
  title: "LiteraGo MVP",
  description: "Aplikasi peminjaman buku digital LiteraGo"
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
