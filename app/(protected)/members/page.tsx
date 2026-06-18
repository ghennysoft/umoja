"use client"

import MembresStats from '@/components/membres/MembresStats'
import MembresTable from '@/components/membres/MembresTable'


export default function MembresPage() {
  return (
    <>
      {/* Page Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-on-surface-variant text-sm font-medium mb-1">
            <span className="material-symbols-outlined text-[16px]">calendar_month</span>
            01 Janvier 2024 - Aujourd'hui
          </div>
        </div>
        <button className="bg-secondary hover:bg-secondary/90 text-on-primary text-label-md px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-sm whitespace-nowrap">
          <span className="material-symbols-outlined text-sm">person_add</span>
          Nouveau Membre
        </button>
      </div>

      {/* Stats Cards */}
      <MembresStats />

      {/* Table Section */}
      <MembresTable />
      
      <div className="h-12"></div>
    </>
  )
}
