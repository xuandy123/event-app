"use client";

import { signOut } from "next-auth/react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <button
        onClick={() => signOut()}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Sign Out
      </button>
    </div>
  );
}
