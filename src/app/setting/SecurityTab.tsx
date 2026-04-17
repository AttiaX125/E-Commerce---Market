"use client";

import { useState } from "react";

export default function SecurityTab() {
  const [password, setPassword] = useState("");

  function getStrength(pass: string) {
    let score = 0;
    if (pass.length > 6) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  }

  const strength = getStrength(password);

  return (
    <div className="space-y-4 max-w-md">

      <input type="password" placeholder="Current Password" className="input" />

      <input
        type="password"
        placeholder="New Password"
        className="input"
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Strength */}
      <div>
        <div className="flex gap-1 mt-2">
          {[1,2,3,4].map((lvl) => (
            <div key={lvl}
              className={`h-2 flex-1 rounded ${
                strength >= lvl ? "bg-green-500" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        <p className="text-sm mt-1 text-gray-500">
          {["Weak","Fair","Good","Strong"][strength-1] || ""}
        </p>
      </div>

      <input type="password" placeholder="Confirm Password" className="input" />

      <button className="btn-primary">Update Password</button>

    </div>
  );
}