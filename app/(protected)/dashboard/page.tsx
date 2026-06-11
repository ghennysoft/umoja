"use client"

// import DashboardLayout from "../../../componnents/DashboardLayout";
// import { DollarSign, CreditCard, ArrowUpRight, ArrowDownRight, SlidersVertical, UserCog2 } from "lucide-react";
// import { Package, Settings, QrCode } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSession } from "next-auth/react";
// import axios from "@/lib/axios";

const stats = [
  { title: "Cotisation du jour", value: "0 CDF", change: "0%", up: false, 
    // icon: DollarSign
   },
  { title: "Enregistrements", value: "0", change: "0%", up: false, 
    // icon: CreditCard
   },
  { title: "Agents", value: "0", change: "0%", up: false, 
    // icon: UserCog2
   },
  // { title: "Taux de conversion", value: "94.2%", change: "-0.8%", up: false, icon: TrendingUp },
];

const icones = [
  { name: "fas fa-store" },
  { name: "fas fa-utensils" },
  { name: "fas fa-bus" },
  // { name: "fas fa-briefcase" },
  { name: "fas fa-calendar" },
  { name: "fas fa-graduation-cap" },
  { name: "fas fa-hands-helping" },
  { name: "fas fa-concierge-bell" },
]

const colors = [
  { fg: "#4F46E5", bg: "#E0E7FF" },
  { fg: "#DC2626", bg: "#FEE2E2" },
  { fg: "#2563EB", bg: "#DBEAFE" },
  // { fg: "#9333EA", bg: "#F3E8FF" },
  { fg: "#16A34A", bg: "#DCFCE7" },
  { fg: "#CA8A04", bg: "#FEF9E3" },
  { fg: "#DB2777", bg: "#FCE7F3" },
  { fg: "#0D9488", bg: "#CCFBF1" },
]

const Dashboard = () => {
  const { data: session } = useSession();
  
  // const [categories, setCategories] = useState<[]>([]);
  // useEffect(()=>{
  //   const getCategories = async ()=>{
  //     const res = await axios.get('/shops/category/');
  //     setCategories(res.data);
  //   }
  //   getCategories();
  // }, [])

  return (
    <>
      <h1 className="text-3xl font-bold py-5 px-7">Tableau de bord</h1>
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-4 px-8">
        {stats.map((stat) => (
          <div key={stat.title} className="border border-slate-300 cursor-pointer bg-slate-100 hover:bg-slate-200 rounded-md">
            <div className="container p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  {/* <stat.icon className="w-5 h-5 text-primary" /> */}
                </div>
              </div>
              <div className="text-2xl font-display font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.title}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4 px-8">
        <div className="border border-slate-300 cursor-pointer bg-slate-100 hover:bg-slate-200 rounded-md">
          <div className="container p-5">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold">Enregistrements recents</h4>
                <Link href={'/'} className="text-xs hover:underline">voir plus</Link>
              </div>
              <div className="flex flex-col mb-3">
                <div className="flex flex-col mb-3">
                  <h6 className="font-medium">Israel Menga</h6>
                  <small className="text-xs opacity-50">Le 01/06/2026</small>
                </div>
                <div className="flex flex-col mb-3">
                  <h6 className="font-medium">Israel Menga</h6>
                  <small className="text-xs opacity-50">Le 01/06/2026</small>
                </div>
                <div className="flex flex-col mb-3">
                  <h6 className="font-medium">Israel Menga</h6>
                  <small className="text-xs opacity-50">Le 01/06/2026</small>
                </div>
                <div className="flex flex-col mb-3">
                  <h6 className="font-medium">Israel Menga</h6>
                  <small className="text-xs opacity-50">Le 01/06/2026</small>
                </div>
                <div className="flex flex-col mb-3">
                  <h6 className="font-medium">Israel Menga</h6>
                  <small className="text-xs opacity-50">Le 01/06/2026</small>
                </div>
                <div className="flex flex-col mb-3">
                  <h6 className="font-medium">Israel Menga</h6>
                  <small className="text-xs opacity-50">Le 01/06/2026</small>
                </div>
              </div>
          </div>
        </div>

        <div className="border border-slate-300 cursor-pointer bg-slate-100 hover:bg-slate-200 rounded-md">
          <div className="container p-5">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold">Paiements recents</h4>
                <Link href={'/'} className="text-xs hover:underline">voir plus</Link>
              </div>
              <div className="flex flex-col mb-3">
                <div className="flex flex-col mb-3">
                  <h6 className="font-medium">Israel Menga</h6>
                  <small className="text-xs opacity-50">Le 01/06/2026</small>
                </div>
                <div className="flex flex-col mb-3">
                  <h6 className="font-medium">Israel Menga</h6>
                  <small className="text-xs opacity-50">Le 01/06/2026</small>
                </div>
                <div className="flex flex-col mb-3">
                  <h6 className="font-medium">Israel Menga</h6>
                  <small className="text-xs opacity-50">Le 01/06/2026</small>
                </div>
                <div className="flex flex-col mb-3">
                  <h6 className="font-medium">Israel Menga</h6>
                  <small className="text-xs opacity-50">Le 01/06/2026</small>
                </div>
                <div className="flex flex-col mb-3">
                  <h6 className="font-medium">Israel Menga</h6>
                  <small className="text-xs opacity-50">Le 01/06/2026</small>
                </div>
                <div className="flex flex-col mb-3">
                  <h6 className="font-medium">Israel Menga</h6>
                  <small className="text-xs opacity-50">Le 01/06/2026</small>
                </div>
              </div>
          </div>
        </div>
        
        <div id="subOptionsContainer" className="hidden mt-4 border-t pt-4">
          <h4 id="subOptionsTitle" className="font-medium mb-3 text-indigo-600">eehj</h4>
          <div id="subOptionsContent" className="grid grid-cols-3 gap-3"></div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
