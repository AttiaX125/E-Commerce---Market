"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProfileTab from "./ProfileTab";
import AddressTab from "./AddressTab";
import SecurityTab from "./SecurityTab";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f5e6d3] to-[#e8d3b9] p-6 lg:p-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-[#5a4030] mb-2">Settings</h1>
        <p className="text-[#6b4f3b]/70 mb-8">
          Manage your account & preferences
        </p>

        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          {["profile", "address", "security"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative px-5 py-2 rounded-full capitalize"
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#c89b6d] rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span className={`relative z-10 ${activeTab === tab ? "text-white" : "text-[#6b4f3b]"}`}>
                {tab}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl shadow-xl p-6">
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "address" && <AddressTab />}
          {activeTab === "security" && <SecurityTab />}
        </div>

      </div>
    </div>
  );
}