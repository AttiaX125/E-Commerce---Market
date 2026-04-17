"use client";

import { useState } from "react";
import { FloatingInput } from "./FloatingInput";

type Address = {
  id?: string;
  name: string;
  details: string;
  phone: string;
  city: string;
};
const newAddress: Address = {
  name: "Home",
  details: "Home details",
  phone: "01010700700",
  city: "Giza"
};
export default function AddressTab() {
  const [city, setCity] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);

  async function detectCity() {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`
      );
      const data = await res.json();
      setCity(data.address.city || "");
    });
  }

  function addAddress() {
    setAddresses(prev => [...prev, newAddress]);
  }

  return (
    <div className="space-y-6">

      <div className="grid md:grid-cols-2 gap-4">
        <FloatingInput label="Address Name" />
        <FloatingInput label="City" value={city} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setCity(e.target.value)} />
        <FloatingInput label="Phone" />

        <textarea className="input md:col-span-2 h-24 border-2 border-[#c89b6d] rounded-xl p-2" placeholder="Details" />
      </div>
      <div className= "flex items-center justify-center gap-3"> 
              <button onClick={detectCity} className="text-sm text-[#c89b6d]">
        Detect my location
      </button>

      <button onClick={addAddress} className="text-white bg-[#c89b6d] px-4 py-2 rounded-xl">
        Save Address
      </button>
      </div>
      {/* Address List */}
      <div className="space-y-3">
        {addresses.map((addr, i) => (
          <div key={i} className="p-4 rounded-xl bg-white/50 flex justify-between">
            <div>
              <p className="font-semibold">{addr.name}</p>
              <p className="text-sm">{addr.city}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}