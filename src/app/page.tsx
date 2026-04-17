import ProductCard from "@/components/ProductCard/ProductCard";
import { getAllProducts } from "@/Services/Home/home.services";
import Slider from "@/components/Slider/Slider";
import image1 from "../assets/Slider.png";
import HomeTrustBar from "@/components/Home/HomeTrustBar";
import HomeCategories from "@/components/Home/HomeCategories";
import HomePromos from "@/components/Home/HomePromos";
import { AllCatrgoriesType } from "./categories/categories.interface";
import { getAllCategories } from "./categories/categories.actions";

export default async function Home() {
  const imageList = [image1.src, image1.src, image1.src];
  const productList = await getAllProducts();
  const categoriesData : AllCatrgoriesType[] = await getAllCategories()
  

  return (
    <div className="min-h-screen bg-[#f7efe6] text-[#3b2a20]">

      {/* HERO */}
      <section className="relative">
        <Slider imagesList={imageList} heightClass="h-[85vh]" />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/10 to-transparent pointer-events-none" />
      </section>

      {/* TRUST BAR */}
      <section className="container mx-auto px-6 -mt-10 relative z-10">
        <HomeTrustBar />
      </section>

      {/* CATEGORIES */}
      <section className="container mx-auto px-6 mt-16">
        <HomeCategories categoriesData={categoriesData}/>
      </section>

      {/* PROMOS */}
      <section className="container mx-auto px-6 mt-20">
        <HomePromos />
      </section>

      {/* PRODUCTS */}
      <section className="container mx-auto px-6 mt-24 pb-20">
        <h2 className="text-3xl font-semibold mb-10">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {productList.map((e, i) => (
            <ProductCard key={e._id} product={e} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}