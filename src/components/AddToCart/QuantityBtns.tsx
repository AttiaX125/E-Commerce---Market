"use client"

import { toast } from "sonner"
import { handleQuantity } from "./addToCart.actions"

export default function QuantityBtns({count, productId} : {count : number , productId : string}) {
    function handleProductCount (count : number){
        const data = {count}
       toast.promise( handleQuantity(data, productId),{
        loading : "Loading ....",
        success: "Product Quantity Updated Succsessfully"
       })
    }
  return (
                      <div className="flex items-center gap-4 bg-[#ecd6bb] px-4 py-1 rounded-lg">
                        <button onClick={function (){handleProductCount(count - 1)}} className="text-lg text-[#6b4f3b] cursor-pointer">
                          -
                        </button>
                        <span>{count}</span>
                        <button onClick={function (){handleProductCount(count + 1)}} className="text-lg text-[#6b4f3b] cursor-pointer">
                          +
                        </button>
                      </div>
  )
}
