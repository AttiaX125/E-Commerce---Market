"use server"
import { getUserToken } from "@/app/myUtil";
import { revalidatePath } from "next/cache";


export async function createReview(
  productId: string,
  review: string,
  rating: number
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${productId}/reviews`,
    {
      method: "POST",
      headers: {
        token: (await getUserToken()) as string,
        "content-type": "application/json",
      },
      body: JSON.stringify({ review, rating }),
    }
  );

  const data = await response.json();

  // 🔥 THIS is the important part
    revalidatePath(`/reviews/${productId}`);
    console.log(data);
  return data;
}
export async function DeleteReview (reviewId : string){
    const response = await fetch (`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/reviews/${reviewId}`,
        {
            method: "DELETE",
            headers: {
                token : (await getUserToken() as string)
            }
        }
    )
    const dataResponse = await response.json();
    console.log("delete review" , dataResponse)
}

export async function getProductReviews (productId : string){
    const response = await fetch (`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${productId}/reviews`,{
        method: "GET"
    })
    const data = await response.json();
    return data;
}
export async function updateReview (reviewId : string , data: string , preViews : number){
     const updatedReviewBody = {review : data , rating :preViews }
    const response = await fetch (`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/reviews/${reviewId}`,{
        method : "PUT",
        headers: {
            token : (await getUserToken() as string),
            "content-type" : "application/json"
        },
        body: JSON.stringify(updatedReviewBody)
    })
    const responseData = await response.json();
    console.log("Updated Review" , responseData)
    return responseData;
}