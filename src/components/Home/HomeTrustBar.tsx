import { Truck, ShieldCheck, RotateCcw, Headset } from "lucide-react";

const items = [
  { icon: Truck, title: "Free Shipping", desc: "On all orders" },
  { icon: ShieldCheck, title: "Secure Payment", desc: "100% protected" },
  { icon: RotateCcw, title: "Easy Returns", desc: "7-day guarantee" },
  { icon: Headset, title: "24/7 Support", desc: "Always here" },
];

export default function HomeTrustBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-5 flex flex-col items-center text-center hover:scale-[1.03] transition"
        >
          <item.icon className="w-6 h-6 mb-2 text-[#a65322]" />
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-sm opacity-70">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}