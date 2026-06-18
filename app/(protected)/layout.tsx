"use client"

import { useState } from 'react';
import { SessionProvider } from "next-auth/react";
import Sidebar from "../../components/Sidebar";
import NavBar from "../../components/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  return (
    <SessionProvider>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onMenuClick={() => setIsSidebarOpen(true)} />
      <div className="flex-1 lg:ml-sidebar flex flex-col h-screen overflow-hidden">
        <NavBar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-surface pb-32 md:pb-24">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
