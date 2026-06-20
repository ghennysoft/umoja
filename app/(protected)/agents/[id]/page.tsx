'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import { AgentWithRelations } from '@/types/agent.types'
import { formatDate } from '@/app/lib/utils'
import { ArrowLeft } from 'lucide-react'

export default function AgentDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [agent, setAgent] = useState<AgentWithRelations | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    fetchAgent()
  }, [id])

  const fetchAgent = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`/api/agents/${id}`)
      if (response.data.success) {
        setAgent(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching agent:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      try {
        await axios.delete(`/api/agents/${id}`)
        router.push('/agents')
      } catch (error) {
        console.error('Error deleting agent:', error)
        alert('Failed to delete agent')
      }
    }
  }

  if (loading) {
    return (
      <>
        <p className="text-on-surface-variant">Loading agent details...</p>
      </>
    )
  }

  if (!agent) {
    return (
      <>
        <div className="text-center">
          <p className="text-on-surface-variant text-lg">Agent non trouvé</p>
          <Link href="/agents" className="text-secondary hover:underline mt-2 inline-block">
            Revenir à la liste d'Agents
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <Link href="/agents" className="text-secondary hover:underline flex items-center gap-1 mb-2">
              <ArrowLeft />
              Retour
            </Link>
            <h1 className="text-headline-lg font-bold text-on-surface">Agent Details</h1>
            <p className="text-body-md text-on-surface-variant">{agent.agentId}</p>
          </div>
          {/* <div className="flex gap-3">
            <Link
              href={`/agents/${agent.id}/edit`}
              className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 bg-error-container text-on-error-container px-4 py-2 rounded-lg font-medium hover:bg-error-container/80 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
              Delete
            </button>
          </div> */}
        </div>

        {/* Profile Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/20 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-32 h-32 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-4xl font-bold shrink-0 overflow-hidden">
              {agent.photo ? (
                <img src={agent.photo} alt={agent.firstName} className="w-full h-full object-cover" />
              ) : (
                agent.firstName[0] + agent.lastName[0]
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-headline-md font-bold text-on-surface">
                {agent.firstName} {agent.postName} {agent.lastName}
              </h2>
              <p className="text-body-md text-secondary font-medium">{agent.function}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-label-md text-on-surface-variant">Zone</p>
                  <p className="text-body-md font-medium">{agent.zone}</p>
                </div>
                <div>
                  <p className="text-label-md text-on-surface-variant">Date de debut</p>
                  <p className="text-body-md font-medium">{formatDate(agent.startDate)}</p>
                </div>
                <div>
                  <p className="text-label-md text-on-surface-variant">Superviseur</p>
                  <p className="text-body-md font-medium">{agent.supervisor || 'None'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/20">
            <h3 className="text-headline-md font-bold text-on-surface mb-4">Informations Personnelles</h3>
            <div className="space-y-3">
              <div>
                <p className="text-label-md text-on-surface-variant">Nom complet</p>
                <p className="text-body-md font-medium">{agent.firstName} {agent.postName} {agent.lastName}</p>
              </div>
              <div>
                <p className="text-label-md text-on-surface-variant">Date de naissance</p>
                <p className="text-body-md font-medium">{formatDate(agent.birthDate)}</p>
              </div>
              <div>
                <p className="text-label-md text-on-surface-variant">Lieu de naissance</p>
                <p className="text-body-md font-medium">{agent.birthPlace}</p>
              </div>
              <div>
                <p className="text-label-md text-on-surface-variant">Genre</p>
                <p className="text-body-md font-medium">{agent.gender}</p>
              </div>
              <div>
                <p className="text-label-md text-on-surface-variant">Nationalité</p>
                <p className="text-body-md font-medium">{agent.nationality}</p>
              </div>
              <div>
                <p className="text-label-md text-on-surface-variant">Province d'Origine</p>
                <p className="text-body-md font-medium">{agent.provinceOrigin}</p>
              </div>
              <div>
                <p className="text-label-md text-on-surface-variant">Etat-civil</p>
                <p className="text-body-md font-medium">{agent.maritalStatus}</p>
              </div>
            </div>
          </div>

          {/* Contact & Address */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/20">
            <h3 className="text-headline-md font-bold text-on-surface mb-4">Contact & Adresse</h3>
            <div className="space-y-3">
              <div>
                <p className="text-label-md text-on-surface-variant">Pays</p>
                <p className="text-body-md font-medium">{agent.country}</p>
              </div>
              <div>
                <p className="text-label-md text-on-surface-variant">Ville</p>
                <p className="text-body-md font-medium">{agent.city}</p>
              </div>
              <div>
                <p className="text-label-md text-on-surface-variant">Commune</p>
                <p className="text-body-md font-medium">{agent.commune}</p>
              </div>
              <div>
                <p className="text-label-md text-on-surface-variant">Adresse</p>
                <p className="text-body-md font-medium">{agent.address}</p>
              </div>
              <div>
                <p className="text-label-md text-on-surface-variant">Numéro de téléphone</p>
                <p className="text-body-md font-medium">{agent.phone}</p>
              </div>
              <div>
                <p className="text-label-md text-on-surface-variant">WhatsApp</p>
                <p className="text-body-md font-medium">{agent.whatsapp || 'None'}</p>
              </div>
              <div>
                <p className="text-label-md text-on-surface-variant">Email</p>
                <p className="text-body-md font-medium">{agent.email || 'None'}</p>
              </div>
            </div>
          </div>

          {/* Identification */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/20">
            <h3 className="text-headline-md font-bold text-on-surface mb-4">Identification</h3>
            <div className="space-y-3">
              <div>
                <p className="text-label-md text-on-surface-variant">Détient une carte d'identité</p>
                <p className="text-body-md font-medium">{agent.hasId ? 'Yes' : 'No'}</p>
              </div>
              {agent.hasId && (
                <>
                  <div>
                    <p className="text-label-md text-on-surface-variant">Type de carte</p>
                    <p className="text-body-md font-medium">{agent.idType}</p>
                  </div>
                  <div>
                    <p className="text-label-md text-on-surface-variant">Numéro de la carte</p>
                    <p className="text-body-md font-medium">{agent.idNumber}</p>
                  </div>
                  <div>
                    <p className="text-label-md text-on-surface-variant">Date d'éxpiration de la carte</p>
                    <p className="text-body-md font-medium">{agent.idExpirationDate ? formatDate(agent.idExpirationDate) : 'None'}</p>
                  </div>
                  {agent.idPhoto && (
                    <div>
                      <p className="text-label-md text-on-surface-variant">Photo de la carte</p>
                      <img src={agent.idPhoto} alt="ID Document" className="w-32 h-32 object-cover rounded-lg mt-1" />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Function */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/20">
            <h3 className="text-headline-md font-bold text-on-surface mb-4">Fonction</h3>
            <div className="space-y-3">
              <div>
                <p className="text-label-md text-on-surface-variant">Fonction</p>
                <p className="text-body-md font-medium">{agent.function}</p>
              </div>
              <div>
                <p className="text-label-md text-on-surface-variant">Zone</p>
                <p className="text-body-md font-medium">{agent.zone}</p>
              </div>
              <div>
                <p className="text-label-md text-on-surface-variant">Date de début</p>
                <p className="text-body-md font-medium">{formatDate(agent.startDate)}</p>
              </div>
              <div>
                <p className="text-label-md text-on-surface-variant">Superviseur</p>
                <p className="text-body-md font-medium">{agent.supervisor || 'None'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Missions */}
        {/* {agent.missions && agent.missions.length > 0 && (
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/20 mt-6">
            <h3 className="text-headline-md font-bold text-on-surface mb-4">Missions</h3>
            <div className="space-y-3">
              {agent.missions.map((mission) => (
                <div key={mission.id} className="flex justify-between items-center p-3 bg-surface-container-low rounded-lg">
                  <div>
                    <p className="font-medium">{mission.zone}</p>
                    <p className="text-sm text-on-surface-variant">
                      {formatDate(mission.startDate)} - {mission.endDate ? formatDate(mission.endDate) : 'Ongoing'}
                    </p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    mission.status === 'ACTIVE' ? 'bg-secondary/10 text-secondary' :
                    mission.status === 'COMPLETED' ? 'bg-primary/10 text-primary' :
                    'bg-error/10 text-error'
                  }`}>
                    {mission.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )} */}
      </div>
    </>
  )
}