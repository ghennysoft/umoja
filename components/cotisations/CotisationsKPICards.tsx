export default function CotisationsKPICards() {
  const kpis = [
    {
      icon: 'account_balance_wallet',
      color: 'bg-blue-100 text-blue-600',
      label: 'Total des cotisations',
      value: '12 450 $',
      change: '+15% ce mois',
      changeIcon: 'trending_up',
      positive: true
    },
    {
      icon: 'pending_actions',
      color: 'bg-orange-100 text-orange-600',
      label: 'Paiements en attente',
      value: '1 200 $',
      change: '4 membres en retard',
      positive: false
    },
    {
      icon: 'check_circle',
      color: 'bg-green-100 text-secondary',
      label: 'Membres à jour',
      value: '85%',
      change: '218 / 256 membres',
      changeIcon: 'arrow_upward',
      positive: true
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-card-gap">
      {kpis.map((kpi, index) => (
        <div key={index} className="kpi-card">
          <div className={`w-14 h-14 rounded-full ${kpi.color} flex items-center justify-center shrink-0`}>
            <span className="material-symbols-outlined text-3xl">{kpi.icon}</span>
          </div>
          <div>
            <p className="text-label-md text-on-surface-variant mb-1">{kpi.label}</p>
            <h3 className="text-stat-number text-on-surface">{kpi.value}</h3>
            <p className={`text-label-md mt-1 flex items-center gap-1 ${kpi.positive ? 'text-secondary-fixed-dim' : 'text-on-surface-variant'}`}>
              {kpi.changeIcon && (
                <span className="material-symbols-outlined text-sm">{kpi.changeIcon}</span>
              )}
              {kpi.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}