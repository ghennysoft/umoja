'use client'

import { UseFormRegister, FieldErrors, WatchObserver } from 'react-hook-form'
import { MemberFormData } from '@/types/agent.types'

interface AgentFormStep2Props {
  register: UseFormRegister<MemberFormData>
  errors: FieldErrors<MemberFormData>
  watch: any
}

export default function MemberFormStep2({ register, errors, watch }: AgentFormStep2Props) {
  const hasDiplome = watch('hasDiplome')

  return (
    <div className="space-y-6">
      <h3 className="text-headline-md font-bold text-on-surface">Profile personnel</h3>
      <p className="text-body-md text-on-surface-variant">Entrer les details du Profile du membre</p>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register('hasDiplome')}
            className="w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary"
          />
          <label className="text-body-md font-medium text-on-surface">
            Diplomé
          </label>
        </div>

        {hasDiplome && (
          <div>
            <label className="block text-label-md font-medium text-on-surface mb-1">
              Niveau <span className="text-error">*</span>
            </label>
            <select
              {...register('diplomeLevel')}
              className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Selectionne le Niveau</option>
              <option value="Diplome d'Etat">Diplome d'Etat</option>
              <option value="Licence">Licence</option>
              <option value="Graduat">Graduat</option>
              <option value="Doctorat">Doctorat</option>
            </select>
            {errors.diplomeLevel && (
              <p className="text-xs text-error mt-1">{errors.diplomeLevel.message}</p>
            )}
          </div>
        )}
        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Profession / Activité <span className="text-error">*</span>
          </label>
          <input
            type="text"
            {...register('profession')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Entez votre activité"
          />
          {errors.profession && (
            <p className="text-xs text-error mt-1">{errors.profession.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}