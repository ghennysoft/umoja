"use client"

import Link from "next/link";

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

const Dashboard = () => {
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
