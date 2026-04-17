"use client";


import { addWishListProduct } from "@/app/wishlist/wishList.actions";
import { Heart } from "lucide-react";
import { toast } from "sonner";

export default function AddToWishList({productId}: {productId : string}) {

    function AddProductToWishList (e: React.MouseEvent){
      e.stopPropagation();
e.preventDefault();
        toast.promise(addWishListProduct(productId),{
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
    onClick={AddProductToWishList}
      className=" z-30 bg-white/70 backdrop-blur-md p-2 rounded-full hover:scale-110 transition"
    >
      <Heart size={18} />
    </div>
  );
}
