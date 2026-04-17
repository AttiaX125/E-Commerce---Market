import { AllCatrgoriesType } from "@/app/categories/categories.interface";
import Image from "next/image";


export default function HomeCategories({categoriesData} : {categoriesData : AllCatrgoriesType[]}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categoriesData.map((category : AllCatrgoriesType) => (
          <div
            key={category._id}
            className="group relative h-32 rounded-2xl overflow-hidden cursor-pointer"
          >
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover group-hover:scale-110 transition duration-500"
            />

            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition" />

            <div className="absolute bottom-2 left-2 text-white font-medium text-sm">
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}