'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical,
  Edit,
  Trash2,
  Shield,
  UserCog,
  User,
  Mail,
  Calendar,
  Eye
} from 'lucide-react'

interface User {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'AGENT' | 'MEMBER'
  createdAt: string
  updatedAt: string
  _count: {
    members: number
    contributions: number
    agents: number
  }
}

const roleColors = {
  ADMIN: 'bg-purple-100 text-purple-700',
  AGENT: 'bg-blue-100 text-blue-700',
  MEMBER: 'bg-green-100 text-green-700',
}

const roleLabels = {
  ADMIN: 'Administrateur',
  AGENT: 'Agent',
  MEMBER: 'Membre',
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [search, roleFilter])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (roleFilter) params.append('role', roleFilter)

      const response = await axios.get(`/api/auth/users?${params.toString()}`)
      if (response.data.success) {
        setUsers(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur "${name}" ?`)) {
      try {
        await axios.delete(`/api/users/${id}`)
        fetchUsers()
      } catch (error) {
        console.error('Error deleting user:', error)
        alert('Erreur lors de la suppression')
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-headline-lg font-bold text-on-surface flex items-center gap-2">
            <Users className="w-6 h-6" />
            Utilisateurs
          </h1>
          <p className="text-body-md text-on-surface-variant">
            Gérez les utilisateurs et leurs permissions
          </p>
        </div>
        <Link
          href="/users/new"
          className="flex items-center gap-2 bg-secondary text-on-secondary px-5 py-2.5 rounded-lg font-medium hover:bg-secondary/90 transition-colors shadow-sm whitespace-nowrap"
        >
          <UserPlus className="w-4 h-4" />
          Ajouter un utilisateur
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/20 flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">Tous les rôles</option>
          <option value="ADMIN">Administrateur</option>
          <option value="AGENT">Agent</option>
          <option value="MEMBER">Membre</option>
        </select>
        <button
          onClick={() => { setSearch(''); setRoleFilter('') }}
          className="px-4 py-2 text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors"
        >
          Effacer
        </button>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/20">
                <th className="text-label-md text-on-surface-variant px-4 md:px-6 py-4 font-semibold uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="text-label-md text-on-surface-variant px-4 md:px-6 py-4 font-semibold uppercase tracking-wider hidden sm:table-cell">
                  Email
                </th>
                <th className="text-label-md text-on-surface-variant px-4 md:px-6 py-4 font-semibold uppercase tracking-wider hidden md:table-cell">
                  Rôle
                </th>
                <th className="text-label-md text-on-surface-variant px-4 md:px-6 py-4 font-semibold uppercase tracking-wider hidden lg:table-cell">
                  Activité
                </th>
                <th className="text-label-md text-on-surface-variant px-4 md:px-6 py-4 font-semibold uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-on-surface-variant">
                    Chargement...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-on-surface-variant">
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-surface-container-low/50 transition-colors group">
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm shrink-0">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-on-surface">{user.name}</div>
                          <div className="text-xs text-on-surface-variant">
                            Créé le {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 hidden sm:table-cell">
                      <div className="flex items-center gap-1 text-on-surface-variant">
                        <Mail className="w-3 h-3" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 hidden md:table-cell">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
                        {user.role === 'ADMIN' && <Shield className="w-3 h-3" />}
                        {user.role === 'AGENT' && <UserCog className="w-3 h-3" />}
                        {user.role === 'MEMBER' && <User className="w-3 h-3" />}
                        {roleLabels[user.role]}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4 hidden lg:table-cell">
                      <div className="flex items-center gap-3 text-xs text-on-surface-variant">
                        <span>👤 {user._count.members}</span>
                        <span>💰 {user._count.contributions}</span>
                        <span>🔧 {user._count.agents}</span>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/users/${user.id}`}
                          className="text-on-surface-variant hover:text-primary p-1 rounded-full hover:bg-surface-container-high transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        {/* <Link
                          href={`/users/${user.id}/edit`}
                          className="text-on-surface-variant hover:text-primary p-1 rounded-full hover:bg-surface-container-high transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(user.id, user.name)}
                          className="text-on-surface-variant hover:text-error p-1 rounded-full hover:bg-surface-container-high transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
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