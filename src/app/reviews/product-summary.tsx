import Image from "next/image";

export default function ProductSummary({imageCover , price , title} : {imageCover : string , price : number , title : string}) {
  return (
    <div className="rounded-2xl bg-white/40 backdrop-blur-xl border border-[#c9ab8640] p-4 shadow-lg">
      <div className="relative w-full h-40 rounded-xl overflow-hidden">
        <Image
          src={imageCover}
          alt="product"
          fill
          className="object-cover"
        />
      </div>

      <h2 className="mt-3 font-semibold">{title}</h2>
      <p className="text-sm text-[#6b4f3a]">$ {price}</p>

      <div className="flex items-center gap-1 mt-2 text-sm">
        ⭐⭐⭐⭐⭐ <span className="ml-2 text-xs opacity-70">(1,245)</span>
      </div>

      <button className="mt-4 w-full rounded-xl bg-[#c9ab86] text-white py-2 hover:opacity-90 transition">
        Write a Review
      </button>
    </div>
  );
}