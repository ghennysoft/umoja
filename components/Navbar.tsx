"use client"

import { signOut, useSession } from "next-auth/react";
import { Bell, LayoutDashboard, User2} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [logoutModal, setLogoutModal] = useState(false);
  const handleLogout = ()=>{
    signOut(); 
    location.href="/"
  }
  return (
      <header className="w-full">
        <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <LayoutDashboard className="hidden" />
                <span className="text-xl font-bold">Administration</span>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  className="py-2 rounded-lg font-medium transition cursor-pointer"
                  onClick={()=>setLogoutModal(!logoutModal)}
                >
                  <Bell size={20} />
                </button>
                <button 
                  className="py-2 rounded-lg font-medium transition cursor-pointer"
                  onClick={()=>setLogoutModal(!logoutModal)}
                >
                  <User2 size={20} />
                </button>
                <span className="text-sm text-gray-600 hidden sm:inline">{session?.user?.name}</span>
              </div>
            </nav>
        </div>

        {
          logoutModal && (
            <div className="fixed top-0 flex justify-center items-center h-screen w-screen bg-[rgba(8,8,8,0.26)] p-5">
              <div className="flex flex-col p-5 bg-white rounded-2xl">
                <h3 className="text-2xl mb-10 text-gray-950">Voulez-vous vous déconnecter ?</h3>
                <div className="flex gap-2">
                  <button 
                    className="px-4 py-2 rounded-lg shadow-lg text-gray-950 font-medium transition cursor-pointer"
                    onClick={()=>setLogoutModal(!logoutModal)}
                  >Annuler</button>
                  <button 
                    className="px-4 py-2 rounded-lg bg-red-700 text-white font-medium transition cursor-pointer"
                    onClick={handleLogout}
                  >Confirmer</button>
                </div>
              </div>
            </div>
          )
        }
    </header>
  );
}
