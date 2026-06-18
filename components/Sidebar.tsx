'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LayoutDashboard, UserRoundCog } from 'lucide-react'

interface SideNavbarProps {
  isOpen: boolean
  onClose: () => void
  onMenuClick: () => void
}

const navLinks = [
  { icon: LayoutDashboard, label: 'Tableau de bord', route: '/', active: true },
  // { icon: LayoutDashboard, label: 'Membres / Adhérents', route: '/' },
  // { icon: LayoutDashboard, label: 'Cotisations & Paiements', route: '/' },
  // { icon: LayoutDashboard, label: 'Projets & Activités', route: '/' },
  { icon: UserRoundCog, label: 'Agents Terrain', route: '/agents' },
  // { icon: LayoutDashboard, label: 'Événements', route: '/' },
  // { icon: LayoutDashboard, label: 'Documents', route: '/' },
  // { icon: LayoutDashboard, label: 'Rapports & Statistiques', route: '/' },
  // { icon: LayoutDashboard, label: 'Messages', badge: '12', route: '/' },
  // { icon: LayoutDashboard, label: 'Paramètres', route: '/' },
  // { icon: LayoutDashboard, label: 'Utilisateurs', route: '/' },
  // { icon: LayoutDashboard, label: 'Mon Profil', route: '/' },
]

export default function Sidebar({ isOpen, onClose, onMenuClick }: SideNavbarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile Overlay */}
      {/* {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )} */}

      {/* Overlay - visible uniquement quand le menu est ouvert sur mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full bg-primary flex flex-col justify-between text-on-primary z-40
        transition-transform duration-300 ease-in-out
        w-sidebar overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div>
          {/* Brand */}
          <div className="flex items-center gap-4 px-4 md:px-6 py-6 md:py-8">
            <div>
              <h1 className="text-lg md:text-xl font-bold tracking-tight">UMOJA YETU</h1>
              <p className="text-xs md:text-sm text-primary-container font-medium tracking-widest">ASBL</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 px-2 md:px-3 pb-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.route}
                onClick={onMenuClick}
                className={link.active ? 'sidebar-link-active' : 'sidebar-link'}
              >
                {/* <span className="material-icons-outlined text-lg md:text-base">{link.icon}</span> */}
                <link.icon />
                <span className="text-sm md:text-base">{link.label}</span>
                {link.badge && (
                  <span className="ml-auto bg-secondary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-3 mt-4 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors border border-white/10"
            >
              <span className="material-icons-outlined">logout</span>
              <span>Déconnexion</span>
            </Link>
          </nav>
        </div>

        {/* Sidebar Footer CTA */}
        <div className="p-4 md:p-6">
          <div className="bg-primary-container/10 p-4 md:p-5 rounded-2xl border border-white/10 flex flex-col items-center text-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span className="material-icons text-yellow-400 text-xl md:text-2xl">diversity_3</span>
            </div>
            <p className="text-xs md:text-sm text-white/90 font-medium">L'union fait la force, ensemble pour un avenir meilleur. 💛</p>
          </div>
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed bottom-4 right-4 z-50 lg:hidden bg-primary text-white p-3 rounded-full shadow-lg"
      >
        <span className="material-icons">
          {isMobileOpen ? 'close' : 'menu'}
        </span>
      </button>
    </>
  )
}