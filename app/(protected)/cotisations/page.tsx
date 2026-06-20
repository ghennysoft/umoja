'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import axios from 'axios'
import { HandCoins, Divide, CirclePlus, CircleMinus } from 'lucide-react'
import ContributionForm from '@/components/contributions/ContributionForm'

interface Contribution {
  id: string
  memberId: string
  userId: string
  amount: number
  date: string
  type: string
  description: string | null
  status: string
  createdAt: string
  member: {
    id: string
    memberId: string
    firstName: string
    lastName: string
    postName: string | null
  }
  user: {
    id: string
    name: string
    email: string
  }
}

interface GroupedData {
  date?: string
  week?: string
  month?: string
  year?: number
  weekNumber?: number
  monthNumber?: number
  total: number
  count: number
  contributions: Contribution[]
}

export default function CotisationsPage() {
  const { data: session } = useSession();
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [groupedData, setGroupedData] = useState<GroupedData[]>([])
  const [summary, setSummary] = useState({
    totalAmount: 0,
    totalCount: 0,
    averageAmount: 0,
  })
  const [loading, setLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showForm, setShowForm] = useState(false)
  
  // Filters
  const [groupBy, setGroupBy] = useState<'day' | 'week' | 'month'>('day')
  const [memberId, setMemberId] = useState('')
  const [type, setType] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    fetchContributions()
  }, [groupBy, memberId, startDate, endDate])

  const fetchContributions = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (memberId) params.append('memberId', memberId)
      if (startDate) params.append('startDate', startDate)
      if (endDate) params.append('endDate', endDate)
      params.append('groupBy', groupBy)

      const response = await axios.get(`/api/contributions?${params.toString()}`)
      if (response.data.success) {
        const { contributions, groupedData, summary } = response.data.data
        setContributions(contributions)
        setGroupedData(groupedData)
        setSummary(summary)
      }
    } catch (error) {
      console.error('Error fetching contributions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    fetchContributions()
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatGroupLabel = (group: GroupedData) => {
    if (groupBy === 'day' && group?.date) {
      return formatDate(group?.date)
    } else if (groupBy === 'week' && group?.weekNumber && group?.year) {
      return `Semaine ${group?.weekNumber} - ${group?.year}`
    } else if (groupBy === 'month' && group?.monthNumber && group?.year) {
      const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
      return `${monthNames[group?.monthNumber - 1]} ${group?.year}`
    }
    return ''
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
        <h1 className="text-headline-lg font-bold text-on-surface">Cotisations & Paiements</h1>
        <p className="text-body-md text-on-surface-variant">Gérez les contributions des membres</p>
        </div>
        <button
        onClick={() => setShowForm(!showForm)}
        className="flex items-center gap-2 bg-secondary text-on-secondary px-5 py-2.5 rounded-lg font-medium hover:bg-secondary/90 transition-colors shadow-sm whitespace-nowrap"
        >
        {showForm ? <CircleMinus /> : <CirclePlus />}
        {showForm ? 'Fermer le formulaire' : 'Enregistrer un paiement'}
        </button>
    </div>

    {/* Contribution Form */}
    {showForm && (
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/20">
        <ContributionForm 
            onSuccess={handleFormSuccess}
            onCancel={() => setShowForm(false)}
            userId={session?.user?.id}
        />
        </div>
    )}

    {/* Summary Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/20">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
            <HandCoins />
            </div>
            <div>
            <h3 className="text-stat-number text-on-surface">{summary.totalAmount.toFixed(2)} Fc</h3>
            <p className="text-label-md text-on-surface-variant">Montant total</p>
            </div>
        </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/20">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <HandCoins />
            </div>
            <div>
            <h3 className="text-stat-number text-on-surface">{summary.totalCount}</h3>
            <p className="text-label-md text-on-surface-variant">Nombre de paiements</p>
            </div>
        </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/20">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center">
            <Divide />
            </div>
            <div>
            <h3 className="text-stat-number text-on-surface">{summary.averageAmount.toFixed(2)} Fc</h3>
            <p className="text-label-md text-on-surface-variant">Moyenne par paiement</p>
            </div>
        </div>
        </div>
    </div>

    {/* Filters */}
    <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        <div>
            <label className="text-label-md text-on-surface-variant">Regrouper par</label>
            <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value as 'day' | 'week' | 'month')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
            <option value="day">Jour</option>
            <option value="week">Semaine</option>
            <option value="month">Mois</option>
            </select>
        </div>
        <div>
            <label className="text-label-md text-on-surface-variant">ID Membre</label>
            <input
            type="text"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder="ID du membre"
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
        </div>
        <div>
            <label className="text-label-md text-on-surface-variant">Date début</label>
            <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
        </div>
        <div>
            <label className="text-label-md text-on-surface-variant">Date fin</label>
            <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
        </div>
        </div>
        <div className="mt-3 flex justify-end">
        <button
            onClick={() => {
            setMemberId('')
            setType('')
            setStartDate('')
            setEndDate('')
            }}
            className="px-4 py-2 text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors text-sm"
        >
            Effacer les filtres
        </button>
        </div>
    </div>

    {/* Grouped Contributions */}
    {loading ? (
        <div className="text-center py-8 text-on-surface-variant">Chargement...</div>
    ) : groupedData.length === 0 ? (
        <div className="text-center py-8 text-on-surface-variant">Aucune contribution trouvée</div>
    ) : (
        <div className="space-y-4">
        {groupedData.map((group, index) => (
            <div key={index} className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 overflow-hidden">
            {/* Group Header */}
            <div className="flex justify-between items-center px-6 py-3 bg-surface-container-low border-b border-outline-variant/20">
                <div>
                <h3 className="font-headline-md text-on-surface">{formatGroupLabel(group)}</h3>
                <p className="text-sm text-on-surface-variant">{group?.count} paiements</p>
                </div>
                <div className="text-right">
                <p className="text-headline-md font-bold text-secondary">{group?.total?.toFixed(2)} Fc</p>
                </div>
            </div>
            {/* Group Details */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                    <tr className="bg-surface-container-low/50 border-b border-outline-variant/10">
                    <th className="text-label-md text-on-surface-variant px-4 py-2 font-semibold">Membre</th>
                    {/* <th className="text-label-md text-on-surface-variant px-4 py-2 font-semibold hidden sm:table-cell">Type</th> */}
                    <th className="text-label-md text-on-surface-variant px-4 py-2 font-semibold hidden md:table-cell">Date</th>
                    <th className="text-label-md text-on-surface-variant px-4 py-2 font-semibold text-right">Montant</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                    {group?.contributions?.map((contribution) => (
                    <tr key={contribution?.id} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">{contribution?.member?.firstName} {contribution?.member?.lastName}</span>
                            <span className="text-xs text-on-surface-variant">({contribution?.member?.memberId})</span>
                        </div>
                        </td>
                        {/* <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="text-sm text-on-surface-variant">
                            {contribution?.type === 'MONTHLY' ? 'Mensuelle' :
                            contribution?.type === 'ANNUAL' ? 'Annuelle' :
                            contribution?.type === 'SPECIAL' ? 'Spéciale' : 'Autre'}
                        </span>
                        </td> */}
                        <td className="px-4 py-3 hidden md:table-cell text-sm text-on-surface-variant">
                        {formatDate(contribution?.createdAt) || ''}
                        </td>
                        <td className="px-4 py-3 text-right font-medium text-secondary">
                        {contribution?.amount?.toFixed(2)} Fc
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        ))}
        </div>
    )}
    </div>
  )
}