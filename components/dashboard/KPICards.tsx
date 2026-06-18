export default function KPICards() {
  const cards = [
    {
      icon: 'groups',
      color: 'text-secondary bg-secondary/10',
      value: '256',
      label: 'Membres actifs',
      change: '+12% ce mois',
      positive: true
    },
    {
      icon: 'attach_money',
      color: 'text-blue bg-blue/10',
      value: '8 450 $',
      label: 'Cotisations reçues',
      change: '+18% ce mois',
      positive: true
    },
    {
      icon: 'work',
      color: 'text-orange bg-orange/10',
      value: '12',
      label: 'Projets en cours',
      change: '2 nouveaux',
      positive: true
    },
    {
      icon: 'engineering',
      color: 'text-purple bg-purple/10',
      value: '18',
      label: 'Agents terrain',
      change: 'Actifs sur le terrain',
      positive: false
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
      {cards.map((card, index) => (
        <div key={index} className="kpi-card">
          <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${card.color} flex items-center justify-center shrink-0`}>
            <card.icon />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-on-surface">{card.value}</h3>
            <p className="text-xs md:text-sm text-on-surface-variant font-medium">{card.label}</p>
            <p className={`text-xs font-semibold mt-1 flex items-center gap-1 ${card.positive ? 'text-secondary' : 'text-on-surface-variant'}`}>
              {card.positive && <span className="material-icons text-[14px]">arrow_upward</span>}
              {card.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}