'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import MemberFormStep1 from '@/components/members/MemberFormStep1'
import MemberFormStep2 from '@/components/members/MemberFormStep2'
import { memberSchema, MemberFormData } from '@/schemas/member.schema'

const steps = ['Informations Personnelles', 'Profil']

export default function NewMemberPage() {
  console.log('🟢 NewMemberPage component mounted')
  
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      hasDiploma: false,
      firstName: '',
      lastName: '',
      postName: '',
      birthDate: '',
      birthPlace: '',
      gender: 'MALE',
      nationality: '',
      provinceOrigin: '',
      maritalStatus: 'SINGLE',
      country: '',
      city: '',
      commune: '',
      address: '',
      phone: '',
      whatsapp: '',
      email: '',
      hasDiploma: false,
      diplomaLevel: undefined,
      profession: '',
    },
  })

  const onNext = async () => {
    console.log('🟡 onNext called, currentStep:', currentStep)
    let fieldsToValidate: (keyof MemberFormData)[] = []

    if (currentStep === 0) {
      fieldsToValidate = [
        'firstName', 'lastName', 'birthDate', 'birthPlace', 'gender',
        'nationality', 'provinceOrigin', 'maritalStatus', 'country',
        'city', 'commune', 'address', 'phone'
      ]
    } else if (currentStep === 1) {
      const hasDiploma = getValues('hasDiploma')
      if (hasDiploma) {
        fieldsToValidate = ['diplomaLevel']
      }
    }

    console.log('🟡 Validating fields:', fieldsToValidate)
    const isValid = await trigger(fieldsToValidate as any)
    console.log('🟡 Validation result:', isValid)
    
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
      console.log('🟢 Step advanced to:', currentStep + 1)
    } else {
      console.log('🔴 Validation failed, check errors:', errors)
    }
  }

  const onPrevious = () => {
    console.log('🟡 onPrevious called')
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const onSubmit = async (data: MemberFormData) => {
    console.log('🔵 FORM SUBMITTED with data:', data)
    console.log('🔵 Form data keys:', Object.keys(data))
    
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (typeof value === 'boolean') {
            formData.append(key, String(value))
          } else if (value instanceof File) {
            formData.append(key, value)
          } else {
            formData.append(key, String(value))
          }
        }
      })

      console.log('🔵 FormData created, entries:')
      for (const [key, value] of formData.entries()) {
        console.log(`  ${key}: ${value}`)
      }

      console.log('🔵 Sending POST request to /api/members')
      const response = await axios.post('/api/members', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      console.log('🔵 Response received:', response.data)

      if (response.data.success) {
        console.log('🟢 Member created successfully, redirecting...')
        router.push('/membres')
      } else {
        console.log('🔴 Server returned error:', response.data.message)
        alert(response.data.message || 'Erreur lors de la création du membre')
      }
    } catch (error: any) {
      console.error('🔴 Error creating member:', error)
      console.error('🔴 Error response:', error.response?.data)
      const errorMessage = error.response?.data?.message || error.message || 'Erreur lors de la création du membre'
      alert(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Test function to check if button click works
  const testClick = () => {
    console.log('🟣 TEST: Button clicked!')
    alert('Test click works!')
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-headline-lg font-bold text-on-surface">Ajouter un Membre</h1>
        <p className="text-body-md text-on-surface-variant">Saisissez les informations du membre</p>
      </div>

      {/* Steps Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((label, index) => (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                  ${index < currentStep ? 'bg-secondary text-on-secondary' :
                    index === currentStep ? 'bg-primary text-on-primary' :
                    'bg-surface-container-high text-on-surface-variant'}`}
                >
                  {index + 1}
                </div>
                <span className={`text-xs mt-1 text-center hidden sm:block
                  ${index === currentStep ? 'text-on-surface font-medium' : 'text-on-surface-variant'}`}
                >
                  {label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 rounded
                  ${index < currentStep ? 'bg-secondary' : 'bg-surface-container-high'}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/20">
        {currentStep === 0 && <MemberFormStep1 register={register} errors={errors} />}
        {currentStep === 1 && <MemberFormStep2 register={register} errors={errors} watch={watch} />}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 mt-6 border-t border-outline-variant/20">
          <button
            type="button"
            onClick={onPrevious}
            className={`px-6 py-2 rounded-lg font-medium transition-colors
              ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-surface-container'}`}
            disabled={currentStep === 0}
          >
            Précédent
          </button>
          <div className="flex gap-3">
            {currentStep === steps.length - 1 ? (
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={() => console.log('🟣 Submit button clicked!')}
                className="px-6 py-2 bg-secondary text-on-secondary rounded-lg font-medium hover:bg-secondary/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Création...' : 'Créer le Membre'}
              </button>
            ) : (
              <button
                type="button"
                onClick={onNext}
                className="px-6 py-2 bg-primary text-on-primary rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Suivant
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Test Button */}
      <div className="mt-4 p-4 bg-yellow-100 rounded-lg">
        <p className="text-sm text-yellow-800 mb-2">🔧 Zone de test - Cliquez sur le bouton ci-dessous pour vérifier que les clics fonctionnent :</p>
        <button
          type="button"
          onClick={testClick}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          Test Click
        </button>
      </div>
    </div>
  )
}