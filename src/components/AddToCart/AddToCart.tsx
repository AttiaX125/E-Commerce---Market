"use client"
import { toast } from "sonner";
import AppButton from "../Shared/AppButton/AppButton";
import { handleProductAddToCart } from "./addToCart.services";

export default function AddToCart({id} : {id : string}) {
    function addProductToCart(){
      toast.promise(handleProductAddToCart({productId : id}),{
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
      <AppButton onClick={addProductToCart} className=" bg-[#A65322] hover:bg-[#F5E9DA] text-gray-900 w-full cursor-pointer">Add to Cart</AppButton>
    </>
  )
}
