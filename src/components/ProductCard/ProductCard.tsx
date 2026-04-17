"use client";
import { ProductsData } from "@/app/home.interface";
import { Badge } from "@/components/ui/badge";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import AppButton from "../Shared/AppButton/AppButton";
import Link from "next/link";
import AddToCart from "../AddToCart/AddToCart";
import { motion } from "framer-motion";
import AddToWishList from "../AddWishList/AddWishList";

export default function ProductCard({
  product,
  index,
}: {
  product: ProductsData;
  index: number;
}) {
  const {
    imageCover,
    category,
    description,
    id,
    price,
    quantity,
    ratingsAverage,
    ratingsQuantity,
    title,
    priceAfterDiscount,
    _id,
  } = product;


  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="group perspective"
    >
      <div
        className="
        relative
        bg-white/30
        backdrop-blur-xl
        border border-white/40
        rounded-3xl
        overflow-hidden
        transition-all duration-500
        hover:-translate-y-3
        hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)]
      "
      >
        <Link href={`/productDetails/${id}`}>
          {/* IMAGE */}
          <div className="relative h-56 overflow-hidden">
            <Image
              fill
              src={imageCover}
              alt={title}
              className="object-cover transition duration-700 group-hover:scale-110"
            />

            {/* SHINE EFFECT */}
            <div
              className="
              absolute inset-0
              bg-linear-to-r from-transparent via-white/30 to-transparent
              opacity-0 group-hover:opacity-100
              translate-x-[-100%] group-hover:translate-x-full
              transition duration-1000
            "
            />

            {/* CATEGORY */}
            <div className="absolute top-3 left-3 z-20">
              <Badge className="bg-white/80 backdrop-blur text-xs">
                {category.name}
              </Badge>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[#5a4030]">
                {title.split(" ", 2).join(" ")}
              </h3>
              <AddToWishList productId={_id}/>
            </div>

           
              <div className="flex items-center gap-2 text-sm text-[#6b4f3b]">
                {" "}
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                {ratingsAverage} ({ratingsQuantity})
              </div>
            

            <div className="flex items-center gap-2">
              {priceAfterDiscount ? (
                <>
                  <span className="line-through text-gray-400 text-sm">
                    {price} EGP
                  </span>
                  <span className="font-bold text-[#5a4030]">
                    {priceAfterDiscount} EGP
                  </span>
                </>
              ) : (
                <span className="font-bold text-[#5a4030]">{price} EGP</span>
              )}
            </div>
          </div>
        </Link>

        {/* FOOTER */}
        <div className="p-4 pt-0">
          <AddToCart id={_id} />
        </div>

        {/* GLOW */}
        <div
          className="
          absolute inset-0 rounded-3xl
          bg-white/10 opacity-0 group-hover:opacity-100
          transition duration-500 pointer-events-none
        "
        />
      </div>
    </motion.div>
  );
}
