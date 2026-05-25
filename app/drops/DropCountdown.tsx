"use client";
import { useEffect, useState } from "react";

function getTimeLeft(endsAt: string) {
  const diff = new Date(endsAt).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    d: Math.floor(diff / (1000 * 60 * 60 * 24)),
    h: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    s: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export default function DropCountdown({ endsAt }: { endsAt: string }) {
  const [time, setTime] = useState(() => getTimeLeft(endsAt));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(endsAt)), 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  if (!time) return null;

  const units = [
    { label: "D", val: time.d },
    { label: "H", val: time.h },
    { label: "M", val: time.m },
    { label: "S", val: time.s },
  ];

  return (
    <div className="flex items-center gap-2">
      {units.map(({ label, val }, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex flex-col items-center bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.12)] rounded-xl w-[52px] py-2.5">
            <span className="text-white text-xl font-bold tabular-nums leading-none">
              {String(val).padStart(2, "0")}
            </span>
            <span className="text-[#a0a0a0] text-[10px] mt-1 uppercase tracking-wide">{label}</span>
          </div>
          {i < 3 && <span className="text-[#a0a0a0] text-lg font-bold leading-none mb-3">:</span>}
        </div>
      ))}
    </div>
  );
}
