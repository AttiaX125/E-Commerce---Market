"use client";

import { useState } from "react";
import { FloatingInput } from "./FloatingInput";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { UpdateUserType } from "./setting.interfance";
import { toast } from "sonner";
import { UpdateLoggedData } from "./setting.actions";

export default function ProfileTab() {
  const [preview, setPreview] = useState<string | null>(null);
  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  }
  const {handleSubmit, register} = useForm({
    defaultValues:{
      name : "",
      email: "",
      phone : ""
    }
  })
  function handleUpdatedUserData (data : UpdateUserType){
    toast.promise(UpdateLoggedData(data),{
      loading : "Update User Data!",
      success: (data) => data.message,
      error: (data) => data.message
    })
  }
  return (
    <div className="space-y-8">

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
          {preview && <Image alt="Avatar" src={preview} className="w-full h-full object-cover" />}
        </div>

        <label className="cursor-pointer text-[#c89b6d]">
          Upload Photo
          <input type="file" hidden onChange={handleImage} />
        </label>
      </div>

      {/* Inputs */}
      <form  onSubmit={handleSubmit(handleUpdatedUserData)}>
        <div className="grid md:grid-cols-2 gap-4">
        <FloatingInput {...register("name")} label="Full Name" />
        <FloatingInput {...register("email")} label="Email" />
        <FloatingInput {...register("phone")} label="Phone" />
      </div>

      <button type="submit" className="btn-primary text-white bg-[#c89b6d] px-4 py-2 rounded-xl cursor-pointer mt-4">Save Changes</button>

      </form>
      {/* Account Info */}
      <div className="border-t pt-6">
        <p>User ID: <strong>#123456</strong></p>
        <p>Role: <strong>User</strong></p>
      </div>

    </div>
  );
}