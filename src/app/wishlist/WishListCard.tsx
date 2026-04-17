"use client"

import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { ProductWishListType } from "./wishlist.interface";
import { deleteWishListProduct } from "./wishList.actions";
import { toast } from "sonner";
import { handleProductAddToCart } from "@/components/AddToCart/addToCart.services";

export default function WishListCard({ item }: { item: ProductWishListType }) {
  function handleDeleteWishProduct(){
    toast.promise(deleteWishListProduct(item._id),{
      loading : "delete Item ........",
      success: (data) =>{
        return data.message;
      },

      error: (data) => {
        return data.status;
      },
      position : "top-right"

    })
    
  }
       function addProductToCart2(){
          toast.promise(handleProductAddToCart({productId : item._id}),{
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
  return (
    <>
      <div key={item.id} className="group relative">
        {/* GLOW */}
        <div className="absolute pointer-events-none inset-0 rounded-3xl bg-linear-to-r from-[#c89b6d]/20 to-[#a65322]/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />

        {/* CARD */}
        <div className="relative backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl overflow-hidden shadow-xl transition-all duration-500 group-hover:scale-[1.03]">
          {/* IMAGE */}
          <div className="relative h-60 overflow-hidden">
            <Image
              src={item.imageCover}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-110 transition duration-500"
            />

            {/* CATEGORY */}
            <span className="absolute top-3 left-3 bg-white/70 backdrop-blur-md text-[#5a4030] text-xs px-3 py-1 rounded-full">
              {item.category.name}
            </span>

            {/* FAVORITE ICON */}
            <button className="absolute top-3 right-3 p-2 rounded-full bg-white/60 backdrop-blur-md hover:scale-110 transition">
              <Heart className="text-red-500 fill-red-500" />
            </button>
          </div>

          {/* CONTENT */}
          <div className="p-4 space-y-3">
            <h3 className="font-semibold text-[#5a4030]">{item.title}</h3>

            {/* PRICE */}
            <div className="flex items-center gap-2">
              {item.oldPrice && (
                <span className="line-through text-gray-400 text-sm">
                  {item.oldPrice} EGP
                </span>
              )}
              <span className="font-bold text-[#a65322]">{item.price} EGP</span>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 mt-3">
              <button onClick={addProductToCart2} className="flex-1 flex items-center justify-center gap-2 bg-[#c89b6d] text-white py-2 rounded-xl hover:scale-105 transition">
                <ShoppingCart size={16} />
                Add
              </button>

              <button onClick={handleDeleteWishProduct} className="flex items-center justify-center px-3 bg-white/40 backdrop-blur-md rounded-xl hover:bg-white/60 transition cursor-pointer">
                <Trash2 className="cursor-pointer" size={16} />
              </button>
            </div>
          </div>

          {/* SHINE EFFECT */}
          <div className="absolute pointer-events-none inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
            <div className="absolute -left-40 top-0 w-40 h-full bg-white/30 skew-x-[-20deg] blur-md animate-[shine_1.2s_linear]" />
          </div>
        </div>
      </div>
    </>
  );
}
