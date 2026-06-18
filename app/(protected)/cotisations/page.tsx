"use client"

import CotisationsKPICards from '@/components/cotisations/CotisationsKPICards'
import CotisationsChart from '@/components/cotisations/CotisationsChart'
import CotisationsTransactions from '@/components/cotisations/CotisationsTransactions'
import CotisationsFooter from '@/components/cotisations/CotisationsFooter'


export default function CotisationsPage() {
  return (
    <>
        <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-body-md text-on-surface-variant">
            Gérez les contributions, suivez les paiements et générez des reçus.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
            <button className="flex items-center gap-2 bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-label-md px-4 py-2 rounded-lg transition-colors border border-outline-variant">
                <span className="material-symbols-outlined text-sm">filter_list</span>
                Filtrer
            </button>
            <button className="flex items-center gap-2 bg-secondary text-on-secondary text-label-md px-5 py-2 rounded-lg hover:bg-secondary/90 transition-colors shadow-sm">
                <span className="material-symbols-outlined text-sm">add</span>
                Enregistrer un paiement
            </button>
            </div>
        </div>

        {/* KPI Cards */}
        <CotisationsKPICards />

        {/* Main Content Area: Chart and List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-card-gap">
            <CotisationsChart />
            <CotisationsTransactions />
        </div>

        {/* Footer */}
        <CotisationsFooter />
        </div>
    </>
  )
}
