"use client"
import { X } from "lucide-react";
import AppButton from "../Shared/AppButton/AppButton";
import { toast } from "sonner";
import { DeleteCardProduct } from "./addToCart.actions";

export default function DeleteProductBtn({productId} : {productId :string}) {
  
    function handleDeleteProduct (){
         
       toast.promise(DeleteCardProduct(productId),
    {
        loading: "Deleting .........",
        success: " sba7 sba7 ya 3am el 7ag",
        position: "top-right"
    })
    }
  return (
    <AppButton onClick={() => {handleDeleteProduct()}} className="bg-[#ecd6bb] text-[#6b4f3b] rounded-full w-7 h-7 cursor-pointer hover:text-red-500 hover:bg-rose-200">
      {" "}
      <X size={8} />{" "}
    </AppButton>
  );
}
