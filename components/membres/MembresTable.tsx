'use client'

import Image from 'next/image'

const members = [
  {
    initials: 'AM',
    name: 'Amina Mwangi',
    email: 'amina.m@example.com',
    status: 'Actif',
    statusClass: 'badge-actif',
    role: 'Trésorière',
    date: '12 Mars 2023'
  },
  {
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA39_BkrNtvx5XlfNBI6ZEW9_YrVmpK3ckzdSbwl0TnkYw7LwBvbb-VsfwVgrhdoNvwBGyKtrO0gYcif8nktmlmRBZQEus_poisV2XDSDHw9izDrgzlD5ObrkjCwYVqOZnNxEvgO5mZmij9LvvNIEd10-mRLDODXwu3TtVmFFEE4ryirXA-tmw_vUnQqfBX4LUSTXlNfEmAyIkDiM6hw2X-z2zwu6HFoFovETbpqilPwgg6fJY1qAl7SDds3HonfN9DgO0zgOpKjr8',
    name: 'Jean-Paul Ilunga',
    email: 'jp.ilunga@example.com',
    status: 'Actif',
    statusClass: 'badge-actif',
    role: 'Coordinateur Projet',
    date: '05 Juin 2022'
  },
  {
    initials: 'SK',
    name: 'Sophie Kabasele',
    email: 's.kaba@example.com',
    status: 'Inactif',
    statusClass: 'badge-inactif',
    role: 'Membre Simple',
    date: '22 Nov 2023'
  },
  {
    initials: 'DL',
    name: 'David Lumumba',
    email: 'david.l@example.com',
    status: 'Actif',
    statusClass: 'badge-actif',
    role: 'Membre Simple',
    date: '10 Fév 2024'
  }
]

export default function MembresTable() {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-outline-variant/20 flex flex-col overflow-hidden">
      {/* Table Header / Controls */}
      <div className="p-4 md:p-6 border-b border-outline-variant/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface-bright">
        <h3 className="text-headline-md text-on-surface">Répertoire des Membres</h3>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
            <input
              className="w-full pl-9 pr-4 py-2 bg-background border border-outline-variant/50 rounded-lg text-sm focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-colors text-on-surface"
              placeholder="Rechercher un nom, email..."
              type="text"
            />
          </div>
          <button className="bg-surface-container-low hover:bg-surface-container border border-outline-variant/30 text-on-surface-variant p-2 rounded-lg transition-colors flex items-center justify-center" title="Filtrer">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
          <button className="bg-surface-container-low hover:bg-surface-container border border-outline-variant/30 text-on-surface-variant p-2 rounded-lg transition-colors flex items-center justify-center" title="Exporter">
            <span className="material-symbols-outlined">download</span>
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-background/50 border-b border-outline-variant/20">
              <th className="text-label-md text-on-surface-variant px-4 md:px-6 py-4 font-semibold uppercase tracking-wider">Membre</th>
              <th className="text-label-md text-on-surface-variant px-4 md:px-6 py-4 font-semibold uppercase tracking-wider hidden sm:table-cell">Statut</th>
              <th className="text-label-md text-on-surface-variant px-4 md:px-6 py-4 font-semibold uppercase tracking-wider hidden md:table-cell">Rôle</th>
              <th className="text-label-md text-on-surface-variant px-4 md:px-6 py-4 font-semibold uppercase tracking-wider hidden lg:table-cell">Date d'adhésion</th>
              <th className="text-label-md text-on-surface-variant px-4 md:px-6 py-4 font-semibold uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10 text-body-md">
            {members.map((member, index) => (
              <tr key={index} className="hover:bg-surface-container-low/50 transition-colors group">
                <td className="px-4 md:px-6 py-4">
                  <div className="flex items-center gap-3">
                    {member.avatar ? (
                      <Image
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                        src={"/logo.png"}
                        width={40}
                        height={40}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm shrink-0">
                        {member.initials}
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-on-surface">{member.name}</div>
                      <div className="text-xs text-on-surface-variant">{member.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-4 hidden sm:table-cell">
                  <span className={member.statusClass}>
                    <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'Actif' ? 'bg-secondary' : 'bg-outline'}`}></span>
                    {member.status}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 text-on-surface-variant hidden md:table-cell">{member.role}</td>
                <td className="px-4 md:px-6 py-4 text-on-surface-variant hidden lg:table-cell">{member.date}</td>
                <td className="px-4 md:px-6 py-4 text-right">
                  <button className="text-on-surface-variant hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity p-1">
                    <span className="material-symbols-outlined text-xl">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Pagination */}
      <div className="p-4 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-on-surface-variant bg-surface-bright">
        <div>
          Affichage de 1 à 4 sur 1,248 membres
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 rounded hover:bg-surface-container transition-colors disabled:opacity-50" disabled>
            <span className="material-symbols-outlined text-lg">chevron_left</span>
          </button>
          <button className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center font-medium">1</button>
          <button className="w-8 h-8 rounded hover:bg-surface-container transition-colors font-medium">2</button>
          <button className="w-8 h-8 rounded hover:bg-surface-container transition-colors font-medium">3</button>
          <span className="px-1">...</span>
          <button className="p-1 rounded hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-lg">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  )
}