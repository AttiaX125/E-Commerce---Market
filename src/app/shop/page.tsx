import ProductCard from "@/components/ProductCard/ProductCard";
import { getAllProducts } from "@/Services/Home/home.services";

export default async function page() {
    const productList = await getAllProducts();
  
  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-[#f5e6d3] via-[#f0dcc2] to-[#e8d3b9]">

      {/* 🌿 FLOATING LIGHT BLOBS */}
      <div className="absolute w-100 h-100 bg-[#c89b6d]/30 blur-[120px] rounded-full -top-25 -left-25 animate-pulse" />
      <div className="absolute w-75 h-75 bg-[#a65322]/20 blur-[120px] rounded-full -bottom-20 -right-20 animate-pulse" />


      {/* PRODUCTS */}
      <div className="relative z-10 container px-6 py-12">
        <h2 className="text-3xl font-bold text-[#5a4030] mb-8">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {productList.map((e,i) => (
            <ProductCard key={e._id} product={e} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
