
import { getAllBrands } from "./brands.actions";
import BrandsClient from "./BrandsClient";

export default async function page() {


  const brandsList = await getAllBrands();

  return (
      <BrandsClient
     data={brandsList.data}
     
    />

  );
}