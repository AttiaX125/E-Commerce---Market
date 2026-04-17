"use client";

import { usePathname } from "next/navigation";

export default function CheckoutSteps() {
  const pathname = usePathname();

  const steps = [
    { name: "Address", path: "/cart/address" },
    { name: "Review", path: "/cart/review" },
  ];
  return (
    <div className="flex justify-between items-center mb-8">
      {steps.map((step, index) => {
        const isActive = pathname === step.path;
        const isCompleted =
          steps.findIndex((s) => s.path === pathname) > index;

        return (
          <div key={step.path} className="flex-1 flex items-center">
            
            <div
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                isActive
                  ? "bg-[#c89b6d] text-white"
                  : isCompleted
                  ? "bg-green-500 text-white"
                  : "bg-[#ecd6bb] text-[#6b4f3b]"
              }`}
            >
              {step.name}
            </div>

            {index !== steps.length - 1 && (
              <div className="flex-1 h-1 bg-[#e0c9a6] mx-2" />
            )}
          </div>
        );
      })}
    </div>
  );
}