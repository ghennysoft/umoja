'use client'

import { UseFormRegister, FieldErrors, WatchObserver } from 'react-hook-form'
import { MemberFormData } from '@/types/member.types'

interface MemberFormStep2Props {
  register: UseFormRegister<MemberFormData>
  errors: FieldErrors<MemberFormData>
  watch: any
}

export default function MemberFormStep2({ register, errors, watch }: MemberFormStep2Props) {
  const hasDiploma = watch('hasDiploma')

  return (
    <div className="space-y-6">
      <h3 className="text-headline-md font-bold text-on-surface">Profil</h3>
      <p className="text-body-md text-on-surface-variant">Saisissez les informations de profil du membre</p>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register('hasDiploma')}
            className="w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary"
          />
          <label className="text-body-md font-medium text-on-surface">
            Possède un diplôme
          </label>
        </div>

        {hasDiploma && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-outline-variant/30">
            <div>
              <label className="block text-label-md font-medium text-on-surface mb-1">
                Niveau de diplôme <span className="text-error">*</span>
              </label>
              <select
                {...register('diplomaLevel')}
                className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Sélectionner le niveau</option>
                <option value="STATE_DIPLOMA">Diplôme d'État</option>
                <option value="GRADUATE">Graduât</option>
                <option value="LICENSE">Licence</option>
                <option value="MASTER">Master</option>
                <option value="DOCTORATE">Doctorat</option>
              </select>
              {errors.diplomaLevel && (
                <p className="text-xs text-error mt-1">{errors.diplomaLevel.message}</p>
              )}
            </div>

            <div>
              <label className="block text-label-md font-medium text-on-surface mb-1">
                Profession
              </label>
              <input
                type="text"
                {...register('profession')}
                className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Entrer la profession"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}