// import { Agent } from '@prisma/client'
import { UserRoundCog, Waypoints, MapPinned } from 'lucide-react'

interface AgentStatsProps {
  agents: any[]
}

export default function AgentStats({ agents }: AgentStatsProps) {
  const total = agents.length
  const active = agents.filter(a => a.zone).length
  const zones = new Set(agents.map(a => a.zone)).size

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-container/10 text-primary flex items-center justify-center">
            <UserRoundCog />
          </div>
          <div>
            <h3 className="text-stat-number text-on-surface">{total}</h3>
            <p className="text-label-md text-on-surface-variant">Total Agents</p>
          </div>
        </div>
      </div>
      <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
            <Waypoints />
          </div>
          <div>
            <h3 className="text-stat-number text-on-surface">{active}</h3>
            <p className="text-label-md text-on-surface-variant">Agents Actifs</p>
          </div>
        </div>
      </div>
      <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center">
            <MapPinned />
          </div>
          <div>
            <h3 className="text-stat-number text-on-surface">{zones}</h3>
            <p className="text-label-md text-on-surface-variant">Zones Couvertes</p>
          </div>
        </div>
      </div>
    </div>
  )
}