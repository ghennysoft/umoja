import { z } from 'zod'

// Step 1: Personal Information
export const memberPersonalSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  postName: z.string().optional(),
  photo: z.any().optional(),
  birthDate: z.string().min(1, 'Birth date is required'),
  birthPlace: z.string().min(1, 'Birth place is required'),
  gender: z.enum(['MALE', 'FEMALE']),
  nationality: z.string().min(1, 'Nationality is required'),
  provinceOrigin: z.string().min(1, 'Province of origin is required'),
  maritalStatus: z.enum(['MARRIED', 'SINGLE', 'WIDOWED', 'DIVORCED']),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  commune: z.string().min(1, 'Commune is required'),
  address: z.string().min(1, 'Address is required'),
  phone: z.string().min(1, 'Phone number is required'),
  whatsapp: z.string().optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
})

// Step 2: Identification (sans superRefine, utilisée dans le composant)
export const memberIdentificationSchema = z.object({
  hasId: z.boolean().default(false),
  idType: z.enum(['NATIONAL_ID', 'PASSPORT', 'DRIVER_LICENSE', 'OTHER']).optional(),
  idNumber: z.string().optional(),
  idExpirationDate: z.string().optional(),
  idPhoto: z.any().optional(),
})

// Step 3: Function
export const memberFunctionSchema = z.object({
  function: z.string().min(1, 'Function is required'),
  zone: z.string().min(1, 'Zone is required'),
  startDate: z.string().min(1, 'Start date is required'),
  supervisor: z.string().optional(),
})

// Full member Schema - Utilisation de .extend() au lieu de .merge()
export const memberSchema = memberPersonalSchema
  .extend(memberIdentificationSchema.shape)
  .extend(memberFunctionSchema.shape)
  .superRefine((data, ctx) => {
    // Validation conditionnelle pour l'identification
    if (data.hasId) {
      if (!data.idType) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'ID type is required',
          path: ['idType'],
        })
      }
      if (!data.idNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'ID number is required',
          path: ['idNumber'],
        })
      }
      if (!data.idExpirationDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'ID expiration date is required',
          path: ['idExpirationDate'],
        })
      }
    }
  })

export type memberPersonalInput = z.infer<typeof agentPersonalSchema>
export type AgentIdentificationInput = z.infer<typeof agentIdentificationSchema>
export type AgentFunctionInput = z.infer<typeof agentFunctionSchema>
export type AgentInput = z.infer<typeof agentSchema>
