"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/Logo";
import Toast from "@/components/Toast";
import { getCurrentUser, initializeLiteraGo, setCurrentUser } from "@/lib/client-store";
import { userProfile } from "@/lib/data";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!email || !password) {
      setToast("Email dan kata sandi wajib diisi.");
      return;
    }

    setLoading(true);
    initializeLiteraGo();
    const savedUser = getCurrentUser();
    const fallbackUsername = email.split("@")[0] || "User";

    setTimeout(() => {
      setCurrentUser({
        ...userProfile,
        ...savedUser,
        email,
        username: savedUser?.username || fallbackUsername,
        name: savedUser?.name || fallbackUsername,
        phone: savedUser?.phone || ""
      });
      setToast("Login berhasil, mengarahkan ke homepage...");
      setTimeout(() => router.push("/home"), 650);
    }, 700);
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleLogin}>
        <Logo />
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input className="input" id="email" name="email" type="email" placeholder="Masukkan email" autoComplete="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Kata Sandi</label>
          <input className="input" id="password" name="password" type="password" placeholder="Masukkan kata sandi" autoComplete="current-password" />
        </div>
        <Link href="/register" className="link-text" style={{ display: "inline-block", marginBottom: 18 }}>
          Lupa kata sandi?
        </Link>
        <button className="primary-btn full-width" disabled={loading}>
          {loading ? "Memproses..." : "MASUK"}
        </button>
        <div className="auth-divider">atau</div>
        <button className="secondary-btn full-width" type="button" onClick={() => setToast("Google login masih placeholder untuk integrasi auth.") }>
          <span style={{ color: "#4285f4", fontWeight: 950 }}>G</span> MASUK DENGAN GOOGLE
        </button>
        <p className="auth-footer">
          Belum Punya Akun? <Link className="link-text" href="/register">Register Disini</Link>
        </p>
      </form>
      <Toast message={toast} type={toast.includes("wajib") ? "error" : "success"} />
    </main>
  );
}
