"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PageShell from "@/components/PageShell";
import Toast from "@/components/Toast";
import { getCurrentUser, initializeLiteraGo, setCurrentUser } from "@/lib/client-store";
import { userProfile } from "@/lib/data";

export default function ProfilePage() {
  const [user, setUser] = useState(userProfile);
  const [toast, setToast] = useState("");

  useEffect(() => {
    initializeLiteraGo();
    setUser(getCurrentUser());
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextUser = {
      ...userProfile,
      ...user,
      username: String(formData.get("username") || "").trim(),
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      birthDate: String(formData.get("birthDate") || "")
    };
    setCurrentUser(nextUser);
    setUser(nextUser);
    window.dispatchEvent(new Event("literago:user"));
    setToast("Profile berhasil diperbarui.");
    setTimeout(() => setToast(""), 2500);
  }

  const displayName = user.username || user.name || "User";
  const displayEmail = user.email || "Email belum diisi";
  const displayPhone = user.phone || "Nomor telepon belum diisi";

  return (
    <PageShell>
      <section className="profile-hero">
        <div className="profile-user">
          <div className="profile-avatar">{displayName.slice(0, 1).toUpperCase()}</div>
          <div>
            <h1>Akun</h1>
            <h2>{displayName}</h2>
            <p>{displayEmail}<br />{displayPhone}</p>
          </div>
        </div>
        <Link className="secondary-btn" href="/login">LOGOUT</Link>
      </section>

      <section className="profile-layout">
        <div className="profile-card">
          <h2>Profile</h2>
          <p>Ubah Profile · Hapus Foto</p>
          <form onSubmit={handleSubmit} style={{ marginTop: 18 }}>
            <div className="form-group">
              <label>Nickname</label>
              <input className="input" name="username" defaultValue={user.username || ""} placeholder="Masukkan username" />
            </div>
            <div className="form-group">
              <label>Nama</label>
              <input className="input" name="name" defaultValue={user.name || ""} placeholder="Masukkan nama lengkap" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input className="input" name="email" type="email" defaultValue={user.email || ""} placeholder="email@domain.com" />
            </div>
            <div className="form-group">
              <label>Old Password</label>
              <input className="input" name="oldPassword" type="password" placeholder="********" />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input className="input" name="newPassword" type="password" placeholder="********" />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input className="input" name="phone" defaultValue={user.phone || ""} placeholder="Masukkan nomor telepon" />
            </div>
            <div className="form-group">
              <label>Tanggal Lahir</label>
              <input className="input" name="birthDate" type="date" defaultValue={user.birthDate || ""} />
            </div>
            <button className="primary-btn full-width">UPDATE</button>
          </form>
        </div>
      </section>
      <Toast message={toast} />
    </PageShell>
  );
}
