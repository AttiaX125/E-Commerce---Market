"use server"

import { revalidatePath } from "next/cache";
import { getUserToken } from "../myUtil"
import { ShippingAdressType } from "./address/CheckoutStepOne/adress.interface"

export async function handleCashOrder ( shippingAddress : ShippingAdressType , cartId : string ){
    const response = await fetch (`${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/orders/${cartId}`,{
        method: "POST",
        headers: {
            token : (await getUserToken() as string),
            "content-type" : "application/json"
        },
        body: JSON.stringify(shippingAddress)
    })
    const responseData = await response.json();
    console.log(responseData)
    revalidatePath("/cart")
    return responseData ;
}

export async function handleCardOrders (shippingAddress : ShippingAdressType , cartId : string){
        const response = await fetch (`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
        method: "POST",
        headers: {
            token : (await getUserToken() as string),
            "content-type" : "application/json"
        },
        body: JSON.stringify(shippingAddress)
    })
    const responseData = await response.json();
    console.log(responseData)
    revalidatePath("/cart")
    return responseData ;
}