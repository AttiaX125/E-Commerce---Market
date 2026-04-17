"use client";

import AppButton from "../Shared/AppButton/AppButton";
import { useRouter } from "next/navigation";

export default function ProceedCartBtn() {
  const router = useRouter();

  function proceedCart() {
    router.push("/cart/address");
  }

  return (
    <AppButton
      onClick={proceedCart}
      className="w-full mt-6 bg-[#c89b6d] text-white py-3 rounded-xl hover:opacity-90 transition"
    >
      Proceed to Checkout
    </AppButton>
  );
}