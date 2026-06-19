'use client'

import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { AgentFormData } from '@/types/agent.types'

interface AgentFormStep3Props {
  register: UseFormRegister<AgentFormData>
  errors: FieldErrors<AgentFormData>
}

export default function MemberFormStep3({ register, errors }: AgentFormStep3Props) {
  return (
    <div className="space-y-6">
      <h3 className="text-headline-md font-bold text-on-surface">Fonction dans l'ASBL</h3>
      <p className="text-body-md text-on-surface-variant">Enter les détails du role et tâche</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Fonction <span className="text-error">*</span>
          </label>
          <input
            type="text"
            {...register('function')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter function (e.g., Field Agent, Supervisor)"
          />
          {errors.function && (
            <p className="text-xs text-error mt-1">{errors.function.message}</p>
          )}
        </div>

        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Zone <span className="text-error">*</span>
          </label>
          <input
            type="text"
            {...register('zone')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter zone (e.g., Goma, Bukavu)"
          />
          {errors.zone && (
            <p className="text-xs text-error mt-1">{errors.zone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Date de début <span className="text-error">*</span>
          </label>
          <input
            type="date"
            {...register('startDate')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.startDate && (
            <p className="text-xs text-error mt-1">{errors.startDate.message}</p>
          )}
        </div>

        <div>
          <label className="block text-label-md font-medium text-on-surface mb-1">
            Superviseur
          </label>
          <input
            type="text"
            {...register('supervisor')}
            className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter supervisor name"
          />
        </div>
      </div>
    </div>
  )
}