"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product, Review } from "../lib/types";
import { GRADIENT } from "../lib/assets";
import { api } from "../lib/api";
import { useAuth } from "../lib/auth-context";

interface Props {
  product: Product;
  initialReviews: Review[];
  t: {
    description: string;
    specifications: string;
    reviewsTab: string;
    customerReviews: string;
    noReviews: string;
    dateLocale: string;
  };
}

export default function ProductTabs({ product, initialReviews, t }: Props) {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const userReview = user ? reviews.find(r => r.userId === user.id) : null;

  const TABS = [t.description, t.specifications, t.reviewsTab];

  async function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) { setSubmitError("Please select a rating."); return; }
    if (!body.trim()) { setSubmitError("Please write a comment."); return; }
    setSubmitError(""); setSubmitting(true);
    try {
      const newReview = await api.products.createReview(product.id, { rating, body: body.trim() });
      setReviews(prev => [newReview, ...prev]);
      setRating(0); setBody(""); setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  }

  const avgRating = reviews.length
    ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
    : 0;

  return (
    <div className="flex flex-col gap-8 pb-16">
      {/* Tab bar */}
      <div className="flex gap-8 border-b border-[rgba(255,255,255,0.08)]">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`pb-4 text-base font-medium transition-colors relative ${
              activeTab === i ? "text-white" : "text-[#a0a0a0] hover:text-white"
            }`}
          >
            {tab}
            {i === 2 && reviews.length > 0 && (
              <span className="ml-1.5 text-xs text-[#00f5ff]">({reviews.length})</span>
            )}
            {activeTab === i && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: GRADIENT }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Description */}
      {activeTab === 0 && (
        <div className="flex flex-col gap-4">
          {product.description ? (
            <p className="text-[#a0a0a0] text-base leading-[28px] whitespace-pre-wrap">
              {product.description}
            </p>
          ) : (
            <p className="text-[#555] text-base italic">No description available for this product.</p>
          )}
        </div>
      )}

      {/* Specifications */}
      {activeTab === 1 && (
        <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden">
          {product.specs.length === 0 ? (
            <p className="text-[#555] text-sm p-6 italic">No specifications available.</p>
          ) : (
            <table className="w-full">
              <tbody>
                {product.specs.map((spec, i) => {
                  const [label, ...rest] = spec.split(":");
                  const value = rest.join(":").trim();
                  return (
                    <tr key={i} className="border-b border-[rgba(255,255,255,0.05)] last:border-0">
                      <td className="px-5 py-3.5 text-sm text-[#a0a0a0] font-medium w-[45%]">
                        {value ? label.trim() : "—"}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-white">
                        {value || label}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Reviews */}
      {activeTab === 2 && (
        <div className="flex flex-col gap-8">
          {/* Summary */}
          {reviews.length > 0 && (
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-1">
                <span className="text-4xl font-bold text-white">{avgRating}</span>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map(s => (
                    <span key={s} className={`text-lg ${s <= Math.round(avgRating) ? "text-[#00f5ff]" : "text-[#333]"}`}>★</span>
                  ))}
                </div>
                <span className="text-[#555] text-xs">{reviews.length} review{reviews.length !== 1 ? "s" : ""}</span>
              </div>
            </div>
          )}

          {/* Review form */}
          {isAuthenticated ? (
            (submitted || userReview) ? (
              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5 flex items-center gap-3">
                <span className="size-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold shrink-0">✓</span>
                <p className="text-green-400 text-sm font-medium">
                  {submitted ? `Thanks for your review, ${user?.firstName}!` : "You've already reviewed this product."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5 lg:p-6 flex flex-col gap-4">
                <h4 className="text-white text-base font-semibold">Leave a Review</h4>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#a0a0a0] text-xs uppercase tracking-wider">Rating</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRating(s)}
                        onMouseEnter={() => setHoverRating(s)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="text-2xl transition-colors"
                        style={{ color: s <= (hoverRating || rating) ? "#00f5ff" : "#333" }}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#a0a0a0] text-xs uppercase tracking-wider">Your Comment</label>
                  <textarea
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    placeholder="Share your experience with this product…"
                    rows={4}
                    required
                    className="bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#555] outline-none focus:border-[#00f5ff]/50 transition-colors resize-none"
                  />
                </div>
                {submitError && <p className="text-red-400 text-xs">{submitError}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="h-11 rounded-xl text-[#0a0a0a] text-sm font-semibold disabled:opacity-50 self-start px-6"
                  style={{ background: GRADIENT }}
                >
                  {submitting ? "Submitting…" : "Submit Review"}
                </button>
              </form>
            )
          ) : (
            <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5 flex items-center justify-between gap-4">
              <p className="text-[#a0a0a0] text-sm">Sign in to leave a review.</p>
              <Link
                href="/login"
                className="h-9 px-5 rounded-xl text-[#0a0a0a] text-sm font-medium shrink-0"
                style={{ background: GRADIENT }}
              >
                Sign in
              </Link>
            </div>
          )}

          {/* Reviews list */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white text-xl font-medium">{t.customerReviews}</h3>
            {reviews.length === 0 ? (
              <p className="text-[#a0a0a0] text-sm">{t.noReviews}</p>
            ) : (
              reviews.map(({ id, author, rating: r, body: b, createdAt }) => (
                <div key={id} className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-5 lg:p-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-white text-sm font-semibold">{author}</span>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map(s => (
                          <span key={s} className={`text-sm ${s <= r ? "text-[#00f5ff]" : "text-[#333]"}`}>★</span>
                        ))}
                      </div>
                    </div>
                    <span className="text-[#555] text-xs">
                      {new Date(createdAt).toLocaleDateString(t.dateLocale, { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <p className="text-[#a0a0a0] text-sm leading-6">{b}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
