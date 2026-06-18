'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User, BadgeDollarSign, TvMinimal } from 'lucide-react'

const activities = [
  {
    icon: User,
    title: 'Nouveau membre inscrit',
    description: 'Jean Kalume',
    time: 'Il y a 10 minutes'
  },
  {
    icon: BadgeDollarSign,
    title: 'Cotisation reçue',
    description: '150 $ par Marie Dupont',
    time: 'Il y a 1 heure'
  },
  {
    icon: TvMinimal,
    title: 'Nouveau projet ajouté',
    description: 'Éducation des jeunes',
    time: 'Il y a 3 heures'
  },
  {
    icon: 'engineering',
    title: 'Agent terrain ajouté',
    description: 'Paul Tshiombo',
    time: 'Il y a 5 heures'
  }
]

export default function RecentActivities() {
  return (
    <div className="card p-4 md:p-6 flex-1 flex flex-col">
      <h3 className="text-base md:text-lg font-bold text-on-surface mb-3 md:mb-4">Activités récentes</h3>
      <div className="flex-1 flex flex-col gap-3 md:gap-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-3">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5">
              <activity.icon className="material-icons text-sm md:text-base" />
            </div>
            <div>
              <p className="text-xs md:text-sm font-semibold text-on-surface">{activity.title}</p>
              <p className="text-xs md:text-sm text-on-surface-variant">{activity.description}</p>
              <p className="text-[10px] md:text-xs text-outline mt-0.5">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-3 md:mt-4 py-2 bg-secondary/10 text-secondary font-bold rounded-xl hover:bg-secondary/20 transition-colors text-xs md:text-sm">
        Voir toutes les activités
      </button>
    </div>
  )
}