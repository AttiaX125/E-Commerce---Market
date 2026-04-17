"use server"
import { getUserToken } from "@/app/myUtil";
import { productCount, userCoupon } from "./addToCart.interface";
import { revalidatePath } from "next/cache";

export async function DeleteCardProduct (productId : string){
    const response = await fetch (`${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/cart/${productId}`,{
        method: "DELETE",
        headers: {
            token: (await getUserToken() as string),
            "content-type" : "application/json"
        }
    })
    const dataResponse = await response.json();
    console.log("delete info",dataResponse)
     revalidatePath('/cart')
    return dataResponse;
}
export async function handleQuantity (data : productCount,productId : string){
    const response = await fetch (`${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/cart/${productId}`,{
        method: "PUT",
        headers: {
            token: (await getUserToken() as string),
            "content-type" : "application/json"
        },
        body: JSON.stringify(data)
       
    })
    const dataResponse = await response.json();
    console.log("delete info",dataResponse)
     revalidatePath('/cart')
    return dataResponse;
}

export async function handleVoucher (data : userCoupon){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/cart/applyCoupon`,{
        method: "PUT",
         headers: {
            token: (await getUserToken() as string),
            "content-type" : "application/json"
        },
        body : JSON.stringify(data)
    })
    const responseData = await response.json();
    console.log(responseData);
     revalidatePath('/cart')
}