"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Status = "Processing" | "Shipped" | "Delivered";

type OrderItem = {
  name: string;
  image: string;
  qty: number;
  price: number;
};

type Order = {
  id: string;
  date: string;
  status: Status;
  total: number;
  items: OrderItem[];
};

const mockOrders: Order[] = [
  {
    id: "ORD-10021",
    date: "April 10, 2026",
    status: "Delivered",
    total: 149.99,
    items: [
      { name: "Leather Watch", image: "/demo/watch.png", qty: 1, price: 99.99 },
      { name: "Candle Set", image: "/demo/candle.png", qty: 2, price: 25 },
    ],
  },
  {
    id: "ORD-10022",
    date: "April 14, 2026",
    status: "Shipped",
    total: 89.5,
    items: [
      { name: "Wireless Earbuds", image: "/demo/earbuds.png", qty: 1, price: 89.5 },
    ],
  },
];

function StatusBadge({ status }: { status: Status }) {
  const map = {
    Processing: "bg-yellow-200/40 text-yellow-900 border-yellow-300/40",
    Shipped: "bg-blue-200/40 text-blue-900 border-blue-300/40",
    Delivered: "bg-green-200/40 text-green-900 border-green-300/40",
  };

  return (
    <span className={`px-3 py-1 text-xs rounded-full border backdrop-blur-md ${map[status]}`}>
      {status}
    </span>
  );
}

/* ========================= */
/* ORDER TIMELINE COMPONENT  */
/* ========================= */

function OrderTimeline({ status }: { status: Status }) {
  const steps: Status[] = ["Processing", "Shipped", "Delivered"];

  return (
    <div className="flex items-center gap-3 mt-4">
      {steps.map((step, i) => {
        const active = steps.indexOf(status) >= i;

        return (
          <div key={step} className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full transition-all ${
                active ? "bg-[#3b2a20]" : "bg-white/40"
              }`}
            />
            <p className="text-xs opacity-70">{step}</p>

            {i !== steps.length - 1 && (
              <div className="w-10 h-[1px] bg-white/40 mx-2" />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ========================= */
/* SKELETON LOADING UI       */
/* ========================= */

function SkeletonCard() {
  return (
    <div className="p-6 rounded-2xl bg-white/20 backdrop-blur-xl animate-pulse space-y-4">
      <div className="h-4 w-40 bg-white/40 rounded" />
      <div className="h-3 w-24 bg-white/30 rounded" />
      <div className="h-20 bg-white/30 rounded-xl" />
      <div className="h-10 w-full bg-white/30 rounded-xl" />
    </div>
  );
}

/* ========================= */
/* MAIN PAGE                 */
/* ========================= */

export default function OrdersPage() {
  const [loading] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7efe6] text-[#3b2a20] px-6 py-10">
      <div className="max-w-5xl mx-auto mt-24">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-semibold">My Orders</h1>
          <p className="opacity-60 text-sm mt-2">
            Track your purchases in real time
          </p>
        </div>

        {/* LIST */}
        <div className="space-y-6">
          {loading
            ? Array.from({ length: 2 }).map((_, i) => <SkeletonCard key={i} />)
            : mockOrders.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-white/30 bg-white/30 backdrop-blur-2xl shadow-lg p-6"
                >

                  {/* HEADER */}
                  <div className="flex justify-between flex-wrap gap-3">
                    <div>
                      <p className="text-xs opacity-60">Order ID</p>
                      <p className="font-medium">{order.id}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <StatusBadge status={order.status} />
                      <p className="text-xs opacity-60">{order.date}</p>
                    </div>
                  </div>

                  {/* TIMELINE */}
                  <OrderTimeline status={order.status} />

                  {/* ITEMS */}
                  <div className="mt-6 space-y-3">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 p-3 rounded-xl bg-white/30 border border-white/30 backdrop-blur-md"
                      >
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs opacity-60">
                            Qty: {item.qty}
                          </p>
                        </div>

                        <p className="font-semibold">
                          ${(item.price * item.qty).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* FOOTER */}
                  <div className="flex justify-between items-center mt-6">
                    <p className="text-sm opacity-70">
                      Total:{" "}
                      <span className="font-semibold">${order.total}</span>
                    </p>

                    <div className="flex gap-3">
                      <button className="px-4 py-2 text-sm rounded-xl bg-white/40 border border-white/30 hover:bg-white/60 transition">
                        Details
                      </button>

                      {order.status === "Delivered" ? (
                        <button className="px-4 py-2 text-sm rounded-xl bg-[#3b2a20] text-white">
                          Reorder
                        </button>
                      ) : (
                        <button className="px-4 py-2 text-sm rounded-xl bg-white/40 border border-white/30">
                          Track
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </div>
  );
}