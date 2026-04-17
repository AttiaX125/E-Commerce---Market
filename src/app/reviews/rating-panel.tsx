"use client";

import { createReview } from "@/components/Reviews/Reviews.actions";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function ReviewsSection({ productId}: { productId: string;}) {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [isPending, startTransition] = useTransition();

  const handleCreate = () => {
    if (!text.trim()) return;

    const promise = createReview(productId, text, rating);

    startTransition(() => {
      toast.promise(promise, {
        loading: "Posting review...",
        success: (res) => {
          setText("");
          setRating(5);
          return "Review added successfully ✔";
        },
        error: "Failed to add review ❌",
      });
    });
  };

  return (
    <div className="mt-10 space-y-6">

      {/* CREATE REVIEW */}
      <div className="bg-white/30 backdrop-blur-xl border border-white/30 p-5 rounded-2xl shadow-xl">

        <h2 className="text-lg font-semibold text-[#5a4030] mb-3">
          Write a Review
        </h2>

        <textarea
          className="w-full p-3 rounded-xl bg-white/50 border border-white/40 outline-none"
          placeholder="Share your experience..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex items-center justify-between mt-3">
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="p-2 rounded-lg bg-white/50"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} ⭐
              </option>
            ))}
          </select>

          <button
            onClick={handleCreate}
            disabled={isPending}
            className="bg-[#c89b6d] text-white px-5 py-2 rounded-xl hover:scale-105 transition"
          >
            Post Review
          </button>
        </div>
      </div>
    </div>
  );
}