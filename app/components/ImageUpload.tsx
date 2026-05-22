'use client';
import { useId, useRef, useState } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string) => void;
  className?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

function getToken() {
  try { return localStorage.getItem('krypta_token'); } catch { return null; }
}

export default function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? 'Upload failed');
      onChange(data.url as string);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div className={className}>
      {value && (
        <div className="relative w-full h-40 mb-2 rounded overflow-hidden bg-gray-100">
          <Image src={value} alt="preview" fill className="object-contain" unoptimized />
        </div>
      )}
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/*"
        onChange={handleFile}
        disabled={uploading}
        className="hidden"
      />
      <label
        htmlFor={inputId}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded border text-sm font-medium transition-colors
          ${uploading
            ? 'border-gray-200 text-gray-400 cursor-wait bg-gray-50'
            : 'border-gray-300 text-gray-700 cursor-pointer hover:bg-gray-50 bg-white'
          }`}
      >
        {uploading ? (
          <>
            <span className="inline-block w-3 h-3 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            Uploading…
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            {value ? 'Replace image' : 'Upload image'}
          </>
        )}
      </label>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
