"use server"

export async function getAllBrands(){
    const response = await fetch (`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`,{
         cache: "force-cache"
    })
    const dataResponse = await response.json();
    
    return dataResponse;
}

export async function getBrandData (productId : string){
    const response = await fetch (`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands/${productId}`);
    const data = await response.json();
    return data;
}