import Navbar from "./Navbar";
// import { DollarSign, LayoutDashboard, UserCog2, UsersRound } from "lucide-react";
import Link from "next/link";

const DashboardLayout = ({ children, dash }: { children: React.ReactNode, dash: boolean }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="bg-blue-900 text-white p-5">
        <div className="flex justify-center">
          <img src="/logo.jpg" width={100} className="mb-8" alt="logo umoja yetu" />
        </div>
        <hr />
        <Link href={'/'} className="flex items-center gap-2 mb-2 hover:bg-blue-950 p-2 mt-7">
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
        <Link href={'/'} className="flex items-center gap-2 mb-2 hover:bg-blue-950 p-2">
          {/* <DollarSign size={15} /> */}
          <span>Cotisations</span>
        </Link>
        <Link href={'/'} className="flex items-center gap-2 mb-2 hover:bg-blue-950 p-2">
          {/* <UsersRound size={15} /> */}
          <span>Utilisateurs</span>
        </Link>
      </div>
      <div className="flex-1">
        <Navbar />
        {/* Main content */}
        <main className="container flex-1 overflow-auto">
          <div className="py-6 md:py-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
