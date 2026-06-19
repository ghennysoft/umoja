'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import {ArrowLeft} from 'lucide-react'
import { MemberWithRelations } from '@/types/member.types'
import { formatDate, getGenderLabel, getMaritalStatusLabel, getDiplomaLabel } from '@/app/lib/utils'

export default function MemberDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [member, setMember] = useState<MemberWithRelations | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    fetchMember()
  }, [id])

  const fetchMember = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`/api/members/${id}`)
      if (response.data.success) {
        setMember(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching member:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) {
      try {
        await axios.delete(`/api/members/${id}`)
        router.push('/membres')
      } catch (error) {
        console.error('Error deleting member:', error)
        alert('Erreur lors de la suppression du membre')
      }
    }
  }

  if (loading) {
    return (
      <p className="text-on-surface-variant">Chargement des détails du membre...</p>
    )
  }

  if (!member) {
    return (
      <div className="text-center">
        <p className="text-on-surface-variant text-lg">Membre non trouvé</p>
        <Link href="/membres" className="text-secondary hover:underline mt-2 inline-block">
          Retour aux Membres
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Link href="/membres" className="text-secondary hover:underline flex items-center gap-1 mb-2">
            <ArrowLeft />
            Retour aux Membres
          </Link>
          <h1 className="text-headline-lg font-bold text-on-surface">Détails du Membre</h1>
          <p className="text-body-md text-on-surface-variant">{member.memberId}</p>
        </div>
        {/* <div className="flex gap-3">
          <Link
            href={`/membres/${member.id}/edit`}
            className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            Modifier
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 bg-error-container text-on-error-container px-4 py-2 rounded-lg font-medium hover:bg-error-container/80 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
            Supprimer
          </button>
        </div> */}
      </div>

      {/* Profile Card */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/20 mb-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-32 h-32 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-4xl font-bold shrink-0 overflow-hidden">
            {member.photo ? (
              <img src={member.photo} alt={member.firstName} className="w-full h-full object-cover" />
            ) : (
              member.firstName[0] + member.lastName[0]
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-headline-md font-bold text-on-surface">
              {member.firstName} {member.postName} {member.lastName}
            </h2>
            <p className="text-body-md text-secondary font-medium">{member.profession || 'Membre'}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-label-md text-on-surface-variant">Statut</p>
                <p className="text-body-md font-medium">Actif</p>
              </div>
              <div>
                <p className="text-label-md text-on-surface-variant">Date d'adhésion</p>
                <p className="text-body-md font-medium">{formatDate(member.createdAt)}</p>
              </div>
              <div>
                <p className="text-label-md text-on-surface-variant">Diplôme</p>
                <p className="text-body-md font-medium">{member.hasDiploma ? 'Oui' : 'Non'}</p>
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
              <p className="text-body-md font-medium">{member.firstName} {member.postName} {member.lastName}</p>
            </div>
            <div>
              <p className="text-label-md text-on-surface-variant">Date de naissance</p>
              <p className="text-body-md font-medium">{formatDate(member.birthDate)}</p>
            </div>
            <div>
              <p className="text-label-md text-on-surface-variant">Lieu de naissance</p>
              <p className="text-body-md font-medium">{member.birthPlace}</p>
            </div>
            <div>
              <p className="text-label-md text-on-surface-variant">Genre</p>
              <p className="text-body-md font-medium">{getGenderLabel(member.gender)}</p>
            </div>
            <div>
              <p className="text-label-md text-on-surface-variant">Nationalité</p>
              <p className="text-body-md font-medium">{member.nationality}</p>
            </div>
            <div>
              <p className="text-label-md text-on-surface-variant">Province d'origine</p>
              <p className="text-body-md font-medium">{member.provinceOrigin}</p>
            </div>
            <div>
              <p className="text-label-md text-on-surface-variant">État civil</p>
              <p className="text-body-md font-medium">{getMaritalStatusLabel(member.maritalStatus)}</p>
            </div>
          </div>
        </div>

        {/* Contact & Address */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/20">
          <h3 className="text-headline-md font-bold text-on-surface mb-4">Contact & Adresse</h3>
          <div className="space-y-3">
            <div>
              <p className="text-label-md text-on-surface-variant">Pays</p>
              <p className="text-body-md font-medium">{member.country}</p>
            </div>
            <div>
              <p className="text-label-md text-on-surface-variant">Ville</p>
              <p className="text-body-md font-medium">{member.city}</p>
            </div>
            <div>
              <p className="text-label-md text-on-surface-variant">Commune</p>
              <p className="text-body-md font-medium">{member.commune}</p>
            </div>
            <div>
              <p className="text-label-md text-on-surface-variant">Adresse</p>
              <p className="text-body-md font-medium">{member.address}</p>
            </div>
            <div>
              <p className="text-label-md text-on-surface-variant">Téléphone</p>
              <p className="text-body-md font-medium">{member.phone}</p>
            </div>
            <div>
              <p className="text-label-md text-on-surface-variant">WhatsApp</p>
              <p className="text-body-md font-medium">{member.whatsapp || 'Non renseigné'}</p>
            </div>
            <div>
              <p className="text-label-md text-on-surface-variant">Email</p>
              <p className="text-body-md font-medium">{member.email || 'Non renseigné'}</p>
            </div>
          </div>
        </div>

        {/* Profile */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/20 md:col-span-2">
          <h3 className="text-headline-md font-bold text-on-surface mb-4">Profil</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-label-md text-on-surface-variant">Possède un diplôme</p>
              <p className="text-body-md font-medium">{member.hasDiploma ? 'Oui' : 'Non'}</p>
            </div>
            {member.hasDiploma && (
              <>
                <div>
                  <p className="text-label-md text-on-surface-variant">Niveau de diplôme</p>
                  <p className="text-body-md font-medium">{member.diplomaLevel ? getDiplomaLabel(member.diplomaLevel) : 'Non renseigné'}</p>
                </div>
                <div>
                  <p className="text-label-md text-on-surface-variant">Profession</p>
                  <p className="text-body-md font-medium">{member.profession || 'Non renseignée'}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Contributions */}
      {member.contributions && member.contributions.length > 0 && (
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/20 mt-6">
          <h3 className="text-headline-md font-bold text-on-surface mb-4">Contributions</h3>
          <div className="space-y-3">
            {member.contributions.map((contribution) => (
              <div key={contribution.id} className="flex justify-between items-center p-3 bg-surface-container-low rounded-lg">
                <div>
                  <p className="font-medium">{contribution.amount} $</p>
                  <p className="text-sm text-on-surface-variant">
                    {formatDate(contribution.date)} - {contribution.type}
                  </p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  contribution.status === 'PAID' ? 'bg-secondary/10 text-secondary' :
                  contribution.status === 'PENDING' ? 'bg-orange-100 text-orange-600' :
                  'bg-error/10 text-error'
                }`}>
                  {contribution.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}