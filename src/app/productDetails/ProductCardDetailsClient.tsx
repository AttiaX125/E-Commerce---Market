"use client";

import Image from "next/image";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useState, useRef } from "react";
import { handleProductAddToCart } from "@/components/AddToCart/addToCart.services";
import { toast } from "sonner";
import { ProductDetailsData } from "./[products]/productDetails.interface";
import { addWishListProduct } from "../wishlist/wishList.actions";

export default function ProductCardDetailsClient({ product } : {product : ProductDetailsData}) {
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  // 🎯 3D hover effect
  function handleMouseMove(e: React.MouseEvent) {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * 10;
    const rotateY = (x / rect.width - 0.5) * -10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  function resetTilt() {
    if (cardRef.current) {
      cardRef.current.style.transform = `rotateX(0) rotateY(0)`;
    }
  }

      function addProductToCart(){
      toast.promise(handleProductAddToCart({productId : product._id}),{
        loading : "adding ......",
        success: function (data){
          return data.message;
        },
        error: function (data){
          return data.message;
        }, 
        position: "top-right"
      })
        
    }
       function AddProductToWishList (){
            toast.promise(addWishListProduct(product._id),{
              loading: "adding to wish list",
              success: function (data){
                return data.message
              },
              error: function (data){
                return data.message
              }
            })
        }
  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      className="grid lg:grid-cols-2 gap-10 bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-6 transition-transform duration-300"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* LEFT: IMAGE + ZOOM */}
      <div className="relative group">
        <div className="relative h-105 rounded-2xl overflow-hidden">
          <Image
            src={product.imageCover}
            alt="product"
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
          />
        </div>

        {/* thumbnails */}
        <div className="flex gap-3 mt-4">
          {product.images?.map((img: string, i: number) => (
            <div
              key={i}
              className="w-20 h-20 rounded-xl overflow-hidden border cursor-pointer hover:scale-110 transition"
            >
              <Image src={img} alt="thumb" width={80} height={80} />
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: DETAILS */}
      <div className="flex flex-col justify-between">
        <div className="space-y-5">
          <span className="bg-green-200 text-green-700 text-xs px-3 py-1 rounded-full w-fit">
            In Stock
          </span>

          <h1 className="text-3xl font-bold text-[#5a4030]">{product.title}</h1>

          {/* rating */}
          <div className="flex items-center gap-2 text-[#c89b6d]">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={
                  i < Math.round(product.ratingsAverage)
                    ? "text-[#c89b6d] fill-[#c89b6d]"
                    : "text-gray-300"
                }
              />
            ))}
            <span className="text-gray-500">({product.ratingsQuantity})</span>
          </div>

          {/* price */}
          <div className="flex items-center gap-4">
            {product.priceAfterDiscount ? (
              <>
                <span className="text-3xl font-bold text-[#5a4030]">
                  {product.priceAfterDiscount} EGP
                </span>
                <span className="line-through text-gray-400">
                  {product.price} EGP
                </span>
                <span className="bg-[#c89b6d]/20 text-[#c89b6d] px-2 py-1 rounded">
                  Save{" "}
                  {Math.round(
                    ((product.price - product.priceAfterDiscount) /
                      product.price) *
                      100,
                  )}{" "}
                  %
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-[#5a4030]">
                {product.price} EGP
              </span>
            )}
          </div>

          {/* qty */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#6b4f3b]">Quantity</span>
            <div className="flex items-center bg-white/40 rounded-xl overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-1 hover:bg-white/60"
              >
                -
              </button>

              <span className="px-4">{qty}</span>

              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-1 hover:bg-white/60"
              >
                +
              </button>
            </div>
          </div>

          {/* buttons */}
          <div className="flex gap-3 pt-4">
            {/* add to cart */}
            <button onClick={addProductToCart} className="flex-1 flex items-center justify-center gap-2 bg-[#c89b6d] text-white py-3 rounded-xl hover:scale-105 hover:shadow-xl transition">
              <ShoppingCart size={18} />
              Add to Cart
            </button>

            {/* wishlist */}
            <button
              onClick={() => {
                AddProductToWishList()
                setLiked(!liked)}}
              className={`p-3 rounded-xl backdrop-blur-md transition ${
                liked
                  ? "bg-red-500 text-white scale-110"
                  : "bg-white/40 hover:scale-110"
              }`}
            >
              <Heart fill={liked ? "white" : "none"} />
            </button>
          </div>
        </div>

        <p className="text-sm text-[#6b4f3b]/70 mt-6">
          Free shipping • 30-day returns
        </p>
      </div>
    </div>
  );
}
