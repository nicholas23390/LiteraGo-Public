import Link from "next/link";

export default function SectionHeader({ title, href = "/kategori", action = "Lihat Semua" }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      {href && <Link href={href}>{action}</Link>}
    </div>
  );
}
