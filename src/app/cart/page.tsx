import { getUserCart } from "@/components/AddToCart/addToCart.services";
import DeleteProductBtn from "@/components/AddToCart/deleteProductBtn";
import QuantityBtns from "@/components/AddToCart/QuantityBtns";
import ProceedCartBtn from "./../../components/AddToCart/proceedCartBtn";
import Image from "next/image";

export default async function page() {
  const { numOfCartItems, cartId, data } = await getUserCart();


  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-[#f5e6d3] to-[#e8d3b9] p-8">
        <div className="max-w-6xl mx-auto">
          {/* <!-- Title --> */}
          <h1 className="text-3xl font-bold text-[#6b4f3b] mb-6">Your Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/*  <!-- LEFT SIDE --> */}
            <div className="lg:col-span-2 bg-[#f3e2cc] rounded-2xl p-6 shadow-md">
              {/* <!-- Item --> */}
              {data.products.map((e) => (
                <div
                  key={e._id}
                  className="flex items-center justify-between bg-[#f8ebd9] p-4 rounded-xl mb-4"
                >
                  <div className="flex items-center gap-4">
                    <Image
                    alt={e.product.name}
                      src={e.product.imageCover}
                      className="rounded-lg object-cover transition duration-700 group-hover:scale-110"
                     height = {64}
                     width = {64}
                     
                    />
                    <div>
                      <h3 className="text-[#5a4030] font-semibold">
                        {e.product.title.split(" ", 2).join(" ")}
                      </h3>
                      <p className="text-[#8c6b55]">$ {e.price}</p>
                    </div>
                  </div>
                  <QuantityBtns count={e.count} productId={e.product._id}/>

                  <div className="text-[#5a4030] font-bold w-20 text-right">
                    <div className="flex gap-3 justify-center items-center">
                      <span>$99.00</span>
                      <DeleteProductBtn productId={e.product._id}/>
                    </div>
                  </div>
                </div>
              ))}

              {/*  <!-- Coupon --> */}
              <div className="flex gap-3 mt-4">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="flex-1 p-3 rounded-xl bg-[#f8ebd9] outline-none"
                />
                <button className="bg-[#d6b48b] text-white px-6 rounded-xl hover:opacity-90">
                  Apply
                </button>
              </div>
            </div>

            {/*<!-- RIGHT SIDE -->*/}
            <div className="bg-[#f3e2cc] rounded-2xl p-6 sticky top-24 h-fit shadow-md">
              <h2 className="text-xl font-semibold text-[#5a4030] mb-4">
                Summary
              </h2>

              <div className="flex justify-between text-[#6b4f3b] mb-2">
                <span>Subtotal</span>
                <span>$ {data.totalCartPrice}</span>
              </div>

              <div className="flex justify-between text-[#6b4f3b] mb-2">
                <span>Shipping</span>
                <span>$10.00</span>
              </div>

              <div className="flex justify-between text-lg font-bold text-[#5a4030] mt-4">
                <span>Total</span>
                <span>$ {data.totalCartPrice + 10}</span>
              </div>

              <ProceedCartBtn/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
