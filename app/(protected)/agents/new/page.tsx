'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import AgentFormStep1 from '@/components/agents/AgentFormStep1'
import AgentFormStep2 from '@/components/agents/AgentFormStep2'
import AgentFormStep3 from '@/components/agents/AgentFormStep3'
import { agentSchema } from '@/schemas/agent.schema'

const steps = ['Informations Personnelles', 'Identification', 'Fonction']

export default function NewAgentPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
    getValues,
    setError,
  } = useForm<any>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      hasId: false,
      gender: undefined,
      maritalStatus: undefined,
    },
  })

  const onNext = async () => {
    let fieldsToValidate: (keyof any)[] = []

    if (currentStep === 0) {
      fieldsToValidate = [
        'firstName', 'lastName', 'birthDate', 'birthPlace', 'gender',
        'nationality', 'provinceOrigin', 'maritalStatus', 'country',
        'city', 'commune', 'address', 'phone'
      ]
    } else if (currentStep === 1) {
      const hasId = getValues('hasId')
      if (hasId) {
        fieldsToValidate = ['idType', 'idNumber', 'idExpirationDate']
      }
    } else if (currentStep === 2) {
      fieldsToValidate = ['function', 'zone', 'startDate']
    }

    const isValid = await trigger(fieldsToValidate as any)
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
      setSubmitError(null)
    } else {
      // Affiche les erreurs dans la console pour déboguer
      console.log('Validation errors:', errors)
    }
  }

  const onPrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      console.log('Submitting data:', data)
      
      const formData = new FormData()
      
      // Ajouter tous les champs au FormData
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

      const response = await axios.post('/api/agents', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // 30 secondes timeout
      })

      console.log('Response:', response.data)

      if (response.data.success) {
        router.push('/agents')
      } else {
        setSubmitError(response.data.message || 'Failed to create agent')
      }
    } catch (error: any) {
      console.error('Error creating agent:', error)
      
      // Afficher les erreurs de validation du backend
      if (error.response?.data?.errors) {
        const backendErrors = error.response.data.errors
        Object.entries(backendErrors).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            setError(key as any, { message: value[0] })
          }
        })
        setSubmitError('Please fix the validation errors')
      } else {
        setSubmitError(error.response?.data?.message || error.message || 'Failed to create agent')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Watch hasId pour mettre à jour l'UI du step 2
  const hasId = watch('hasId')

  return (
    <>
        <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
            <h1 className="text-headline-lg font-bold text-on-surface">Add New Agent</h1>
            <p className="text-body-md text-on-surface-variant">Fill in the agent's information</p>
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

        {/* Error Message */}
        {submitError && (
            <div className="mb-4 p-4 bg-error-container text-on-error-container rounded-lg border border-error/20">
            <p className="text-sm font-medium">{submitError}</p>
            </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/20">
            {currentStep === 0 && (
            <AgentFormStep1 
                register={register} 
                errors={errors} 
            />
            )}
            {currentStep === 1 && (
            <AgentFormStep2 
                register={register} 
                errors={errors} 
                watch={watch}
            />
            )}
            {currentStep === 2 && (
            <AgentFormStep3 
                register={register} 
                errors={errors} 
            />
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 mt-6 border-t border-outline-variant/20">
            <button
                type="button"
                onClick={onPrevious}
                className={`w-full sm:w-auto px-6 py-2 rounded-lg font-medium transition-colors
                ${currentStep === 0 
                    ? 'opacity-50 cursor-not-allowed bg-surface-container-high text-on-surface-variant' 
                    : 'hover:bg-surface-container border border-outline-variant'}`}
                disabled={currentStep === 0}
            >
                Previous
            </button>
            <div className="flex gap-3 w-full sm:w-auto">
                {currentStep === steps.length - 1 ? (
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-2 bg-secondary text-on-secondary rounded-lg font-medium hover:bg-secondary/90 transition-colors disabled:opacity-50"
                >
                    {isSubmitting ? (
                    <span className="flex items-center gap-2">
                        <span className="animate-spin">⏳</span>
                        Creating...
                    </span>
                    ) : (
                    'Create Agent'
                    )}
                </button>
                ) : (
                <button
                    type="button"
                    onClick={onNext}
                    className="w-full sm:w-auto px-6 py-2 bg-primary text-on-primary rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                    Next →
                </button>
                )}
            </div>
            </div>
        </form>
        </div>
    </>
  )
}