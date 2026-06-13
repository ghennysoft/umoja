"use client";

import Navbar from "./Navbar";
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { DollarSign, UserCog2, LayoutDashboard, UsersRound } from "lucide-react";
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const DashboardLayout = ({ children, dash }: { children: React.ReactNode, dash: boolean }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isAdmin = session?.user?.role === 'Admin';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
    {/* Barre de navigation desktop */}
    <div className="hidden md:block w-1/4 bg-blue-900 text-white p-5">
      <div className="flex justify-center">
        <img src="/logo.png" width={100} className="mb-8" alt="logo umoja yetu" />
      </div>
      <hr />
      <Link href={'/dashboard'} className="flex items-center gap-2 mb-2 hover:bg-blue-950 p-3 mt-7">
        <LayoutDashboard size={15} />
        <span>Tableau de bord</span>
      </Link>
      <Link href={'/agents'} className="flex items-center gap-2 mb-2 hover:bg-blue-950 p-3">
        <UserCog2 size={15} />
        <span>Agents</span>
      </Link>
      <Link href={'/members'} className="flex items-center gap-2 mb-2 hover:bg-blue-950 p-3">
        <UsersRound size={15} />
        <span>Membres</span>
      </Link>
      <Link href={'/dashboard'} className="flex items-center gap-2 mb-2 hover:bg-blue-950 p-3">
        <DollarSign size={15} />
        <span>Cotisations</span>
      </Link>
      <Link href={'/users'} className="flex items-center gap-2 mb-2 hover:bg-blue-950 p-3">
        <UsersRound size={15} />
        <span>Utilisateurs</span>
      </Link>
    </div>


      
        {/* Informations utilisateur et déconnexion */}
        {/* <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 hidden sm:inline">{session?.user?.name}</span>
          <button 
            onClick={() => { signOut(); location.href="/" }}
            className="text-sm"
          >
            Déconnexion
          </button>
        </div> */}

    {/* Menu mobile déroulant */}
    {mobileMenuOpen && (
      <div className="md:hidden w-1/2 bg-blue-900 text-white p-5">
        <div className="flex justify-center">
          <img src="/logo.png" width={100} className="mb-8" alt="logo umoja yetu" />
        </div>
        <hr />
        <Link href={'/dashboard'} className="flex items-center gap-2 mb-2 hover:bg-blue-950 p-2 mt-7">
          {/* <LayoutDashboard size={15} /> */}
          <span>Tableau de bord</span>
        </Link>
        <Link href={'/agents'} className="flex items-center gap-2 mb-2 hover:bg-blue-950 p-2">
          {/* <UserCog2 size={15} /> */}
          <span>Agents</span>
        </Link>
        <Link href={'/members'} className="flex items-center gap-2 mb-2 hover:bg-blue-950 p-2">
          {/* <UsersRound size={15} /> */}
          <span>Membres</span>
        </Link>
        <Link href={'/dashboard'} className="flex items-center gap-2 mb-2 hover:bg-blue-950 p-2">
          {/* <DollarSign size={15} /> */}
          <span>Cotisations</span>
        </Link>
        <Link href={'/users'} className="flex items-center gap-2 mb-2 hover:bg-blue-950 p-2">
          {/* <UsersRound size={15} /> */}
          <span>Utilisateurs</span>
        </Link>
      </div>
    )}


      <div className="flex-1">
        <div className="flex items-center gap-2">
          {/* Bouton menu mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none"
          >
            <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <Navbar />
        </div>
        {/* Main content */}
        <main className="container flex-1 overflow-auto">
          <div className="py-6 md:py-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
