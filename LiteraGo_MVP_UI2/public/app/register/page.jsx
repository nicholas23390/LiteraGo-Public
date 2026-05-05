"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/Logo";
import Toast from "@/components/Toast";
import { initializeLiteraGo, setCurrentUser } from "@/lib/client-store";
import { userProfile } from "@/lib/data";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  function handleRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    if (!username || !email || !password || !confirmPassword) {
      setToast("Nama/username, email, dan kata sandi wajib diisi.");
      return;
    }
    if (password.length < 6) {
      setToast("Kata sandi minimal 6 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      setToast("Konfirmasi kata sandi belum sama.");
      return;
    }

    setLoading(true);
    initializeLiteraGo();
    setTimeout(() => {
      setCurrentUser({
        ...userProfile,
        name: username,
        username,
        email,
        phone: "",
        birthDate: ""
      });
      setToast("Register berhasil, username akan tampil di homepage.");
      setTimeout(() => router.push("/home"), 650);
    }, 700);
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleRegister}>
        <Logo />
        <div className="form-group">
          <label htmlFor="username">Nama / Username</label>
          <input className="input" id="username" name="username" type="text" placeholder="Masukkan nama atau username" autoComplete="name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input className="input" id="email" name="email" type="email" placeholder="email@domain.com" autoComplete="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Kata Sandi</label>
          <input className="input" id="password" name="password" type="password" placeholder="Minimal 6 karakter" autoComplete="new-password" />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Konfirmasi Kata Sandi</label>
          <input className="input" id="confirmPassword" name="confirmPassword" type="password" placeholder="Ulangi kata sandi" autoComplete="new-password" />
        </div>
        <button className="primary-btn full-width" disabled={loading}>
          {loading ? "Mendaftarkan..." : "DAFTAR"}
        </button>
        <p className="auth-footer">
          Sudah punya akun? <Link className="link-text" href="/login">Masuk Disini</Link>
        </p>
      </form>
      <Toast message={toast} type={toast.includes("berhasil") ? "success" : "error"} />
    </main>
  );
}
