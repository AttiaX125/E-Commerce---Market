"use client";

import AppButton from "@/components/Shared/AppButton/AppButton";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { userDataType } from "@/Interfaces/Auth/Register.interface";
import { sendRegisterDataActions } from "@/Services/Auth/Register/Register.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import zod from "zod";
export default function RegisterForm() {
  const router = useRouter()
  const registerSchema = zod.object({
    name: zod.string("Name is Required").min(4, "Username must be at least 4 chars").regex(/^[A-Z][a-zA-Z '.-]*[A-Za-z][^-]$/,"Enter A valid Name"),
    email: zod.string("Email is required").email("Invalid Email").regex(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/),
    password: zod.string().min(6,"Password must be at least 6 chars").regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,"please Enter A valid Password"),
    rePassword : zod.string().min(6,"Password must be at least 6 chars"),
    phone : zod.string().regex(/^01[0125][0-9]{8}$/,"You Must Put an Egyption Number")
}).refine((data) => data.password === data.rePassword,{
    path: ["rePassword"],
    error: "Password did not Match with Re-Password"
 }
)
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema)
  });
  function sendRegisterData (userData: userDataType){
        toast.promise(sendRegisterDataActions(userData),{
            loading: "Register ........",
            success: function (data){
              router.push('/login')
                return data.message
            },
            error : function (data){
                return data.message
            },
            position: "top-right"
        },
        
            
    )
  }

  return (
    <>
       <form onSubmit={handleSubmit(sendRegisterData)}>

      {/* NAME */}
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Name</FieldLabel>
            <Input {...field} className="mb-4 focus-visible:ring-[#A65322]" placeholder="Your name" />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

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

      {/* CONFIRM */}
      <Controller
        name="rePassword"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Confirm Password</FieldLabel>
            <Input {...field} type="password" className="mb-4 focus-visible:ring-[#A65322]" />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* PHONE */}
      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Phone</FieldLabel>
            <Input {...field} className="mb-4 focus-visible:ring-[#A65322]" />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* LOGIN LINK */}
      <p className="text-sm mb-4">
        Already have an account?{" "}
        <Link href="/login" className="text-[#A65322] font-semibold">
          Login
        </Link>
      </p>

      {/* BUTTON */}
      <AppButton className="w-full bg-[#A65322] text-white">
        Register
      </AppButton>

    </form>
    </>
  );
}
