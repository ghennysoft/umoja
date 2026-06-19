'use client'

import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { MemberFormData } from '@/types/member.types'

interface MemberFormStep1Props {
  register: UseFormRegister<MemberFormData>
  errors: FieldErrors<MemberFormData>
}

export default function MemberFormStep1({ register, errors }: MemberFormStep1Props) {
  return (
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
            {...register('firstName')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Entrer le prénom"
          />
          {errors.firstName && (
            <p className="text-xs text-error mt-1">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Nom <span className="text-error">*</span>
          </label>
          <input
            type="text"
            {...register('lastName')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Entrer le nom"
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
            placeholder="Entrer le post-nom"
          />
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
            placeholder="Entrer le lieu de naissance"
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
            <option value="">Sélectionner le genre</option>
            <option value="MALE">Masculin</option>
            <option value="FEMALE">Féminin</option>
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
            placeholder="Entrer la nationalité"
          />
          {errors.nationality && (
            <p className="text-xs text-error mt-1">{errors.nationality.message}</p>
          )}
        </div>

        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Province d'origine <span className="text-error">*</span>
          </label>
          <input
            type="text"
            {...register('provinceOrigin')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Entrer la province"
          />
          {errors.provinceOrigin && (
            <p className="text-xs text-error mt-1">{errors.provinceOrigin.message}</p>
          )}
        </div>

        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            État civil <span className="text-error">*</span>
          </label>
          <select
            {...register('maritalStatus')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Sélectionner l'état civil</option>
            <option value="MARRIED">Marié(e)</option>
            <option value="SINGLE">Célibataire</option>
            <option value="WIDOWED">Veuf/Veuve</option>
            <option value="DIVORCED">Divorcé(e)</option>
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
            placeholder="Entrer le pays"
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
            placeholder="Entrer la ville"
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
            placeholder="Entrer la commune"
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
            placeholder="Entrer l'adresse"
          />
          {errors.address && (
            <p className="text-xs text-error mt-1">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Téléphone <span className="text-error">*</span>
          </label>
          <input
            type="tel"
            {...register('phone')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Entrer le numéro de téléphone"
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
            placeholder="Entrer le numéro WhatsApp"
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
            placeholder="Entrer l'adresse email"
          />
          {errors.email && (
            <p className="text-xs text-error mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}