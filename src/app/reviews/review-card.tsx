"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { Star } from "lucide-react";

import { ReviewDataType } from "./reviews.interface";
import { DeleteReview, updateReview } from "@/components/Reviews/Reviews.actions";

export default function ReviewCard({ data }: ReviewDataType) {
  const review = data?.data ?? data;
  console.log("REVIEW CARD DATA:", data);

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(review.review);
  const [rating, setRating] = useState(review.rating);

  const [isPending, startTransition] = useTransition();

  // 🗑 DELETE
  const handleDelete = () => {
    startTransition(async () => {
      await DeleteReview(review._id);
      // optional: trigger parent refresh instead of local remove
      window.location.reload(); // simple safe fallback
    });
  };

  // ✏️ UPDATE
  const handleUpdate = () => {
    startTransition(async () => {
      await updateReview(review._id, text, rating);
      setIsEditing(false);
      window.location.reload(); // replace later with optimistic update
    });
  };

  return (
    <>
      <div className="rounded-2xl bg-white/40 backdrop-blur-xl border border-[#c9ab8640] p-5 shadow-md hover:shadow-xl transition hover:-translate-y-1">

        {/* HEADER */}
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image src="/avatar.jpg" alt="user" width={40} height={40} />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-[#4a3428]">
                {review.user?.name || "User"}
              </h3>

              {/* STARS */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < review.rating
                        ? "text-[#c89b6d] fill-[#c89b6d]"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
            </div>

            <p className="text-xs text-[#6b4f3a] mt-1">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* TEXT */}
        <p className="mt-3 text-sm leading-relaxed text-[#4a3428]">
          {review.review}
        </p>

        {/* ACTIONS */}
        <div className="flex gap-4 mt-4 text-xs">
          <button
            onClick={() => setIsEditing(true)}
            className="text-[#5a4030] underline hover:opacity-70"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            disabled={isPending}
            className="text-red-500 underline hover:opacity-70"
          >
            Delete
          </button>
        </div>
      </div>

      {/* EDIT MODAL */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-[420px] bg-white/40 backdrop-blur-xl border border-white/30 p-6 rounded-2xl shadow-2xl">

            <h2 className="text-lg font-semibold text-[#4a3428] mb-4">
              Edit Review
            </h2>

            {/* TEXT */}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/50 border border-white/40 outline-none text-sm"
            />

            {/* RATING */}
            <div className="flex items-center gap-2 mt-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setRating(n)}
                  className="text-xl"
                >
                  <Star
                    size={18}
                    className={
                      n <= rating
                        ? "text-[#c89b6d] fill-[#c89b6d]"
                        : "text-gray-300"
                    }
                  />
                </button>
              ))}
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                disabled={isPending}
                className="bg-[#c89b6d] text-white px-4 py-2 rounded-xl text-sm hover:scale-105 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}