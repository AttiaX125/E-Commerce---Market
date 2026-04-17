"use client";

import AppButton from "@/components/Shared/AppButton/AppButton";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoginFormData } from "@/Interfaces/Auth/Login.interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import zod from "zod";
export default function LoginForm() {
    const router = useRouter()
  const loginSchema = zod.object({
 email: zod.string("Email is required").email("Invalid Email").regex(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/),
    password: zod.string().min(6,"Password must be at least 6 chars").regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,"please Enter A valid Password"),
})
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",

    },
    resolver: zodResolver(loginSchema)
  });

  function userLogin (userData : LoginFormData){
    signIn("credentials", {...userData , redirectTo : "/"})
    //    toast.promise(sendLoginDataAction(userData),{
      //  loading: "Sign In .......",
        //success: function (data){
            //router.push('/')
            //return data.message
        //},
        //error: function (data){
          //  return data.message
        //},
        //position: "top-right"
   // })
  }

  return (
    <>
      <form onSubmit={handleSubmit(userLogin)}>

      {/* EMAIL */}
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Email</FieldLabel>
            <Input {...field} type="email" className="mb-4 focus-visible:ring-[#A65322]" placeholder="example@email.com" />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* PASSWORD */}
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Password</FieldLabel>
            <Input {...field} type="password" className="mb-4 focus-visible:ring-[#A65322]" placeholder="Enter Your Password"/>
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* LOGIN LINK */}
      <p className="text-sm mb-4">
        Did not have any account?{" "}
        <Link href="/register" className="text-[#A65322] font-semibold">
          Register
        </Link>
      </p>

      {/* BUTTON */}
      <AppButton className="w-full bg-[#A65322] text-white">
        Sign In
      </AppButton>

      {/* SOCIAL */}
      <div className="mt-6 space-y-3 flex gap-2 items-center justify-center "> 
        <button onClick={_ => signIn("google"), {redirectTo : "/"}} type="button" className="w-full border py-2 rounded-xl grow">
           Google
        </button>
      </div>
    </form>
    </>
  );
}
