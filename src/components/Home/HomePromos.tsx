import { Button } from "@/components/ui/button";

export default function HomePromos() {
  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* DEAL */}
      <div className="rounded-3xl p-8 bg-gradient-to-r from-orange-100 to-orange-200 relative overflow-hidden">
        <h3 className="text-xl font-bold">🔥 Deal of the Day</h3>
        <p className="mt-2 font-semibold">Fresh Organic Fruits</p>
        <p className="text-sm mt-1 opacity-80">
          Get up to 40% off on selected organic fruits
        </p>

        <div className="mt-4 font-bold text-2xl">40% OFF</div>
        <p className="text-sm">Use code: ORGANIC40</p>

        <Button className="mt-4">Shop Now</Button>
      </div>

      {/* NEW ARRIVALS */}
      <div className="rounded-3xl p-8 bg-gradient-to-r from-green-100 to-emerald-200 relative overflow-hidden">
        <h3 className="text-xl font-bold">✨ New Arrivals</h3>
        <p className="mt-2 font-semibold">Exotic Vegetables</p>
        <p className="text-sm mt-1 opacity-80">
          Discover our latest premium collection
        </p>

        <div className="mt-4 font-bold text-2xl">25% OFF</div>
        <p className="text-sm">Use code: FRESH25</p>

        <Button className="mt-4">Explore Now</Button>
      </div>

    </div>
  );
}