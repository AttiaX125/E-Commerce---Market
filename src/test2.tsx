"use client";

import Image from "next/image";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useState, useRef } from "react";

export default function ProductDetails({params}: Promise<{ params: { products: string } }>){
    //mine
      const { products } = await params;
    
      const product = await getProductDetails(products);
      const {
        category,
        description,
        imageCover,
        price,
        quantity,
        title,
        priceAfterDiscount,
        ratingsAverage,
        ratingsQuantity,
        brand,images
      } = product;
      //them
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

    const rotateX = ((y / rect.height) - 0.5) * 10;
    const rotateY = ((x / rect.width) - 0.5) * -10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  function resetTilt() {
    if (cardRef.current) {
      cardRef.current.style.transform = `rotateX(0) rotateY(0)`;
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f5e6d3] to-[#e8d3b9] py-12 px-6">
      <div className="max-w-6xl mx-auto">

        {/* 🔥 MAIN 3D CARD */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTilt}
          className="grid lg:grid-cols-2 gap-10 bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-6 transition-transform duration-300"
          style={{ transformStyle: "preserve-3d" }}
        >

          {/* LEFT: IMAGE + ZOOM */}
          <div className="relative group">
            <div className="relative h-[420px] rounded-2xl overflow-hidden">
              <Image
                src={imageCover}
                alt="product"
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />
            </div>

            {/* thumbnails */}
            <div className="flex gap-3 mt-4">
              {[1,2,3].map((_,i) => (
                <div
                  key={i}
                  className="w-20 h-20 rounded-xl overflow-hidden border cursor-pointer hover:scale-110 transition"
                >
                  <Image
                    src="/images/product.png"
                    alt="thumb"
                    width={80}
                    height={80}
                  />
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

              <h1 className="text-3xl font-bold text-[#5a4030]">
                Premium Leather Tote Bag
              </h1>

              {/* rating */}
              <div className="flex items-center gap-2 text-[#c89b6d]">
                {[...Array(5)].map((_,i) => (
                  <Star key={i} size={18} fill="#c89b6d" />
                ))}
                <span className="text-gray-500">(120)</span>
              </div>

              {/* price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-[#5a4030]">
                  1999 EGP
                </span>
                <span className="line-through text-gray-400">
                  2700 EGP
                </span>
                <span className="bg-[#c89b6d]/20 text-[#c89b6d] px-2 py-1 rounded">
                  Save 26%
                </span>
              </div>

              {/* qty */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-[#6b4f3b]">Quantity</span>
                <div className="flex items-center bg-white/40 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="px-3 py-1 hover:bg-white/60"
                  >-</button>

                  <span className="px-4">{qty}</span>

                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="px-3 py-1 hover:bg-white/60"
                  >+</button>
                </div>
              </div>

              {/* buttons */}
              <div className="flex gap-3 pt-4">

                {/* add to cart */}
                <button className="flex-1 flex items-center justify-center gap-2 bg-[#c89b6d] text-white py-3 rounded-xl hover:scale-105 hover:shadow-xl transition">
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>

                {/* wishlist */}
                <button
                  onClick={() => setLiked(!liked)}
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

        {/* 🔥 STICKY BUY BAR */}
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-white/40 backdrop-blur-xl border border-white/40 rounded-2xl px-6 py-3 shadow-xl flex items-center gap-6">

          <span className="font-semibold text-[#5a4030]">
            1999 EGP
          </span>

          <button className="bg-[#c89b6d] text-white px-6 py-2 rounded-xl hover:scale-105 transition">
            Buy Now
          </button>

        </div>

        {/* DETAILS + REVIEWS */}
        <div className="grid lg:grid-cols-2 gap-6 mt-12">

          <div className="bg-white/30 backdrop-blur-xl rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-3 text-[#5a4030]">
              Product Details
            </h2>

            <ul className="space-y-2 text-[#6b4f3b]">
              <li>• Premium full-grain leather</li>
              <li>• Multiple compartments</li>
              <li>• Durable stitching</li>
              <li>• Elegant everyday design</li>
            </ul>
          </div>

          <div className="bg-white/30 backdrop-blur-xl rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-3 text-[#5a4030]">
              Reviews
            </h2>

            <div className="bg-white/50 p-4 rounded-xl hover:scale-[1.02] transition">
              <p className="font-semibold">Emma</p>
              <p className="text-[#c89b6d]">★★★★★</p>
              <p className="text-sm text-gray-600 mt-2">
                Amazing quality. Worth every pound.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}