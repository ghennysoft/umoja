'use client'

import Image from 'next/image'

const agents = [
  {
    initials: 'PT',
    name: 'Paul Tshiombo',
    id: 'AGT-001',
    zone: 'Goma (Quartier Ndosho)',
    status: 'En mission',
    statusClass: 'badge-mission',
    progress: 85,
    color: 'bg-secondary'
  },
  {
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0U_1EiA2ij_R8JOxdSn46k-Xz1u6DMqhkPbM1U9knRLv77vCP-HiSPo5UtKF7VkqZg6I0wacoxcrwvZCWFygzulrRW2iWhWNVHWU2iDz7FVQAtS_vN6Y0YBwd59koSFe6eXc4D59aR8s7vXkCLObsEVCypp4QcCj5oFMQp-xnz7kEQqhzsvfdbJ7-TW_qvUryJfeZUy8d2c95q2vzbIQHN0-7DQYsE3xFdxf5nWi0N0naMOV40p--eVVwrrCzYZz3l0VMOhzvmvI',
    name: 'Marie Ndala',
    id: 'AGT-014',
    zone: 'Bukavu (Kadutu)',
    status: 'Disponible',
    statusClass: 'badge-disponible',
    progress: 92,
    color: 'bg-secondary'
  },
  {
    initials: 'DK',
    name: 'David Kabasele',
    id: 'AGT-022',
    zone: 'Kinshasa (Limete)',
    status: 'En mission',
    statusClass: 'badge-mission',
    progress: 65,
    color: 'bg-outline'
  },
  {
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASI4NyaPo7ibENH9qQO3WvCoEe4_4amdxaF6fJ8onjXQqRax2Joe0dU5A6jK-AqXmiXRLgZtiIANUJiWCskPkprICFxX1puNCZe69UIfMfit1TEs51D_qCF5fga-xkKROxNCmfduLRwArUJlkDNB28ACTgUSJKox74E3ZHfSO_sxoMpz_V9bS5MxEA_BYjq19V4yOX5XytZFmVDKe18BvQ5wYcmyqR50EmOrihBxtdesoBhO102OLmrO81U8DJdWwE9r8UaBdp1tU',
    name: 'Samuel Ilunga',
    id: 'AGT-008',
    zone: 'Lubumbashi',
    status: 'En congé',
    statusClass: 'badge-conge',
    progress: 78,
    color: 'bg-secondary'
  }
]

export default function AgentsTable() {
  return (
    <div className="xl:col-span-8 card overflow-hidden flex flex-col">
      <div className="p-4 md:p-6 border-b border-surface-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h3 className="text-headline-md text-on-surface">Liste des Agents</h3>
        <div className="flex flex-wrap gap-2">
          <select className="text-sm bg-surface-container-low border-outline-variant rounded-md px-3 py-1 text-on-surface-variant focus:ring-primary">
            <option>Toutes les zones</option>
            <option>Goma</option>
            <option>Bukavu</option>
            <option>Kinshasa</option>
          </select>
          <select className="text-sm bg-surface-container-low border-outline-variant rounded-md px-3 py-1 text-on-surface-variant focus:ring-primary">
            <option>Tous les statuts</option>
            <option>En mission</option>
            <option>Disponible</option>
            <option>En congé</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-surface-container-low text-on-surface-variant text-label-md uppercase tracking-wider">
              <th className="py-3 px-4 md:px-6 font-medium">Agent</th>
              <th className="py-3 px-4 md:px-6 font-medium hidden md:table-cell">Zone d'intervention</th>
              <th className="py-3 px-4 md:px-6 font-medium hidden sm:table-cell">Statut</th>
              <th className="py-3 px-4 md:px-6 font-medium hidden lg:table-cell">Performance</th>
              <th className="py-3 px-4 md:px-6 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-body-md text-on-surface divide-y divide-surface-variant">
            {agents.map((agent, index) => (
              <tr key={index} className="hover:bg-surface-container-lowest transition-colors">
                <td className="py-3 md:py-4 px-4 md:px-6">
                  <div className="flex items-center gap-3">
                    {agent.avatar ? (
                      <Image
                        alt={agent.name}
                        className="w-10 h-10 rounded-full object-cover"
                        src={'/logo.png'}
                        width={40}
                        height={40}
                      />
                    ) : (
                      <div className={`w-10 h-10 rounded-full ${agent.status === 'En congé' ? 'bg-error-container text-on-error-container' : 'bg-primary-container text-on-primary-container'} flex items-center justify-center font-bold text-sm`}>
                        {agent.initials}
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-on-surface">{agent.name}</p>
                      <p className="text-xs text-on-surface-variant">ID: {agent.id}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 md:py-4 px-4 md:px-6 hidden md:table-cell">
                  <div className="flex items-center gap-1 text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    <span className="text-sm">{agent.zone}</span>
                  </div>
                </td>
                <td className="py-3 md:py-4 px-4 md:px-6 hidden sm:table-cell">
                  <span className={agent.statusClass}>
                    <span className={`w-1.5 h-1.5 rounded-full ${agent.status === 'En mission' ? 'bg-secondary' : agent.status === 'Disponible' ? 'bg-outline' : 'bg-error'}`}></span>
                    {agent.status}
                  </span>
                </td>
                <td className="py-3 md:py-4 px-4 md:px-6 hidden lg:table-cell">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-surface-variant rounded-full h-1.5 max-w-[80px]">
                      <div className={`${agent.color} h-1.5 rounded-full`} style={{ width: `${agent.progress}%` }}></div>
                    </div>
                    <span className={`text-xs font-medium ${agent.progress < 70 ? 'text-on-surface-variant' : ''}`}>{agent.progress}%</span>
                  </div>
                </td>
                <td className="py-3 md:py-4 px-4 md:px-6 text-right">
                  <button className="text-on-surface-variant hover:text-primary p-1 rounded-full hover:bg-surface-container-high transition-colors">
                    <span className="material-symbols-outlined text-sm">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-surface-variant flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-on-surface-variant">
        <span>Affichage de 1 à 4 sur 42 agents</span>
        <div className="flex gap-1">
          <button className="p-1 rounded hover:bg-surface-container-high disabled:opacity-50">
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button className="px-2 py-1 rounded bg-secondary/10 text-secondary font-medium">1</button>
          <button className="px-2 py-1 rounded hover:bg-surface-container-high">2</button>
          <button className="px-2 py-1 rounded hover:bg-surface-container-high">3</button>
          <button className="p-1 rounded hover:bg-surface-container-high">
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  )
}