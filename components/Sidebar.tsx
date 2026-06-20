'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  FolderTree, 
  Wrench, 
  Calendar, 
  FileText, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  UserCog, 
  User,
  LogOut,
  Shield,
  User as UserIcon
} from 'lucide-react'

interface SideNavbarProps {
  isOpen: boolean
  onClose: () => void
  // userRole?: 'ADMIN' | 'AGENT' | 'USER'
}

export default function SideNavbar({ isOpen, onClose }: SideNavbarProps) {
  const { data: session } = useSession();
  console.log(session)
  const pathname = usePathname()
  const isAdmin = session?.user?.role === 'ADMIN';

  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const checkUserRole = () => {
      if(session){
        setUserRole(session?.user?.role);
      } else {
        location.hre='/login';
      }
    };
    checkUserRole();
  }, [session]);

  const isActive = (path: string) => pathname?.startsWith(path)

  const navLinks = isAdmin ? [
    { icon: LayoutDashboard, label: 'Tableau de bord', href: '/dashboard', roles: ['ADMIN', 'AGENT', 'USER'] },
    { icon: Users, label: 'Membres', href: '/members', roles: ['ADMIN', 'AGENT'] },
    { icon: CreditCard, label: 'Cotisations', href: '/cotisations', roles: ['ADMIN', 'AGENT'] },
    { icon: Wrench, label: 'Agents', href: '/agents', roles: ['ADMIN'] },
    { icon: UserCog, label: 'Utilisateurs', href: '/users', roles: ['ADMIN'] },
    // { icon: FolderTree, label: 'Projets', href: '/projets', roles: ['ADMIN'] },
    // { icon: Calendar, label: 'Événements', href: '/evenements', roles: ['ADMIN'] },
    // { icon: FileText, label: 'Documents', href: '/documents', roles: ['ADMIN'] },
    // { icon: BarChart3, label: 'Rapports', href: '/rapports', roles: ['ADMIN'] },
    // { icon: MessageSquare, label: 'Messages', href: '/messages', roles: ['ADMIN', 'AGENT', 'USER'] },
    // { icon: Settings, label: 'Paramètres', href: '/parametres', roles: ['ADMIN', 'AGENT', 'USER'] },
    // { icon: User, label: 'Mon Profil', href: '/profile', roles: ['ADMIN', 'AGENT', 'USER'] },
  ] : [
    { icon: LayoutDashboard, label: 'Tableau de bord', href: '/dashboard', roles: ['ADMIN', 'AGENT', 'USER'] },
    { icon: Users, label: 'Membres', href: '/members', roles: ['ADMIN', 'AGENT'] },
    { icon: CreditCard, label: 'Cotisations', href: '/cotisations', roles: ['ADMIN', 'AGENT'] },
  ]  

  // Filtrer les liens selon le rôle
  const filteredLinks = navLinks.filter(link => link.roles.includes(userRole))

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed left-0 top-0 h-full bg-primary flex flex-col justify-between text-on-primary z-50
        transition-transform duration-300 ease-in-out
        w-72 max-w-[280px] overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:relative lg:z-auto
      `}>
        <div>
          <div className="flex items-center gap-4 px-4 md:px-6 py-6 md:py-8">
            <div className="bg-white/10 p-2 rounded-xl flex items-center justify-center w-full">
              <img src="/logo.png" alt="logo" width={100} />
            </div>
          </div>

          <nav className="flex flex-col gap-1 px-2 md:px-3 pb-8">
            {filteredLinks.map((link) => {
              const Icon = link.icon
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={active
                    ? 'flex items-center gap-3 px-4 py-3 bg-secondary text-white rounded-xl font-semibold shadow-md'
                    : 'flex items- acenter gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors'
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm md:text-base">{link.label}</span>
                </Link>
              )
            })}
            <button
              onClick={() => { signOut(); location.href="/login" }}
              className="flex items-center gap-3 px-4 py-3 mt-4 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors border border-white/10"
            >
              <LogOut className="w-5 h-5" />
              <span>Déconnexion</span>
            </button>
          </nav>
        </div>

        <div className="p-4 md:p-6">
          <div className="bg-primary-container/10 p-4 md:p-5 rounded-2xl border border-white/10 flex flex-col items-center text-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Shield className="text-yellow-400 w-5 h-5 md:w-6 md:h-6" />
            </div>
            <p className="text-xs md:text-sm text-white/90 font-medium">
              {userRole === 'ADMIN' ? 'Accès administrateur' :
               userRole === 'AGENT' ? 'Accès agent terrain' :
               'Membre Umoja Yetu'}
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}