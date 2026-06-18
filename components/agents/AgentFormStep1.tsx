'use client'

import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { AgentFormData } from '@/types/agent.types'

interface AgentFormStep1Props {
  register: UseFormRegister<AgentFormData>
  errors: FieldErrors<AgentFormData>
}

export default function AgentFormStep1({ register, errors }: AgentFormStep1Props) {
  return (
    <div className="space-y-6">
      <h3 className="text-headline-md font-bold text-on-surface">Informations Personnelles</h3>
      <p className="text-body-md text-on-surface-variant">Entez les details personnels de l'agent</p>
      
        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Nom <span className="text-error">*</span>
          </label>
          <input
            type="text"
            {...register('lastName')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter last name"
          />
          {errors.lastName && (
            <p className="text-xs text-error mt-1">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Post-nom
          </label>
          <input
            type="text"
            {...register('postName')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter post name"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Prénom <span className="text-error">*</span>
          </label>
          <input
            type="text"
            {...register('firstName')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter first name"
          />
          {errors.firstName && (
            <p className="text-xs text-error mt-1">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Photo
          </label>
          <input
            type="file"
            accept="image/*"
            {...register('photo')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-secondary file:text-on-secondary hover:file:bg-secondary/90"
          />
        </div>

        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Date de naissance <span className="text-error">*</span>
          </label>
          <input
            type="date"
            {...register('birthDate')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.birthDate && (
            <p className="text-xs text-error mt-1">{errors.birthDate.message}</p>
          )}
        </div>

        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Lieu de naissance <span className="text-error">*</span>
          </label>
          <input
            type="text"
            {...register('birthPlace')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter birth place"
          />
          {errors.birthPlace && (
            <p className="text-xs text-error mt-1">{errors.birthPlace.message}</p>
          )}
        </div>

        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Genre <span className="text-error">*</span>
          </label>
          <select
            {...register('gender')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select gender</option>
            <option value="MALE">Homme</option>
            <option value="FEMALE">Femme</option>
          </select>
          {errors.gender && (
            <p className="text-xs text-error mt-1">{errors.gender.message}</p>
          )}
        </div>

        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Nationalité <span className="text-error">*</span>
          </label>
          <input
            type="text"
            {...register('nationality')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter nationality"
          />
          {errors.nationality && (
            <p className="text-xs text-error mt-1">{errors.nationality.message}</p>
          )}
        </div>

        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Province d'Origine <span className="text-error">*</span>
          </label>
          <input
            type="text"
            {...register('provinceOrigin')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter province"
          />
          {errors.provinceOrigin && (
            <p className="text-xs text-error mt-1">{errors.provinceOrigin.message}</p>
          )}
        </div>

        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Etat-civil <span className="text-error">*</span>
          </label>
          <select
            {...register('maritalStatus')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select status</option>
            <option value="MARRIED">Marrié</option>
            <option value="SINGLE">Celibataire</option>
            <option value="DIVORCED">Divorcé</option>
            <option value="WIDOWED">Veuf</option>
          </select>
          {errors.maritalStatus && (
            <p className="text-xs text-error mt-1">{errors.maritalStatus.message}</p>
          )}
        </div>

        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Pays <span className="text-error">*</span>
          </label>
          <input
            type="text"
            {...register('country')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter country"
          />
          {errors.country && (
            <p className="text-xs text-error mt-1">{errors.country.message}</p>
          )}
        </div>

        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Ville <span className="text-error">*</span>
          </label>
          <input
            type="text"
            {...register('city')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter city"
          />
          {errors.city && (
            <p className="text-xs text-error mt-1">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Commune <span className="text-error">*</span>
          </label>
          <input
            type="text"
            {...register('commune')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter commune"
          />
          {errors.commune && (
            <p className="text-xs text-error mt-1">{errors.commune.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Adresse <span className="text-error">*</span>
          </label>
          <input
            type="text"
            {...register('address')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter address"
          />
          {errors.address && (
            <p className="text-xs text-error mt-1">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Numéro de téléphone <span className="text-error">*</span>
          </label>
          <input
            type="tel"
            {...register('phone')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter phone number"
          />
          {errors.phone && (
            <p className="text-xs text-error mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            WhatsApp
          </label>
          <input
            type="tel"
            {...register('whatsapp')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter WhatsApp number"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Email
          </label>
          <input
            type="email"
            {...register('email')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter email address"
          />
          {errors.email && (
            <p className="text-xs text-error mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}