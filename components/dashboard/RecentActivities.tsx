'use client'

import { Activity, User, DollarSign, Clock } from 'lucide-react'

interface RecentActivitiesProps {
  members: any[]
  contributions: any[]
  userRole?: 'ADMIN' | 'AGENT' | 'USER'
}

export default function RecentActivities({ members, contributions, userRole }: RecentActivitiesProps) {
  const activities = [
    ...members.map((m: any) => ({
      id: m.id,
      type: 'member',
      icon: User,
      iconColor: 'bg-secondary/10 text-secondary',
      title: 'Nouveau membre inscrit',
      description: `${m.firstName} ${m.lastName}`,
      time: new Date(m.createdAt).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    })),
    ...contributions.map((c: any) => ({
      id: c.id,
      type: 'contribution',
      icon: DollarSign,
      iconColor: 'bg-blue-100 text-blue-600',
      title: 'Cotisation reçue',
      description: `${c.amount.toFixed(2)} $ par ${c.member.firstName} ${c.member.lastName}`,
      time: new Date(c.createdAt).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    })),
  ]
    .sort((a, b) => (a.time > b.time ? -1 : 1))
    .slice(0, 5)

  return (
    <div className="bg-surface-container-lowest rounded-xl p-4 md:p-6 shadow-sm border border-outline-variant/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-secondary" />
          <h3 className="text-headline-md text-on-surface">Activités récentes</h3>
        </div>
        {userRole === 'ADMIN' && (
          <button className="text-sm text-secondary hover:underline">
            Voir tout
          </button>
        )}
      </div>

      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-center text-on-surface-variant py-4">Aucune activité récente</p>
        ) : (
          activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="flex gap-3">
                <div className={`w-8 h-8 rounded-full ${activity.iconColor} flex items-center justify-center shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-on-surface">{activity.title}</p>
                  <p className="text-sm text-on-surface-variant">{activity.description}</p>
                  <div className="flex items-center gap-1 text-xs text-on-surface-variant mt-0.5">
                    <Clock className="w-3 h-3" />
                    {activity.time}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}