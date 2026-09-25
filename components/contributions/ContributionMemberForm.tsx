'use client'

import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { CheckCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import PhoneInput, { parsePhoneNumber }  from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useOperator } from '@/hooks/useOperator'

interface ContributionMemberFormProps {
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

type Provider = "AIRTEL" | "ORANGE" | "MPESA";

export default function ContributionMemberFormSimple({ 
  onSuccess, 
  onCancel, 
  userId
}: ContributionMemberFormProps) {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [member, setMember] = useState<MemberOption | null>(null)  
  
  const [reference, setReference] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [countryInfos, setCountryInfos] = useState({
    countryCode: "",
    dialCode: "",
    nationalNumber: "",
  })
  console.log(countryInfos);
  
  const operator = useOperator(countryInfos.nationalNumber);
  console.log({operator});

  const [formData, setFormData] = useState({
    userId: session?.user?.id,
    memberId: member?.id,
    amount: '',
    currency: '',
    provider: '',
    walletID: '',
  })
  console.log(formData);

  // Dialog state
  const [dialog, setDialog] = useState<{
    show: boolean
    message: string
    exists: boolean
    currency: string
    amount: number
  }>({
    show: false,
    message: '',
    exists: false,
    currency: '',
    amount: 0,
  })

  const searchRef = useRef<HTMLDivElement>(null)

  // Search members with debounce
  useEffect(() => {
    const getMember = async () => {
      try {
        const response = await axios.get(`/api/members/user/${session?.user?.id}`)
        if (response.data.success) {
          setFormData({...formData, memberId: response.data.data.id})
          setMember(response.data.data)
        } else {
          setMember(null)
        }
      } catch (error) {
        console.error('Error searching members:', error)
        setMember(null)
      } 
    }

    getMember();
  }, [session?.user?.id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleChange = (phoneValue: string) => {
    if(!phoneValue) return;
    const parseNumber = parsePhoneNumber(phoneValue);
    if(parseNumber){
      setCountryInfos({
        countryCode: parseNumber.country || "",
        dialCode: parseNumber.countryCallingCode || "",
        nationalNumber: parseNumber.nationalNumber || "",
      });
      setFormData({...formData, walletID: "+"+countryInfos.dialCode+countryInfos.nationalNumber})
    } else {
      setCountryInfos({
        countryCode: "",
        dialCode: "",
        nationalNumber: "",
      });
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation simple

    const memberId = formData.memberId
    if (!memberId) {
      alert('Membre non définit')
      return
    }

    if (!formData.currency) {
      alert('Veuillez sélectionner une devise')
      return
    }

    const amount = parseFloat(formData.amount)
    if (!amount || amount <= 0) {
      alert('Veuillez entrer un montant valide')
      return
    }

    // Check if member exists
    try {
      setDialog({
        show: true,
        message: `Vous faites un paiement de ${amount} ${formData.currency}`,
        exists: true,
        currency: formData.currency,
        amount: amount,
      })
    } catch (error: any) {
      setDialog({
        show: true,
        message: `Cet ID de membre n'existe pas`, 
        exists: false,
        currency: formData.currency,
        amount: amount,
      })
    }
  }

  const confirmPayment = async () => {
    setIsSubmitting(true)
    try {
      const data = {
        userId: formData.userId,
        memberId: formData.memberId,
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        provider: operator?.name,
        walletID: "+"+countryInfos.dialCode+countryInfos.nationalNumber,
      }
      console.log("DATA : ", data);

      const response = await axios.post('/api/contributions/initiate', data)

      if (response.data.success) {
        console.log('Payment initiated successfully:', response.data)
        // Reset form
        setFormData({
          userId: session?.user?.id,
          memberId: member?.id,
          currency: '',
          amount: '',
          provider: "",
          walletID: "",
        })
        setDialog({ show: false, message: '', exists: false, currency: "", amount: 0 })
        
        if (onSuccess) {
          onSuccess()
        }
      }
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Erreur lors de l\'enregistrement'
      console.log({error});
    } finally {
      setIsSubmitting(false)
    }
  }

  const cancelDialog = () => {
    setDialog({ show: false, message: '', exists: false, currency: "", amount: 0 })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
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

        {/* Devise */}
        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Devise <span className="text-error">*</span>
          </label>
          <div className="relative">
            <input
              type="radio"
              name="currency"
              value={'CDF'}
              onChange={handleInputChange}
              className="pl-8 pr-4 py-2 border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            /> &nbsp; CDF &nbsp; &nbsp; &nbsp;
            <input
              type="radio"
              name="currency"
              value={'USD'}
              onChange={handleInputChange}
              className="pl-8 pr-4 py-2 border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            /> &nbsp; USD 
          </div>
        </div>

        {/* MOMO Number */}
        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Numéro de paiement <span className="text-error">*</span>
          </label>
          <div className="relative">
            <PhoneInput
              international
              id="phone"
              defaultCountry="CD"
              onChange={handleChange}
              countryCallingCodeEditable={false}
              className="w-full pl-2 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
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
                  {dialog.exists ? <CheckCircle /> : 'error'}
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