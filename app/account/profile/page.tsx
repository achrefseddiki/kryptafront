"use client";

import { useState } from "react";
import { useT } from "../../lib/language-context";
import { useAuth } from "../../lib/auth-context";
import { api } from "../../lib/api";
import { GRADIENT } from "../../lib/assets";

function Field({
  label,
  value,
  onChange,
  type = "text",
  disabled,
  note,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  type?: string;
  disabled?: boolean;
  note?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[#a0a0a0] text-xs uppercase tracking-wider">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className="bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#00f5ff]/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      />
      {note && <p className="text-[#555] text-xs">{note}</p>}
    </div>
  );
}

export default function AccountProfilePage() {
  const t = useT();
  const { user, login } = useAuth();

  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [profileMsg, setProfileMsg] = useState("");
  const [profileError, setProfileError] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [pwError, setPwError] = useState("");
  const [savingPw, setSavingPw] = useState(false);

  const isSocialOnly = !user?.email?.includes("@") === false && false; // always allow section; backend enforces

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setProfileMsg("");
    setProfileError("");
    setSavingProfile(true);
    try {
      await api.users.updateProfile({ firstName, lastName });
      setProfileMsg(t.account.profileSaved);
      // Update sessionStorage cache so NavProfileButton reflects change immediately
      try {
        const raw = sessionStorage.getItem("krypta_user");
        if (raw) {
          const cached = JSON.parse(raw);
          sessionStorage.setItem(
            "krypta_user",
            JSON.stringify({ ...cached, firstName, lastName }),
          );
        }
      } catch {}
    } catch (err) {
      setProfileError(err instanceof Error ? err.message : "Error");
    } finally {
      setSavingProfile(false);
    }
  }

  async function handleSavePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwMsg("");
    setPwError("");
    if (newPw !== confirmPw) {
      setPwError(t.account.passwordMismatch);
      return;
    }
    setSavingPw(true);
    try {
      await api.users.updateProfile({
        currentPassword: currentPw,
        newPassword: newPw,
      });
      setPwMsg(t.account.passwordSaved);
      setCurrentPw("");
      setNewPw("");
      setConfirmPw("");
    } catch (err) {
      setPwError(err instanceof Error ? err.message : "Error");
    } finally {
      setSavingPw(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Personal info */}
      <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 flex flex-col gap-6">
        <h2 className="text-white text-lg font-medium">
          {t.account.profileTitle}
        </h2>
        <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Field
              label={t.account.firstName}
              value={firstName}
              onChange={setFirstName}
            />
            <Field
              label={t.account.lastName}
              value={lastName}
              onChange={setLastName}
            />
          </div>
          <Field
            label={t.account.email}
            value={user?.email ?? ""}
            disabled
            note={t.account.emailNote}
          />

          {profileMsg && <p className="text-green-400 text-sm">{profileMsg}</p>}
          {profileError && (
            <p className="text-red-400 text-sm">{profileError}</p>
          )}

          <button
            type="submit"
            disabled={savingProfile}
            className="self-start h-11 px-6 rounded-2xl text-[#0a0a0a] text-sm font-medium disabled:opacity-60"
            style={{ background: GRADIENT }}
          >
            {savingProfile ? t.account.saving : t.account.saveProfile}
          </button>
        </form>
      </div>

      {/* Password */}
      <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 flex flex-col gap-6">
        <h2 className="text-white text-lg font-medium">
          {t.account.passwordTitle}
        </h2>

        {user && (user as any).provider && !(user as any).password ? (
          <p className="text-[#a0a0a0] text-sm">{t.account.socialAccount}</p>
        ) : (
          <form onSubmit={handleSavePassword} className="flex flex-col gap-4">
            <Field
              label={t.account.currentPassword}
              value={currentPw}
              onChange={setCurrentPw}
              type="password"
            />
            <Field
              label={t.account.newPassword}
              value={newPw}
              onChange={setNewPw}
              type="password"
            />
            <Field
              label={t.account.confirmPassword}
              value={confirmPw}
              onChange={setConfirmPw}
              type="password"
            />

            {pwMsg && <p className="text-green-400 text-sm">{pwMsg}</p>}
            {pwError && <p className="text-red-400 text-sm">{pwError}</p>}

            <button
              type="submit"
              disabled={savingPw || !currentPw || !newPw || !confirmPw}
              className="self-start h-11 px-6 rounded-2xl text-[#0a0a0a] text-sm font-medium disabled:opacity-60"
              style={{ background: GRADIENT }}
            >
              {savingPw ? t.account.saving : t.account.savePassword}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
