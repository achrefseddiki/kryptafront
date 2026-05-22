"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
const TOKEN_KEY = "krypta_token";
const USER_KEY = "krypta_user";

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin";
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function fetchMe(token: string): Promise<AuthUser> {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

function readCachedUser(): AuthUser | null {
  try {
    const raw = sessionStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Runs synchronously before paint — restores auth state from session cache
  // so the profile button is never replaced by an invisible skeleton on reload/navigation.
  useLayoutEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) {
      setLoading(false);
      return;
    }
    const cached = readCachedUser();
    if (cached) {
      setUser(cached);
      setToken(stored);
      setLoading(false);
    }
    // If no cache yet (first ever load), loading stays true until fetchMe resolves below.
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) return;
    fetchMe(stored)
      .then((me) => {
        setToken(stored);
        setUser(me);
        sessionStorage.setItem(USER_KEY, JSON.stringify(me));
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(USER_KEY);
        setUser(null);
        setToken(null);
      })
      .finally(() => setLoading(false));
  }, []);

  async function authenticate(path: string, body: object) {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = Array.isArray(data.message) ? data.message[0] : data.message;
      throw new Error(msg ?? "Authentication failed");
    }
    const t: string = data.access_token;
    localStorage.setItem(TOKEN_KEY, t);
    setToken(t);
    const me = await fetchMe(t);
    setUser(me);
    sessionStorage.setItem(USER_KEY, JSON.stringify(me));
  }

  async function login(email: string, password: string) {
    await authenticate("/auth/login", { email, password });
  }

  async function register(firstName: string, lastName: string, email: string, password: string) {
    await authenticate("/auth/register", { firstName, lastName, email, password });
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
