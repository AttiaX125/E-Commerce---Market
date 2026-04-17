"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BrandsType } from "./brands.interface";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Props = {
  data: BrandsType[];
};
const PAGE_SIZE = 12;

export default function BrandsClient({ data }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageFromUrl = Number(searchParams.get("page") || 1);
  const [page, setPage] = useState(pageFromUrl);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  // Sync URL -> state
  useEffect(() => {
    setPage(pageFromUrl);
  }, [pageFromUrl]);

  // -------------------------------
  // 📌 Scroll restore per page
  // -------------------------------
  useEffect(() => {
    const saved = sessionStorage.getItem(`brands-scroll-${page}`);
    if (saved) {
      window.scrollTo({ top: Number(saved), behavior: "auto" });
    }
  }, [page]);

  const saveScroll = () => {
    sessionStorage.setItem(`brands-scroll-${page}`, String(window.scrollY));
  };

  // -------------------------------
  // 📌 Pagination slicing
  // -------------------------------
  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [page, data]);

  // -------------------------------
  // 📌 PRELOAD next page (instant feel)
  // -------------------------------
  const nextPageData = useMemo(() => {
    const start = page * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [page, data]);

  useEffect(() => {
    // force browser to "touch" next images
    nextPageData.forEach((item) => {
      const img = new window.Image();
      img.src = item.image;
    });
  }, [nextPageData]);

  // -------------------------------
  // 📌 Page change handler
  // -------------------------------
  const changePage = (newPage: number) => {
    if (newPage === page) return;

    saveScroll();

    setPage(newPage);

    router.push(`?page=${newPage}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f5e6d3] to-[#e8d3b9] px-6 py-10">
      {/* GRID */}
      <div ref={containerRef} className="max-w-6xl mx-auto mt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
          >
            {paginatedData.map((item) => (
              <Link key={item._id } href={`/brands/${item._id}`} className="block">
                <div className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl p-6 flex justify-center items-center shadow-md hover:scale-105 transition">
                  <div className="relative h-12 w-24 z-10 pointer-events-none">
                    <Image
                      src={item.image}
                      alt="brand"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ------------------------------- */}
      {/* 📌 Sticky Apple-style pagination */}
      {/* ------------------------------- */}
      <div className="fixed bottom-6 left-0 w-full flex justify-center z-50">
        <div className="flex items-center gap-2 bg-white/40 backdrop-blur-xl px-5 py-3 rounded-full shadow-xl border border-white/30">
          <button
            onClick={() => changePage(Math.max(page - 1, 1))}
            className="px-3 py-1 text-[#5a4030]"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;

            return (
              <button
                key={pageNum}
                onClick={() => changePage(pageNum)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition ${
                  pageNum === page
                    ? "bg-[#c89b6d] text-white shadow-md"
                    : "hover:bg-white/40 text-[#5a4030]"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => changePage(Math.min(page + 1, totalPages))}
            className="px-3 py-1 text-[#5a4030]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
