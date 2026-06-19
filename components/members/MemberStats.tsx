import { Member } from '@prisma/client'

interface MemberStatsProps {
  members: Member[]
}

export default function MemberStats({ members }: MemberStatsProps) {
  const total = members.length
  const active = members.filter(m => m.hasDiploma).length
  const withDiploma = members.filter(m => m.hasDiploma).length
  const diplomaRate = total > 0 ? Math.round((withDiploma / total) * 100) : 0

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-container/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">groups</span>
          </div>
          <div>
            <h3 className="text-stat-number text-on-surface">{total}</h3>
            <p className="text-label-md text-on-surface-variant">Total Membres</p>
          </div>
        </div>
      </div>
      <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">verified</span>
          </div>
          <div>
            <h3 className="text-stat-number text-on-surface">{active}</h3>
            <p className="text-label-md text-on-surface-variant">Membres Actifs</p>
          </div>
        </div>
      </div>
      <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">school</span>
          </div>
          <div>
            <h3 className="text-stat-number text-on-surface">{diplomaRate}%</h3>
            <p className="text-label-md text-on-surface-variant">Avec Diplôme</p>
          </div>
        </div>
      </div>
    </div>
  )
}