"use client"

import KPICards from '@/components/dashboard/KPICards'
import ChartsSection from '@/components/dashboard/ChartsSection'
import ProjectsTable from '@/components/dashboard/ProjectsTable'
import QuickAccess from '@/components/dashboard/QuickAccess'
import RecentActivities from '@/components/dashboard/RecentActivities'
import DashboardFooter from '@/components/dashboard/DashboardFooter'

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

export default function DashboardPage() {
  return (
    <>
      {/* Date Range Picker */}
      <div className="flex justify-end mb-6">
        <button className="flex items-center gap-2 bg-white border border-outline-variant/60 px-3 py-2 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium text-on-surface hover:bg-surface-container transition-colors shadow-sm">
          <span>01 mai 2024 - 31 mai 2024</span>
          <span className="material-icons-outlined text-base text-on-surface-variant">calendar_today</span>
        </button>
      </div>

      {/* KPI Cards */}
      <KPICards />

      {/* Charts Section */}
      <ChartsSection />

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">
        <ProjectsTable />
        <div className="flex flex-col gap-6">
          <QuickAccess />
          <RecentActivities />
        </div>
      </div>
    </>
  )
}
