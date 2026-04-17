import AllCategoriesCard from "@/components/Categories/AllCategoriesCard";
import { getAllCategories } from "./categories.actions";
import { AllCatrgoriesType } from "./categories.interface";


export default async function CategoriesPage() {
const categoriesData : AllCatrgoriesType[] = await getAllCategories()


  return (
    <div className="min-h-screen bg-linear-to-br from-[#f5e6d3] to-[#e8d3b9] px-6 py-10">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#5a4030] mb-2">
          All Categories
        </h1>
        <p className="text-[#6b4f3b]/70">
          Explore everything in one place
        </p>
      </div>

      {/* GRID */}
      <AllCategoriesCard categoriesData={categoriesData} />

    </div>
  );
}