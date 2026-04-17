"use server"

export async function getAllCategories (){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`)
    const data = await response.json();
    return data.data
}