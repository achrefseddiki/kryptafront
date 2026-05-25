"use client";

import { useState } from "react";
import { GRADIENT } from "../../lib/assets";
import { api } from "../../lib/api";
import type { Review } from "../../lib/types";

interface Props {
  offerId: string;
  initialReviews: Review[];
}

export default function OfferReviews({ offerId, initialReviews }: Props) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [form, setForm] = useState({ author: "", rating: 5, body: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const review = await api.offers.addReview(offerId, form);
      setReviews(prev => [review, ...prev]);
      setForm({ author: "", rating: 5, body: "" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'envoi");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-8 pb-4">
      <h2 className="text-white text-xl font-bold">
        Avis clients <span className="text-[#a0a0a0] font-normal text-base">({reviews.length})</span>
      </h2>

      {/* Review list */}
      {reviews.length === 0 ? (
        <p className="text-[#a0a0a0]">Aucun avis pour l'instant. Soyez le premier !</p>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map(({ id, author, rating, body, createdAt }) => (
            <div key={id} className="bg-[#1a1a1a] border border-white/[0.08] rounded-2xl p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-white text-base font-medium">{author}</span>
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <span key={s} className={`text-sm ${s <= rating ? "text-[#00f5ff]" : "text-white/20"}`}>★</span>
                    ))}
                  </div>
                </div>
                <span className="text-[#a0a0a0] text-sm">
                  {new Date(createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <p className="text-[#a0a0a0] text-sm leading-6">{body}</p>
            </div>
          ))}
        </div>
      )}

      {/* Submit form */}
      <div className="bg-[#1a1a1a] border border-white/[0.08] rounded-2xl p-6 flex flex-col gap-5">
        <h3 className="text-white text-base font-semibold">Laisser un avis</h3>

        {success && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
            <p className="text-green-400 text-sm">Merci pour votre avis !</p>
          </div>
        )}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-white text-xs font-medium uppercase tracking-wider">Note</label>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, rating: s }))}
                  className={`text-2xl transition-colors ${s <= form.rating ? "text-[#00f5ff]" : "text-white/20 hover:text-white/50"}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-white text-xs font-medium uppercase tracking-wider">Nom</label>
              <input
                type="text"
                value={form.author}
                onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                placeholder="Votre nom"
                required
                className="bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-[#555] outline-none focus:border-[#00f5ff] transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-white text-xs font-medium uppercase tracking-wider">Commentaire</label>
            <textarea
              value={form.body}
              onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
              placeholder="Votre avis sur cette offre…"
              required
              rows={4}
              className="bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#555] outline-none focus:border-[#00f5ff] transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="self-start h-11 px-6 rounded-2xl text-[#0a0a0a] text-sm font-medium disabled:opacity-50 transition-opacity"
            style={{ background: GRADIENT }}
          >
            {submitting ? "Envoi…" : "Publier l'avis"}
          </button>
        </form>
      </div>
    </div>
  );
}
