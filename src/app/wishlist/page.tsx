import Link from "next/link";
import { getAllWishListData } from "./wishList.actions";
import WishListCard from "./WishListCard";
import { ProductWishListType } from "./wishlist.interface";
export default async function page() {

    const wishlistItems = await getAllWishListData();

    return (
      <div>
        <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-[#f5e6d3] via-[#f0dcc2] to-[#e8d3b9] p-6 mt-24">
  
        {/* 🔥 LIGHT BLOBS */}
        <div className="absolute w-100 h-100 bg-[#c89b6d]/30 blur-[120px] rounded-full -top-25 -left-25" />
        <div className="absolute w-75 h-75 bg-[#a65322]/20 blur-[120px] rounded-full -bottom-20 -right-20" />
  
        <div className="relative z-10 max-w-6xl mx-auto">
  
          {/* HEADER */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-[#5a4030] mb-2">
              Your Wishlist
            </h1>
            <p className="text-[#6b4f3b]/70">
              You have {wishlistItems.length} saved items
            </p>
  
            <Link
              href="/shop"
              className="inline-block mt-4 px-6 py-2 rounded-xl bg-white/40 backdrop-blur-md hover:bg-white/60 transition"
            >
              Continue Shopping
            </Link>
          </div>
  
          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  
            {wishlistItems.map((item : ProductWishListType) => ( <WishListCard key={item.id} item={item}/>))}
          </div>
  
          {/* EMPTY STATE */}
          {wishlistItems.length === 0 && (
            <div className="text-center mt-20 text-[#6b4f3b]">
              <p className="text-xl mb-4">Your wishlist is empty 💔</p>
              <Link
                href="/shop"
                className="px-6 py-3 bg-[#c89b6d] text-white rounded-xl"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
      </div>
    )
}
