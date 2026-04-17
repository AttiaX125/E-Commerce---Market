import { ProductsData, ProductsResponse } from "@/app/home.interface";
import { ProductDetailsData, ProductDetailsResponse } from "@/app/productDetails/[products]/productDetails.interface";

 export async function getAllProducts () :Promise<ProductsData[]> {
    const response = await fetch (`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`)
    const data:ProductsResponse = await response.json();
    return data.data;
  }

  export async function getProductDetails (id : string) : Promise<ProductDetailsData>{
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`);
    const data: ProductDetailsResponse = await response.json();
    return data.data;
  }