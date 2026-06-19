'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import SideNavbar from '@/components/common/SideNavbar'
import TopAppBar from '@/components/common/TopAppBar'
import Footer from '@/components/common/Footer'

const steps = ['Informations Personnelles', 'Profil']

export default function NewMemberPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Form state
  const [formData, setFormData] = useState({
    // Step 1
    firstName: '',
    lastName: '',
    postName: '',
    photo: null as File | null,
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
    // Step 2
    hasDiploma: false,
    diplomaLevel: '',
    profession: '',
  })

  // Validation functions
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis'
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis'
    if (!formData.birthDate) newErrors.birthDate = 'La date de naissance est requise'
    if (!formData.birthPlace.trim()) newErrors.birthPlace = 'Le lieu de naissance est requis'
    if (!formData.nationality.trim()) newErrors.nationality = 'La nationalité est requise'
    if (!formData.provinceOrigin.trim()) newErrors.provinceOrigin = "La province d'origine est requise"
    if (!formData.country.trim()) newErrors.country = 'Le pays est requis'
    if (!formData.city.trim()) newErrors.city = 'La ville est requise'
    if (!formData.commune.trim()) newErrors.commune = 'La commune est requise'
    if (!formData.address.trim()) newErrors.address = 'L\'adresse est requise'
    if (!formData.phone.trim()) newErrors.phone = 'Le numéro de téléphone est requis'
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}
    
    if (formData.hasDiploma && !formData.diplomaLevel) {
      newErrors.diplomaLevel = 'Le niveau de diplôme est requis'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Navigation handlers
  const handleNext = () => {
    console.log('🟡 handleNext called, currentStep:', currentStep)
    
    let isValid = false
    if (currentStep === 0) {
      isValid = validateStep1()
    } else if (currentStep === 1) {
      isValid = validateStep2()
    }

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
      setErrors({})
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
    setErrors({})
  }

  // Input handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, photo: file }))
  }

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('🔵 FORM SUBMITTED with data:', formData)
    
    // Final validation
    if (currentStep === 0) {
      if (!validateStep1()) return
    }
    if (currentStep === 1) {
      if (!validateStep2()) return
    }

    setIsSubmitting(true)
    try {
      const submitData = new FormData()
      
      // Add all fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          if (key === 'photo' && value instanceof File) {
            submitData.append(key, value)
          } else if (typeof value === 'boolean') {
            submitData.append(key, String(value))
          } else if (typeof value === 'string') {
            submitData.append(key, value)
          }
        }
      })

      console.log('🔵 Sending POST request to /api/members')
      const response = await axios.post('/api/members', submitData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      console.log('🔵 Response:', response.data)

      if (response.data.success) {
        router.push('/members')
      }
    } catch (error: any) {
      console.error('🔴 Error:', error)
      const message = error.response?.data?.message || error.message || 'Erreur lors de la création'
    } finally {
      setIsSubmitting(false)
    }
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
      <form onSubmit={handleSubmit} className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/20">
        {/* Step 1: Personal Information */}
        {currentStep === 0 && (
          <div className="space-y-6">
            <h3 className="text-headline-md font-bold text-on-surface">Informations Personnelles</h3>
            <p className="text-body-md text-on-surface-variant">Saisissez les informations personnelles du membre</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-label-md font-medium text-on-surface mb-1">
                  Prénom <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 bg-surface-container-low border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                    ${errors.firstName ? 'border-error' : 'border-outline-variant'}`}
                  placeholder="Entrer le prénom"
                />
                {errors.firstName && <p className="text-xs text-error mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-label-md font-medium text-on-surface mb-1">
                  Nom <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 bg-surface-container-low border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                    ${errors.lastName ? 'border-error' : 'border-outline-variant'}`}
                  placeholder="Entrer le nom"
                />
                {errors.lastName && <p className="text-xs text-error mt-1">{errors.lastName}</p>}
              </div>

              <div>
                <label className="block text-label-md font-medium text-on-surface mb-1">
                  Post-nom
                </label>
                <input
                  type="text"
                  name="postName"
                  value={formData.postName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Entrer le post-nom"
                />
              </div>

              <div>
                <label className="block text-label-md font-medium text-on-surface mb-1">
                  Photo
                </label>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-secondary file:text-on-secondary hover:file:bg-secondary/90"
                />
              </div>

              <div>
                <label className="block text-label-md font-medium text-on-surface mb-1">
                  Date de naissance <span className="text-error">*</span>
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 bg-surface-container-low border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                    ${errors.birthDate ? 'border-error' : 'border-outline-variant'}`}
                />
                {errors.birthDate && <p className="text-xs text-error mt-1">{errors.birthDate}</p>}
              </div>

              <div>
                <label className="block text-label-md font-medium text-on-surface mb-1">
                  Lieu de naissance <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 bg-surface-container-low border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                    ${errors.birthPlace ? 'border-error' : 'border-outline-variant'}`}
                  placeholder="Entrer le lieu de naissance"
                />
                {errors.birthPlace && <p className="text-xs text-error mt-1">{errors.birthPlace}</p>}
              </div>

              <div>
                <label className="block text-label-md font-medium text-on-surface mb-1">
                  Genre <span className="text-error">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="MALE">Masculin</option>
                  <option value="FEMALE">Féminin</option>
                </select>
              </div>

              <div>
                <label className="block text-label-md font-medium text-on-surface mb-1">
                  Nationalité <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 bg-surface-container-low border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                    ${errors.nationality ? 'border-error' : 'border-outline-variant'}`}
                  placeholder="Entrer la nationalité"
                />
                {errors.nationality && <p className="text-xs text-error mt-1">{errors.nationality}</p>}
              </div>

              <div>
                <label className="block text-label-md font-medium text-on-surface mb-1">
                  Province d'origine <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  name="provinceOrigin"
                  value={formData.provinceOrigin}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 bg-surface-container-low border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                    ${errors.provinceOrigin ? 'border-error' : 'border-outline-variant'}`}
                  placeholder="Entrer la province"
                />
                {errors.provinceOrigin && <p className="text-xs text-error mt-1">{errors.provinceOrigin}</p>}
              </div>

              <div>
                <label className="block text-label-md font-medium text-on-surface mb-1">
                  État civil <span className="text-error">*</span>
                </label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="MARRIED">Marié(e)</option>
                  <option value="SINGLE">Célibataire</option>
                  <option value="WIDOWED">Veuf/Veuve</option>
                  <option value="DIVORCED">Divorcé(e)</option>
                </select>
              </div>

              <div>
                <label className="block text-label-md font-medium text-on-surface mb-1">
                  Pays <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 bg-surface-container-low border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                    ${errors.country ? 'border-error' : 'border-outline-variant'}`}
                  placeholder="Entrer le pays"
                />
                {errors.country && <p className="text-xs text-error mt-1">{errors.country}</p>}
              </div>

              <div>
                <label className="block text-label-md font-medium text-on-surface mb-1">
                  Ville <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 bg-surface-container-low border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                    ${errors.city ? 'border-error' : 'border-outline-variant'}`}
                  placeholder="Entrer la ville"
                />
                {errors.city && <p className="text-xs text-error mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-label-md font-medium text-on-surface mb-1">
                  Commune <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  name="commune"
                  value={formData.commune}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 bg-surface-container-low border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                    ${errors.commune ? 'border-error' : 'border-outline-variant'}`}
                  placeholder="Entrer la commune"
                />
                {errors.commune && <p className="text-xs text-error mt-1">{errors.commune}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-label-md font-medium text-on-surface mb-1">
                  Adresse <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 bg-surface-container-low border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                    ${errors.address ? 'border-error' : 'border-outline-variant'}`}
                  placeholder="Entrer l'adresse"
                />
                {errors.address && <p className="text-xs text-error mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-label-md font-medium text-on-surface mb-1">
                  Téléphone <span className="text-error">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 bg-surface-container-low border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                    ${errors.phone ? 'border-error' : 'border-outline-variant'}`}
                  placeholder="Entrer le numéro de téléphone"
                />
                {errors.phone && <p className="text-xs text-error mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-label-md font-medium text-on-surface mb-1">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Entrer le numéro WhatsApp"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-label-md font-medium text-on-surface mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 bg-surface-container-low border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                    ${errors.email ? 'border-error' : 'border-outline-variant'}`}
                  placeholder="Entrer l'adresse email"
                />
                {errors.email && <p className="text-xs text-error mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Profile */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-headline-md font-bold text-on-surface">Profil</h3>
            <p className="text-body-md text-on-surface-variant">Saisissez les informations de profil du membre</p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="hasDiploma"
                  checked={formData.hasDiploma}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary"
                />
                <label className="text-body-md font-medium text-on-surface">
                  Possède un diplôme
                </label>
              </div>

              {formData.hasDiploma && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-outline-variant/30">
                  <div>
                    <label className="block text-label-md font-medium text-on-surface mb-1">
                      Niveau de diplôme <span className="text-error">*</span>
                    </label>
                    <select
                      name="diplomaLevel"
                      value={formData.diplomaLevel}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 bg-surface-container-low border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                        ${errors.diplomaLevel ? 'border-error' : 'border-outline-variant'}`}
                    >
                      <option value="">Sélectionner le niveau</option>
                      <option value="STATE_DIPLOMA">Diplôme d'État</option>
                      <option value="GRADUATE">Graduât</option>
                      <option value="LICENSE">Licence</option>
                      <option value="MASTER">Master</option>
                      <option value="DOCTORATE">Doctorat</option>
                    </select>
                    {errors.diplomaLevel && <p className="text-xs text-error mt-1">{errors.diplomaLevel}</p>}
                  </div>

                  <div>
                    <label className="block text-label-md font-medium text-on-surface mb-1">
                      Profession
                    </label>
                    <input
                      type="text"
                      name="profession"
                      value={formData.profession}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Entrer la profession"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 mt-6 border-t border-outline-variant/20">
          <button
            type="button"
            onClick={handlePrevious}
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
                className="px-6 py-2 bg-secondary text-on-secondary rounded-lg font-medium hover:bg-secondary/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Création...' : 'Créer le Membre'}
              </button>
            ) : (
              <p
                onClick={handleNext}
                className="px-6 py-2 bg-primary cursor-pointer text-on-primary rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Suivant
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}