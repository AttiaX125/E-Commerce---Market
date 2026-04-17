
import ReviewCard from "../review-card";
import ProductSummary from "../product-summary";
import RatingPanel from "../rating-panel";
import { getProductDetails } from "@/Services/Home/home.services";
import { getProductReviews } from "@/components/Reviews/Reviews.actions";

export default async function ReviewsPage({params}: {params: { productId: string };}) {
     const {productId} = await params;
     const product = await getProductDetails(productId);
     const { imageCover,price , title,_id } = product;
     const reviews = await getProductReviews(_id);
  return (
    <div className="min-h-screen bg-[#f6f1ea] text-[#4a3428] p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 mt-24">

        {/* LEFT - Product */}
        <div className="col-span-3 sticky top-6 h-fit">
          <ProductSummary imageCover={imageCover} price={price} title={title} />
        </div>

        {/* CENTER - Reviews */}
        <div className="col-span-6 space-y-5">
          <h1 className="text-2xl font-semibold tracking-tight">
            Customer Reviews
          </h1>
          {reviews.data.map( (data) => <ReviewCard key={data._id} data={data} />)}
          
        </div>

        {/* RIGHT - Ratings */}
        <div className="col-span-3 sticky top-6 h-fit">
          <RatingPanel productId= {_id} />
        </div>
      </div>
    </div>
  );
}