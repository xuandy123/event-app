// app/shorts-generator/layout.tsx
import React from "react";
import type { ReactNode } from "react";
import ResponsiveDrawer from "./components/SideBar";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <ResponsiveDrawer>{children}</ResponsiveDrawer>
    </div>
  );
}
