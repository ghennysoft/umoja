export default function MembresStats() {
  const stats = [
    {
      icon: 'groups',
      iconColor: 'text-secondary bg-secondary-container',
      label: 'Total',
      value: '1,248',
      description: 'Membres inscrits au total',
      accentColor: 'from-secondary-container'
    },
    {
      icon: 'person_check',
      iconColor: 'text-primary bg-primary-fixed',
      label: 'Ce mois',
      value: '42',
      change: '+12%',
      description: 'Nouveaux membres actifs',
      accentColor: 'from-primary-fixed'
    },
    {
      icon: 'trending_up',
      iconColor: 'text-on-surface-variant bg-surface-container-highest',
      label: 'Annuel',
      value: '+18.5%',
      description: 'Croissance de la communauté',
      accentColor: 'from-surface-variant'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-card-gap mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="flex justify-between items-start mb-4">
            <div className={`w-12 h-12 rounded-full ${stat.iconColor} flex items-center justify-center`}>
              <span className={`material-symbols-outlined text-2xl ${stat.icon === 'groups' ? '' : ''}`}>
                {stat.icon}
              </span>
            </div>
            <span className="bg-surface-container py-1 px-2 rounded text-xs font-semibold text-on-surface-variant flex items-center gap-1">
              {stat.label}
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-3 mb-1">
              <div className="text-stat-number text-on-surface">{stat.value}</div>
              {stat.change && (
                <div className="flex items-center text-secondary text-sm font-medium">
                  <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                  {stat.change}
                </div>
              )}
            </div>
            <div className="text-body-md text-on-surface-variant">{stat.description}</div>
          </div>
          <div className={`stat-card-accent bg-gradient-to-r ${stat.accentColor} to-transparent`}></div>
        </div>
      ))}
    </div>
  )
}