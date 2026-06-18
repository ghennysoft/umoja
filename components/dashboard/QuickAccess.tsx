const quickActions = [
  { icon: 'person_add', label: 'Ajouter membre', color: 'text-secondary' },
  { icon: 'payments', label: 'Enregistrer paiement', color: 'text-blue' },
  { icon: 'work', label: 'Ajouter projet', color: 'text-orange' },
  { icon: 'bar_chart', label: 'Rapport', color: 'text-purple' },
  { icon: 'mail', label: 'Envoyer message', color: 'text-secondary' },
  { icon: 'settings', label: 'Paramètres', color: 'text-on-surface-variant' },
]

export default function QuickAccess() {
  return (
    <div className="card p-4 md:p-6">
      <h3 className="text-base md:text-lg font-bold text-on-surface mb-3 md:mb-4">Accès rapides</h3>
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {quickActions.map((action, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-center p-2 md:p-3 rounded-xl border border-outline-variant/40 hover:bg-surface-container transition-colors gap-1 md:gap-2"
          >
            <action.icon className={`material-icons text-xl md:text-2xl ${action.color}`} />
            <span className="text-[10px] md:text-xs font-medium text-center leading-tight">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}