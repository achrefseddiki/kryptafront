"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { GRADIENT } from "../lib/assets";

export default function ProductSearchBar({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) params.set("search", value.trim());
    else params.delete("search");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 h-11 bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 text-white text-sm placeholder-[#a0a0a0] focus:outline-none focus:border-[#00f5ff]/50 transition-colors"
      />
      <button
        type="submit"
        className="h-11 px-5 rounded-xl text-[#0a0a0a] text-sm font-bold"
        style={{ background: GRADIENT }}
      >
        →
      </button>
    </form>
  );
}
