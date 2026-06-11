"use client"

import { SessionProvider } from "next-auth/react";
import DashboardLayout from "../../components/DashboardLayout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <DashboardLayout dash={true}>
        {children}
    </DashboardLayout>
    </SessionProvider>
  );
}
