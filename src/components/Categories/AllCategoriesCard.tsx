"use client";

import { AllCatrgoriesType } from "@/app/categories/categories.interface";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function AllCategoriesCard({categoriesData} : {categoriesData : AllCatrgoriesType[]}) {
      const router = useRouter();

  return (
<div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {categoriesData.map((cat : AllCatrgoriesType) => (
          <div
            key={cat._id}
            onClick={() => router.push(`/categories/${cat._id}`)}
            className="group relative cursor-pointer rounded-2xl overflow-hidden
              bg-white/40 backdrop-blur-xl border border-white/30
              shadow-lg hover:shadow-2xl transition-all duration-300
              hover:-translate-y-2"
          >

            {/* IMAGE */}
            <div className="relative h-40">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* OVERLAY GLOW */}
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />

            {/* TEXT */}
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-[#5a4030] group-hover:text-[#c89b6d] transition">
                {cat.name}
              </h3>
            </div>

            {/* HOVER LIGHT EFFECT */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none">
              <div className="absolute -top-10 left-1/2 w-40 h-40 bg-white/20 blur-3xl rounded-full -translate-x-1/2" />
            </div>

          </div>
        ))}

      </div>
  )
}
