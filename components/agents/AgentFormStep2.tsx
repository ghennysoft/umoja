'use client'

import { UseFormRegister, FieldErrors, WatchObserver } from 'react-hook-form'
import { AgentFormData } from '@/types/agent.types'

interface AgentFormStep2Props {
  register: UseFormRegister<AgentFormData>
  errors: FieldErrors<AgentFormData>
  watch: any
}

export default function AgentFormStep2({ register, errors, watch }: AgentFormStep2Props) {
  const hasId = watch('hasId')

  return (
    <div className="space-y-6">
      <h3 className="text-headline-md font-bold text-on-surface">Identification</h3>
      <p className="text-body-md text-on-surface-variant">Entrer les details d'identification de l'agent</p>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register('hasId')}
            className="w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary"
          />
          <label className="text-body-md font-medium text-on-surface">
            Détient une carte d'identification officiel
          </label>
        </div>

        {hasId && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-outline-variant/30">
            <div>
              <label className="block text-label-md font-medium text-on-surface mb-1">
                Type de carte <span className="text-error">*</span>
              </label>
              <select
                {...register('idType')}
                className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Selectionnez le type de carte</option>
                <option value="NATIONAL_ID">carte d'électeur</option>
                <option value="PASSPORT">Passport</option>
                <option value="DRIVER_LICENSE">Permis de conduire</option>
                <option value="OTHER">Autre</option>
              </select>
              {errors.idType && (
                <p className="text-xs text-error mt-1">{errors.idType.message}</p>
              )}
            </div>

            <div>
              <label className="block text-label-md font-medium text-on-surface mb-1">
                Numéro de la carte <span className="text-error">*</span>
              </label>
              <input
                type="text"
                {...register('idNumber')}
                className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter ID number"
              />
              {errors.idNumber && (
                <p className="text-xs text-error mt-1">{errors.idNumber.message}</p>
              )}
            </div>

            <div>
              <label className="block text-label-md font-medium text-on-surface mb-1">
                Date d'Expiration de la carte <span className="text-error">*</span>
              </label>
              <input
                type="date"
                {...register('idExpirationDate')}
                className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {errors.idExpirationDate && (
                <p className="text-xs text-error mt-1">{errors.idExpirationDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-label-md font-medium text-on-surface mb-1">
                Photo de la carte
              </label>
              <input
                type="file"
                accept="image/*"
                {...register('idPhoto')}
                className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-secondary file:text-on-secondary hover:file:bg-secondary/90"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}