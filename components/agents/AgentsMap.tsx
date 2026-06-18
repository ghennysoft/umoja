export default function AgentsMap() {
  const zones = [
    { name: 'Nord-Kivu (Goma)', agents: 12, color: 'bg-secondary' },
    { name: 'Sud-Kivu (Bukavu)', agents: 8, color: 'bg-primary' },
    { name: 'Kinshasa', agents: 5, color: 'bg-outline' }
  ]

  return (
    <div className="card p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-headline-md text-on-surface">Carte des interventions</h3>
        <button className="text-secondary text-sm font-medium hover:underline">Agrandir</button>
      </div>

      {/* Map Placeholder */}
      <div className="w-full h-48 bg-surface-container-high rounded-lg mb-4 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-fixed-dim/30 to-surface-container-high opacity-50"></div>
        <span className="material-symbols-outlined text-4xl text-on-surface-variant/50 relative z-10">map</span>
        {/* Mock Map Pins */}
        <div className="absolute top-1/4 left-1/3 flex flex-col items-center animate-pulse">
          <span className="material-symbols-outlined text-secondary text-xl">location_on</span>
          <div className="w-2 h-1 bg-black/20 rounded-[50%] blur-[1px]"></div>
        </div>
        <div className="absolute bottom-1/3 right-1/4 flex flex-col items-center animate-pulse delay-75">
          <span className="material-symbols-outlined text-secondary text-xl">location_on</span>
          <div className="w-2 h-1 bg-black/20 rounded-[50%] blur-[1px]"></div>
        </div>
      </div>

      {/* Zones List */}
      <div className="space-y-3">
        {zones.map((zone, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${zone.color}`}></div>
              <span className="text-on-surface">{zone.name}</span>
            </div>
            <span className="font-bold text-on-surface">{zone.agents} agents</span>
          </div>
        ))}
      </div>
    </div>
  )
}