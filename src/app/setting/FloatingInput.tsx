"use client";

import React from "react";

type FloatingInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function FloatingInput({ label, ...props }: FloatingInputProps) {
  return (
    <div className="relative w-full">
      <input
        {...props}
        className="peer w-full px-4 pt-5 pb-2 rounded-xl bg-white/60 backdrop-blur-md border border-white/30 outline-none focus:ring-2 focus:ring-[#c89b6d]"
      />

      <label
        className="absolute left-4 top-2 text-sm text-gray-500 transition-all
        peer-placeholder-shown:top-3.5 
        peer-placeholder-shown:text-base 
        peer-placeholder-shown:text-gray-400 
        peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#c89b6d]"
      >
        {label}
      </label>
    </div>
  );
}