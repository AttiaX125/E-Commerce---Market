"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";

type SliderProps = {
  imagesList: string[];
  heightClass?: string;
};

export default function Slider({
  imagesList,
  heightClass = "h-[85vh]",
}: SliderProps) {
  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      autoplay={{ delay: 4000 }}
      pagination={{ clickable: true }}
      effect="fade"
      loop
      className="w-full"
    >
      {imagesList.map((src, i) => (
        <SwiperSlide key={i}>
          <div className={`relative ${heightClass} w-full`}>
            <Image
              src={src}
              alt={`slide-${i}`}
              fill
              className="object-cover scale-105"
              priority
            />

            {/* luxury overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/40 via-black/10 to-transparent" />

            {/* text placeholder (optional upgrade later) */}
            <div className="absolute bottom-20 left-10 text-white">
              <h1 className="text-4xl font-bold">Luxury Shopping</h1>
              <p className="opacity-80">Discover premium products</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}