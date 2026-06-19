'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Eye } from 'lucide-react'
import MemberStats from '@/components/members/MemberStats'
import { Member } from '@prisma/client'

export default function MembresPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchMembers()
  }, [search])

  const fetchMembers = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)

      const response = await axios.get(`/api/members?${params.toString()}`)
      if (response.data.success) {
        setMembers(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching members:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) {
      try {
        await axios.delete(`/api/members/${id}`)
        fetchMembers()
      } catch (error) {
        console.error('Error deleting member:', error)
        alert('Erreur lors de la suppression du membre')
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-headline-lg font-bold text-on-surface">Membres</h1>
          <p className="text-body-md text-on-surface-variant">Gérez et consultez les adhérents</p>
        </div>
        <Link
          href="/members/new"
          className="flex items-center gap-2 bg-secondary text-on-secondary px-5 py-2.5 rounded-lg font-medium hover:bg-secondary/90 transition-colors shadow-sm whitespace-nowrap"
        >
          <CirclePlus />
          Ajouter un Membre
        </Link>
      </div>

      {/* Stats */}
      <MemberStats members={members} />

      {/* Search */}
      <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/20">
        <input
          type="text"
          placeholder="Rechercher un membre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/20">
                <th className="text-label-md text-on-surface-variant px-4 md:px-6 py-4 font-semibold uppercase tracking-wider">Membre</th>
                <th className="text-label-md text-on-surface-variant px-4 md:px-6 py-4 font-semibold uppercase tracking-wider hidden sm:table-cell">Statut</th>
                <th className="text-label-md text-on-surface-variant px-4 md:px-6 py-4 font-semibold uppercase tracking-wider hidden md:table-cell">Rôle</th>
                <th className="text-label-md text-on-surface-variant px-4 md:px-6 py-4 font-semibold uppercase tracking-wider hidden lg:table-cell">Date d'adhésion</th>
                <th className="text-label-md text-on-surface-variant px-4 md:px-6 py-4 font-semibold uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-on-surface-variant">Chargement...</td>
                </tr>
              ) : members.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-on-surface-variant">Aucun membre trouvé</td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr key={member.id} className="hover:bg-surface-container-low/50 transition-colors group">
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex items-center gap-3">
                        {member.photo ? (
                          <img src={member.photo} alt={member.firstName} className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm shrink-0">
                            {member.firstName[0]}{member.lastName[0]}
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-on-surface">{member.firstName} {member.lastName}</div>
                          <div className="text-xs text-on-surface-variant">{member.memberId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 hidden sm:table-cell">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        Actif
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-on-surface-variant hidden md:table-cell">
                      {member.profession || 'Membre'}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-on-surface-variant hidden lg:table-cell">
                      {new Date(member.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/members/${member.id}`}
                          className="text-on-surface-variant hover:text-primary p-1 rounded-full hover:bg-surface-container-high transition-colors"
                        >
                          <Eye />
                        </Link>
                        {/* <Link
                          href={`/membres/${member.id}/edit`}
                          className="text-on-surface-variant hover:text-primary p-1 rounded-full hover:bg-surface-container-high transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </Link>
                        <button
                          onClick={() => handleDelete(member.id)}
                          className="text-on-surface-variant hover:text-error p-1 rounded-full hover:bg-surface-container-high transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}