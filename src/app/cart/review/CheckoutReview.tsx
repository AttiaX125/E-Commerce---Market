"use client";
import { useEffect } from "react";
import CheckoutSteps from "@/components/CheckoutSteps/CheckoutSteps";
import { useCheckoutStore } from "../check-out-store";
import { setCookie } from "cookies-next";
import { useState } from "react";
import { handleCardOrders, handleCashOrder } from "../cheakOut.actions";
import { ShippingAdressType } from "../address/CheckoutStepOne/adress.interface";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

export default function CheckoutReview({ cartId }: { cartId: string }) {
  const   triggerSuccess = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
    });
  }
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const address = useCheckoutStore((s) => s.address);
const paymentMethod = useCheckoutStore((s) => s.paymentMethod);
const card = useCheckoutStore((s) => s.card);
  console.log(address);
  useEffect(() => {
  setCookie("checkout_step", "review");
}, []);
  const router = useRouter();
const [showSuccess, setShowSuccess] = useState(false);
  async function handlePlaceOrder() {
    if (status === "loading") return;

    setStatus("loading");

    if (paymentMethod === "cash") {
      const shippingAdress: ShippingAdressType = {
        shippingAddress: address,
      };

      toast.promise(handleCashOrder(shippingAdress, cartId), {
        loading: "Processing order...",
        success: function (data) {
          triggerSuccess();

          setShowSuccess(true);

          useCheckoutStore.getState().reset();

          // auto redirect after delay
          setTimeout(() => {
            router.push("/");
          }, 3000);
          return data.message;
        },
        error: function (data) {
          return data.message;
        },
      });
    }
    if (paymentMethod === "card") {
      const shippingAdress: ShippingAdressType = {
        shippingAddress: address,
      };

      toast.promise(handleCardOrders(shippingAdress, cartId), {
        loading: "Processing order...",
        success: function (data) {
          console.log("card online",data)
          window.open(data.session.url, '_self')
          return data.status;
        },
        error: function (data) {
          return data.status;
        },
      });
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f5e6d3] to-[#e8d3b9] p-6 lg:p-10">
      <div className="max-w-3xl mx-auto">
        <CheckoutSteps />
        {/* HEADER */}
        <h1 className="text-3xl font-bold text-[#6b4f3b] mb-2">Checkout</h1>

        <p className="text-[#6b4f3b]/70 mb-6">Step 2 of 2 — Review Order</p>

        {/* CARD */}
        <div className="bg-[#f3e2cc] p-6 rounded-2xl shadow-md space-y-6">
          {/* ADDRESS */}
          <div className="border-b border-[#e0c9a6] pb-4">
            <h2 className="text-lg font-semibold text-[#5a4030] mb-2">
              Shipping Address
            </h2>

            <p className="text-[#6b4f3b]">{address.details}</p>
            <p className="text-[#6b4f3b]">{address.city}</p>
            <p className="text-[#6b4f3b]">{address.phone}</p>
            <p className="text-[#6b4f3b]">{address.postalCode}</p>
          </div>

          {/* PAYMENT METHOD */}
          <div className="border-b border-[#e0c9a6] pb-4">
            <h2 className="text-lg font-semibold text-[#5a4030] mb-2">
              Payment Method
            </h2>

            <p className="text-[#6b4f3b] capitalize">{paymentMethod}</p>

            {paymentMethod === "card" && (
              <div className="mt-2 text-[#6b4f3b]">
                <p>Card: **** **** **** {card.cardNumber?.slice(-4)}</p>
              </div>
            )}
          </div>

          {/* ORDER SUMMARY (STATIC EXAMPLE) */}
          <div>
            <h2 className="text-lg font-semibold text-[#5a4030] mb-3">
              Order Summary
            </h2>

            <div className="space-y-2 text-[#6b4f3b]">
              <div className="flex justify-between">
                <span>Headphones</span>
                <span>$99</span>
              </div>

              <div className="flex justify-between">
                <span>Smart Watch</span>
                <span>$199</span>
              </div>

              <div className="border-t border-[#e0c9a6] pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>$308</span>
              </div>
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handlePlaceOrder}
            className="w-full mt-4 bg-[#c89b6d] text-white py-3 rounded-xl hover:opacity-90 transition"
          >
            Place Order
          </button>
        </div>
      </div>
      {showSuccess && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white rounded-2xl p-10 text-center shadow-2xl animate-[pop_0.4s_ease-out]">

      {/* animated check */}
      <div className="text-green-500 text-6xl mb-4 animate-bounce">
        ✔
      </div>

      <h2 className="text-2xl font-bold text-gray-800">
        Order Confirmed 🎉
      </h2>

      <p className="text-gray-500 mt-2">
        We’re preparing your order
      </p>

      {/* loading bar */}
      <div className="mt-6 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-green-500 animate-[loading_3s_linear]" />
      </div>

      <button
        onClick={() => router.push("/orders/track")}
        className="mt-6 bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600"
      >
        Track Order
      </button>

    </div>
  </div>
)}
    </div>
  );
}
