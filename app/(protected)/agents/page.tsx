// "use client"

// import AgentsTable from '@/components/agents/AgentsTable'
// import AgentsMap from '@/components/agents/AgentsMap'
// import AgentsActivities from '@/components/agents/AgentsActivities'

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import AgentsStats from '@/components/agents/AgentsStats'
// import { Agent } from '@prisma/client'
import { CirclePlus, MapPin, Eye } from 'lucide-react'

export default function DashboardPage() {  
  const [agents, setAgents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [zone, setZone] = useState('')
  const [status, setStatus] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchAgents()
  }, [search, zone, status])

  const fetchAgents = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (zone) params.append('zone', zone)
      if (status) params.append('status', status)

      const response = await axios.get(`/api/agents?${params.toString()}`)
      if (response.data.success) {
        setAgents(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching agents:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      try {
        await axios.delete(`/api/agents/${id}`)
        fetchAgents()
      } catch (error) {
        console.error('Error deleting agent:', error)
        alert('Failed to delete agent')
      }
    }
  }

  return (
    <>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-headline-lg font-bold text-on-surface">Agents</h1>
            <p className="text-body-md text-on-surface-variant">Gestion d'agents</p>
          </div>
          <Link
            href="/agents/new"
            className="flex items-center gap-2 bg-secondary text-on-secondary px-5 py-2.5 rounded-lg font-medium hover:bg-secondary/90 transition-colors shadow-sm whitespace-nowrap"
          >
            <CirclePlus />
            Add Agent
          </Link>
        </div>

        {/* Stats */}
        <AgentsStats agents={agents} />

        {/* Filters */}
        <div className="flex flex-wrap gap-3 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/20">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Recherche..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          {/* <select
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Toute Zone</option>
            <option value="Goma">Goma</option>
            <option value="Bukavu">Bukavu</option>
            <option value="Kinshasa">Kinshasa</option>
            <option value="Lubumbashi">Lubumbashi</option>
          </select> */}
          {/* <button
            onClick={() => { setSearch(''); setZone(''); setStatus('') }}
            className="px-4 py-2 text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors"
          >
            Clear
          </button> */}
        </div>

        {/* Table */}
        <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant/20">
                  <th className="text-label-md text-on-surface-variant px-4 md:px-6 py-4 font-semibold uppercase tracking-wider">Agent</th>
                  <th className="text-label-md text-on-surface-variant px-4 md:px-6 py-4 font-semibold uppercase tracking-wider hidden md:table-cell">Zone</th>
                  <th className="text-label-md text-on-surface-variant px-4 md:px-6 py-4 font-semibold uppercase tracking-wider hidden sm:table-cell">Status</th>
                  {/* <th className="text-label-md text-on-surface-variant px-4 md:px-6 py-4 font-semibold uppercase tracking-wider hidden lg:table-cell">Performance</th> */}
                  <th className="text-label-md text-on-surface-variant px-4 md:px-6 py-4 font-semibold uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-on-surface-variant">Loading...</td>
                  </tr>
                ) : agents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-on-surface-variant">No agents found</td>
                  </tr>
                ) : (
                  agents.map((agent) => (
                    <tr key={agent.id} className="hover:bg-surface-container-low/50 transition-colors group">
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          {agent.photo ? (
                            <img src={agent.photo} alt={agent.firstName} className="w-10 h-10 rounded-full object-cover" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm shrink-0">
                              {agent.firstName[0]}{agent.lastName[0]}
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-on-surface">{agent.firstName} {agent.lastName}</div>
                            <div className="text-xs text-on-surface-variant">{agent.agentId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 hidden md:table-cell">
                        <div className="flex items-center gap-1 text-on-surface-variant">
                          <MapPin />
                          <span>{agent.zone}</span>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 hidden sm:table-cell">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                          Active
                        </span>
                      </td>
                      {/* <td className="px-4 md:px-6 py-4 hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-surface-variant rounded-full h-1.5 max-w-[80px]">
                            <div className="bg-secondary h-1.5 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                          <span className="text-xs font-medium">85%</span>
                        </div>
                      </td> */}
                      <td className="px-4 md:px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/agents/${agent.id}`}
                            className="text-on-surface-variant hover:text-primary p-1 rounded-full hover:bg-surface-container-high transition-colors"
                          >
                            <Eye />
                          </Link>
                          {/* <Link
                            href={`/agents/${agent.id}/edit`}
                            className="text-on-surface-variant hover:text-primary p-1 rounded-full hover:bg-surface-container-high transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </Link> */}
                          {/* <button
                            onClick={() => handleDelete(agent.id)}
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
    </>
  )
}
