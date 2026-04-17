"use client";

import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { UserShippingAddress } from "./adress.interface";
import { useRouter } from "next/navigation";
import { useCheckoutStore } from "../../check-out-store";
import CheckoutSteps from "@/components/CheckoutSteps/CheckoutSteps";
import { setCookie } from "cookies-next";

export default function CheckoutStepOne() {
    const paymentMethod = useCheckoutStore((state) => state.paymentMethod);
    const setPaymentMethod = useCheckoutStore((state) => state.setPaymentMethod);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      postalCode: "",
    },
  });
  setCookie("checkout_step", "address");
const setAddress = useCheckoutStore((state) => state.setAddress);
const router = useRouter();
  function onSubmit(data : UserShippingAddress) {
     setAddress(data);
      // save payment method already in store
    setPaymentMethod(paymentMethod);

   
  router.push("/cart/review");


  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f5e6d3] to-[#e8d3b9] p-6 lg:p-10">
      <div className="max-w-3xl mx-auto">
         <CheckoutSteps/>
        {/* Header */}
        <h1 className="text-3xl font-bold text-[#6b4f3b] mb-2">
          Checkout
        </h1>

        <p className="text-[#6b4f3b]/70 mb-6">
          Step 1 of 2 — Shipping Address
        </p>

        {/* Card */}
        <div className="bg-[#f3e2cc] p-6 rounded-2xl shadow-md space-y-5">

          {/* Address */}
                  <Controller
          name="details"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Adress: </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Please Enter Your Adress"
                //autoComplete="off"
               className="w-full p-4.5 rounded-xl bg-[#f8ebd9] outline-none focus-visible:ring-[#A65322]"
               type="text"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

          {/* Phone */}
              <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Phone: </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Please Enter Your Phone"
                //autoComplete="off"
               className="w-full p-4.5 rounded-xl bg-[#f8ebd9] outline-none focus-visible:ring-[#A65322]"
               type="tel"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

          {/* City */}
               <Controller
          name="city"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>City: </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Please Enter Your City"
                //autoComplete="off"
               className="w-full p-4.5 rounded-xl bg-[#f8ebd9] outline-none focus-visible:ring-[#A65322]"
               type="text"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

          {/* Postal Code */}
               <Controller
          name="postalCode"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Postal Code: </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Please Enter Your Postal Code"
                //autoComplete="off"
               className="w-full p-4.5 rounded-xl bg-[#f8ebd9] outline-none focus-visible:ring-[#A65322]"
               type="number"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
         {/* TOGGLE */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`flex-1 py-2 rounded-xl ${
                        paymentMethod === "card"
                          ? "bg-[#c89b6d] text-white"
                          : "bg-[#ecd6bb] text-[#6b4f3b]"
                      }`}
                    >
                      💳 Card
                    </button>
        
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cash")}
                      className={`flex-1 py-2 rounded-xl ${
                        paymentMethod === "cash"
                          ? "bg-[#c89b6d] text-white"
                          : "bg-[#ecd6bb] text-[#6b4f3b]"
                      }`}
                    >
                      💵 Cash
                    </button>
                  </div>

          {/* Button */}
          <button
            onClick={handleSubmit(onSubmit)}
            className="w-full mt-4 bg-[#c89b6d] text-white py-3 rounded-xl hover:opacity-90 transition cursor-pointer"
          >
            Continue to Payment
          </button>

        </div>
      </div>
    </div>
  );
}