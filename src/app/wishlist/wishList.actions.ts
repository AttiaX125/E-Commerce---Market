"use server"
import { revalidatePath } from "next/cache";
import { getUserToken } from "../myUtil"

export async function addWishListProduct (productCardId : string){
    const {productId} = { productId : productCardId}
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,{
        method : "POST",
        headers :{
            token: (await getUserToken() as string),
            "content-type" : "application/json"
        },
        body : JSON.stringify({ productId })
    })
    const resData = await response.json();
    return resData;
}



export async function getAllWishListData (){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,{
        method: "GET",
        headers:{
            token : (await getUserToken() as string)
        }
    })
    const dataRes = await response.json();
    console.log(dataRes)
    return dataRes.data;
}

export async function deleteWishListProduct (productId : string){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${productId}`,{
        method: "DELETE",
        headers:{
            token : (await getUserToken() as string)
        }
    })
    const data = await response.json();
    revalidatePath('/wishlist')
    console.log(data);
    return data;
}