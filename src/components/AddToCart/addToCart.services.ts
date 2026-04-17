"use server"

import { getUserToken } from "@/app/myUtil";
import { productCard } from "./addToCart.interface"
import { revalidatePath } from "next/cache";

export async function handleProductAddToCart(data : productCard){
    const response = await fetch (`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,{
        method: "POST",
        headers: {
            token : (await getUserToken() as string),
            "content-type" : "application/json"
        },
        body : JSON.stringify(data)
    })
    const responseData = await response.json();
    revalidatePath('/cart')
    return responseData;
}

export async function getUserCart (){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/cart`,{
        method: "GET",
        headers:{
            token : (await getUserToken() as string )
        },
        cache: "force-cache"
       
    })
     const {status, message, numOfCartItems, cartId, data} = await response.json();
     return {status, message, numOfCartItems, cartId, data}
}