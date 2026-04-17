import { getBrandData } from "../brands.actions";

export default async function Page({params}: {params: { brand: string };}) {
  const {brand} = await params;
  const brandDetails = await getBrandData(brand); 
  console.log("BRAND DETAILS:", brandDetails);

  return (
    <div>
      brand details
    </div>
  );
}