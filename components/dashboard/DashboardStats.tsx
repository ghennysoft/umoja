'use client'

import { 
  Users, 
  CreditCard, 
  Wrench, 
  UserCog,
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign
} from 'lucide-react'
import { useSession } from 'next-auth/react'

interface StatsProps {
  stats: {
    totalMembers: number
    totalContributions: number
    totalContributionsCount: number
    totalAgents: number
    totalUsers: number
    monthlyContributions: number
  }
}

export default function DashboardStats({ stats }: StatsProps) {
  const { data: session } = useSession();
  
  let cards;
  if(session?.user?.role==="ADMIN"){
    cards = [
      {
        icon: Users,
        label: 'Membres',
        value: stats.totalMembers,
        color: 'text-secondary bg-secondary/10',
        change: '+12% ce mois',
        positive: true,
      },
      {
        icon: DollarSign,
        label: 'Cotisations',
        value: `${stats.totalContributions} Fc`,
        color: 'text-blue-600 bg-blue-100',
        change: `+${stats.monthlyContributions} Fc ce mois`,
        positive: true,
      },
      {
        icon: Wrench,
        label: 'Agents',
        value: stats.totalAgents,
        color: 'text-orange-600 bg-orange-100',
        change: 'Actifs sur le terrain',
        positive: false,
      },
      {
        icon: UserCog,
        label: 'Utilisateurs',
        value: stats.totalUsers,
        color: 'text-purple-600 bg-purple-100',
        change: `${stats.totalUsers} comptes actifs`,
        positive: false,
      },
    ]
  }
  if(session?.user?.role==="AGENT"){
    cards = [
      {
        icon: Users,
        label: 'Membres',
        value: stats.totalMembers,
        color: 'text-secondary bg-secondary/10',
        change: '+12% ce mois',
        positive: true,
      },
      {
        icon: DollarSign,
        label: 'Cotisations',
        value: `${stats.totalContributions} Fc`,
        color: 'text-blue-600 bg-blue-100',
        change: `+${stats.monthlyContributions} Fc ce mois`,
        positive: true,
      },
    ]
  }
  if(session?.user?.role==="MEMBER"){
    cards = [
      {
        icon: DollarSign,
        label: 'Cotisations',
        value: `${stats.totalContributions} Fc`,
        color: 'text-blue-600 bg-blue-100',
        change: `+${stats.monthlyContributions} Fc ce mois`,
        positive: true,
      },
    ]
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
      {cards?.map((card, index) => {
        const Icon = card.icon
        return (
          <div key={index} className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/20">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-label-md text-on-surface-variant">{card.label}</p>
                <h3 className="text-stat-number text-on-surface font-bold mt-1">{card.value}</h3>
                <p className={`text-xs font-medium mt-1 flex items-center gap-1 ${
                  card.positive ? 'text-secondary' : 'text-on-surface-variant'
                }`}>
                  {card.positive && <TrendingUp className="w-3 h-3" />}
                  {card.change}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-full ${card.color} flex items-center justify-center`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}