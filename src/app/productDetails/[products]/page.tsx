
import { getProductDetails } from "@/Services/Home/home.services";
import ProductCardDetailsClient from "../ProductCardDetailsClient";
import { getProductReviews } from "@/components/Reviews/Reviews.actions";
import Link from "next/link";

export default async function page({params}: {params: { products: string };}) {
      const { products } = await params;
    
      const product = await getProductDetails(products);
      const {

        priceAfterDiscount,
       price,_id,description
      } = product;

     await getProductReviews(_id);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f5e6d3] to-[#e8d3b9] py-12 px-6">
      <div className="max-w-6xl mx-auto">

        {/* 🔥 MAIN 3D CARD */}
       <ProductCardDetailsClient product={product}/>

        {/* 🔥 STICKY BUY BAR */}
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-white/40 backdrop-blur-xl border border-white/40 rounded-2xl px-6 py-3 shadow-xl flex items-center gap-6 z-20">

          <span className="font-semibold text-[#5a4030]">
            {priceAfterDiscount ? priceAfterDiscount :price } EGP
          </span>

          <button className="bg-[#c89b6d] text-white px-6 py-2 rounded-xl hover:scale-105 transition">
            Buy Now
          </button>

        </div>

        {/* DETAILS + REVIEWS */}
        <div className="grid lg:grid-cols-2 gap-6 mt-12">

          <div className="bg-white/30 backdrop-blur-xl rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-3 text-[#5a4030]">
              Product Details
            </h2>
            <p className="space-y-2 text-[#6b4f3b]"> {description} </p>
          </div>
          <Link href={`/reviews/${_id}`}>
            <div className="bg-white/30 backdrop-blur-xl rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-3 text-[#5a4030]">
              Reviews
            </h2>

            <div className="bg-white/50 p-4 rounded-xl hover:scale-[1.02] transition">
              <p className="font-semibold">Emma</p>
              <p className="text-[#c89b6d]">★★★★★</p>
              <p className="text-sm text-gray-600 mt-2">
                Amazing quality. Worth every pound.
              </p>
            </div>
          </div>
          </Link>

        </div>

      </div>
    </div>
  );
}