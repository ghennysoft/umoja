'use client'

import Image from 'next/image'
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react'

interface TopAppBarProps {
  onMenuClick: () => void 
}

export default function TopAppBar({ onMenuClick }: TopAppBarProps) {
  const { data } = useSession();

  const [session, setSession] = useState<any>(null);
  console.log(session)
  useEffect(() => {
    const checkSession = () => {
      setSession(data);
    };
    checkSession();
  }, [data]);

  return (
    <header className="h-16 md:h-20 bg-surface border-b border-outline-variant/40 flex items-center justify-between px-4 md:px-8 z-10 shrink-0">
      <div className="flex items-center gap-2 md:gap-4 min-w-0">
        {/* Bouton menu mobile */}
        <button 
          onClick={onMenuClick}
          className="text-on-surface-variant hover:bg-surface-container rounded-full p-2 transition-colors lg:hidden shrink-0"
          aria-label="Ouvrir le menu"
        >
          <Menu />
        </button>
        
        <div className="hidden sm:block min-w-0">
          <h2 className="text-base md:text-xl font-bold text-on-surface flex items-center gap-2 truncate">
            Bienvenue, {session?.user?.name} 👋
          </h2>
          <p className="text-xs md:text-sm text-on-surface-variant truncate">Tableau de bord</p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        {/* <div className="flex items-center gap-1 md:gap-3 text-on-surface-variant">
          <button className="hover:bg-surface-container p-1.5 md:p-2 rounded-full transition-colors">
            <Search />
          </button>
          <div className="relative">
            <button className="hover:bg-surface-container p-1.5 md:p-2 rounded-full transition-colors">
              <Bell />
            </button>
            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
          </div>
        </div> */}

        <div className="h-6 md:h-8 w-px bg-outline-variant/40 hidden sm:block"></div>

        <div className="flex items-center gap-1 md:gap-3 cursor-pointer shrink-0">
          <Image
            alt="Admin Avatar"
            className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-outline-variant"
            src="/logo.png"
            width={40}
            height={40}
          />
          <div className="hidden md:block text-right">
            <p className="text-sm font-bold text-on-surface">{session?.user?.name}</p>
            <p className="text-xs text-secondary font-medium">{session?.user?.role}</p>
          </div>
          {/* <ChevronDown /> */}
        </div>
      </div>
    </header>
  )
}