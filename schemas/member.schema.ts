import { z } from 'zod'

// Step 1: Personal Information
export const memberPersonalSchema = z.object({
  ownerId: z.string().min(1, 'ownerId is required'),
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom est requis'),
  postName: z.string().optional(),
  photo: z.string().optional(),
  birthDate: z.string().min(1, 'La date de naissance est requise'),
  birthPlace: z.string().min(1, 'Le lieu de naissance est requis'),
  gender: z.enum(['MALE', 'FEMALE']),
  nationality: z.string().min(1, 'La nationalité est requise'),
  provinceOrigin: z.string().min(1, 'La province d\'origine est requise'),
  maritalStatus: z.enum(['MARRIED', 'SINGLE', 'WIDOWED', 'DIVORCED']),
  country: z.string().min(1, 'Le pays est requis'),
  city: z.string().min(1, 'La ville est requise'),
  commune: z.string().min(1, 'La commune est requise'),
  address: z.string().min(1, 'L\'adresse est requise'),
  phone: z.string().min(1, 'Le numéro de téléphone est requis'),
  whatsapp: z.string().optional(),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
})

// Step 2: Profile
export const memberProfileSchema = z.object({
  hasDiploma: z.boolean().default(false),
  diplomaLevel: z.enum(['STATE_DIPLOMA', 'GRADUATE', 'LICENSE', 'MASTER', 'DOCTORATE']).optional(),
  profession: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.hasDiploma && !data.diplomaLevel) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Le niveau de diplôme est requis',
      path: ['diplomaLevel'],
    })
  }
})

// Full Member Schema
export const memberSchema = memberPersonalSchema.merge(memberProfileSchema)

export type MemberPersonalInput = z.infer<typeof memberPersonalSchema>
export type MemberProfileInput = z.infer<typeof memberProfileSchema>
export type MemberInput = z.infer<typeof memberSchema>