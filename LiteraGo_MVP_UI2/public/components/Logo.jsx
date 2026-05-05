import Link from "next/link";

export default function Logo({ compact = false }) {
  return (
    <Link href="/home" className={`logo ${compact ? "compact" : ""}`} aria-label="LiteraGo home">
      <img
        src="/logo-literago.png"
        alt="LiteraGo"
        className={`logo-image ${compact ? "compact" : ""}`}
      />
    </Link>
  );
}
