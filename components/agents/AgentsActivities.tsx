const activities = [
  {
    icon: 'assignment_turned_in',
    color: 'bg-secondary/10 text-secondary',
    title: 'Rapport soumis',
    time: 'Il y a 2h',
    description: 'Paul Tshiombo a soumis le rapport hebdomadaire pour Goma.'
  },
  {
    icon: 'flight_takeoff',
    color: 'bg-primary/10 text-primary',
    title: 'Début de mission',
    time: 'Hier, 08:00',
    description: 'Marie Ndala a commencé sa mission à Kadutu.'
  },
  {
    icon: 'warning',
    color: 'bg-error/10 text-error',
    title: 'Incident signalé',
    time: 'Lun, 14:30',
    description: 'Problème logistique rapporté par l\'équipe de Kinshasa.'
  }
]

export default function AgentsActivities() {
  return (
    <div className="card p-4 md:p-6 flex-1">
      <h3 className="text-headline-md text-on-surface mb-4">Activité sur le terrain</h3>

      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-surface-variant before:to-transparent">
        {activities.map((activity, index) => (
          <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 border-surface ${activity.color} shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10`}>
              <span className="material-symbols-outlined text-sm">{activity.icon}</span>
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-lg border border-surface-variant bg-surface-container-lowest shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <div className="text-label-md text-on-surface">{activity.title}</div>
                <time className="text-[10px] text-on-surface-variant">{activity.time}</time>
              </div>
              <div className="text-xs text-on-surface-variant">{activity.description}</div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm font-medium text-secondary hover:bg-secondary/5 rounded-lg transition-colors">
        Voir tout l'historique
      </button>
    </div>
  )
}