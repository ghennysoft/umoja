'use client'

import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

interface ContributionFormProps {
  onSuccess?: () => void
  onCancel?: () => void
  userId?: string
}

interface MemberOption {
  id: string
  memberId: string
  firstName: string
  lastName: string
  postName?: string
  photo?: string
}

export default function ContributionFormSimple({ 
  onSuccess, 
  onCancel, 
  userId = 'system' 
}: ContributionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [members, setMembers] = useState<MemberOption[]>([])
  const [showMemberList, setShowMemberList] = useState(false)
  const [selectedMember, setSelectedMember] = useState<MemberOption | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    memberId: '',
    amount: '',
  })

  // Dialog state
  const [dialog, setDialog] = useState<{
    show: boolean
    message: string
    exists: boolean
    member: MemberOption | null
    amount: number
  }>({
    show: false,
    message: '',
    exists: false,
    member: null,
    amount: 0,
  })

  const searchRef = useRef<HTMLDivElement>(null)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Search members with debounce
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (searchQuery.length > 0) {
      setIsSearching(true)
      searchTimeoutRef.current = setTimeout(() => {
        searchMembers(searchQuery)
      }, 300)
    } else {
      setMembers([])
      setShowMemberList(false)
      setIsSearching(false)
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchQuery])

  // Close member list on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowMemberList(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const searchMembers = async (query: string) => {
    try {
      const response = await axios.get(`/api/members/search?q=${encodeURIComponent(query)}`)
      if (response.data.success) {
        setMembers(response.data.data)
        setShowMemberList(response.data.data.length > 0)
      } else {
        setMembers([])
        setShowMemberList(false)
      }
    } catch (error) {
      console.error('Error searching members:', error)
      setMembers([])
      setShowMemberList(false)
    } finally {
      setIsSearching(false)
    }
  }

  const handleMemberSelect = (member: MemberOption) => {
    setSelectedMember(member)
    setFormData(prev => ({ ...prev, memberId: member.id }))
    setSearchQuery(`${member.firstName} ${member.lastName} (${member.memberId})`)
    setShowMemberList(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('🔵 Form submitted:', formData)

    // Validation simple
    if (!formData.memberId) {
      alert('Veuillez sélectionner un membre')
      return
    }

    const amount = parseFloat(formData.amount)
    if (!amount || amount <= 0) {
      alert('Veuillez entrer un montant valide')
      return
    }

    // Check if member exists
    try {
      console.log('🔵 Checking member:', formData.memberId)
      const checkResponse = await axios.get(`/api/members/${formData.memberId}`)
      console.log('🔵 Member check response:', checkResponse.data)

      if (!checkResponse.data.success) {
        setDialog({
          show: true,
          message: `Cet ID de membre n'existe pas`,
          exists: false,
          member: null,
          amount: amount,
        })
        return
      }

      const memberData = checkResponse.data.data
      setDialog({
        show: true,
        message: `Vous faites un paiement de ${amount} $ pour ${memberData.firstName} ${memberData.lastName}`,
        exists: true,
        member: memberData,
        amount: amount,
      })
    } catch (error: any) {
      console.error('🔴 Error checking member:', error)
      setDialog({
        show: true,
        message: `Cet ID de membre n'existe pas`,
        exists: false,
        member: null,
        amount: amount,
      })
    }
  }

  const confirmPayment = async () => {
    setIsSubmitting(true)
    try {
      const data = {
        memberId: selectedMember?.id || formData.memberId,
        amount: parseFloat(formData.amount),
        userId: userId,
      }

      console.log('🔵 Creating contribution:', data)

      const response = await axios.post('/api/contributions', data)
      console.log('🔵 Contribution response:', response.data)

      if (response.data.success) {
        // Reset form
        setFormData({
          memberId: '',
          amount: '',
        })
        setSelectedMember(null)
        setSearchQuery('')
        setDialog({ show: false, message: '', exists: false, member: null, amount: 0 })
        
        if (onSuccess) {
          onSuccess()
        }
      }
    } catch (error: any) {
      console.error('🔴 Error:', error)
      const message = error.response?.data?.message || error.message || 'Erreur lors de l\'enregistrement'
    } finally {
      setIsSubmitting(false)
    }
  }

  const cancelDialog = () => {
    setDialog({ show: false, message: '', exists: false, member: null, amount: 0 })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Member Search */}
        <div ref={searchRef} className="relative">
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Membre <span className="text-error">*</span>
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par nom ou ID..."
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <span className="text-on-surface-variant text-sm">Recherche...</span>
            </div>
          )}
          {showMemberList && members.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-surface-container-lowest rounded-lg border border-outline-variant shadow-lg max-h-60 overflow-y-auto">
              {members.map((member) => (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => handleMemberSelect(member)}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-surface-container transition-colors text-left"
                >
                  {member.photo ? (
                    <img src={member.photo} alt={member.firstName} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-xs font-bold">
                      {member.firstName[0]}{member.lastName[0]}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-on-surface">{member.firstName} {member.lastName}</p>
                    <p className="text-xs text-on-surface-variant">{member.memberId}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
          {showMemberList && members.length === 0 && searchQuery.length > 0 && !isSearching && (
            <div className="absolute z-50 w-full mt-1 bg-surface-container-lowest rounded-lg border border-outline-variant shadow-lg p-4 text-center text-on-surface-variant">
              Aucun membre trouvé
            </div>
          )}
        </div>

        {/* Amount */}
        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Montant <span className="text-error">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">$</span>
            <input
              type="number"
              name="amount"
              step="0.01"
              min="0.01"
              value={formData.amount}
              onChange={handleInputChange}
              className="w-full pl-8 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/20">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-secondary text-on-secondary rounded-lg font-medium hover:bg-secondary/90 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Enregistrement...' : 'Enregistrer le paiement'}
          </button>
        </div>
      </form>

      {/* Confirmation Dialog */}
      {dialog.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-surface-container-lowest rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                dialog.exists ? 'bg-secondary/10' : 'bg-error/10'
              }`}>
                <span className={`material-symbols-outlined text-3xl ${
                  dialog.exists ? 'text-secondary' : 'text-error'
                }`}>
                  {dialog.exists ? 'check_circle' : 'error'}
                </span>
              </div>
              <h3 className="text-headline-md font-bold text-on-surface mb-2">
                {dialog.exists ? 'Confirmation' : 'Erreur'}
              </h3>
              <p className="text-body-md text-on-surface-variant mb-6">
                {dialog.message}
              </p>
              {dialog.exists ? (
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={cancelDialog}
                    className="px-4 py-2 text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={confirmPayment}
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-secondary text-on-secondary rounded-lg font-medium hover:bg-secondary/90 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Traitement...' : 'Confirmer'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={cancelDialog}
                  className="px-6 py-2 bg-primary text-on-primary rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  OK
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}