import { getUserCart } from "@/components/AddToCart/addToCart.services";
import CheckoutReview from "./CheckoutReview";

export default async function page() {
  const {cartId} = await getUserCart()
  return (
    <>
   
     <CheckoutReview cartId={cartId}/>
    </>
  )
}
