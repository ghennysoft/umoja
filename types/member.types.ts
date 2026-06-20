import { Gender, MaritalStatus, DiplomaLevel } from '@/app/generated/prisma/enums';
import { Member, Contribution } from '@/app/generated/prisma/client';

export type MemberWithRelations = Member & {
  contributions?: Contribution[]
}

export interface MemberFormData {
  // Step 1
  firstName: string
  lastName: string
  postName?: string
  photo?: string
  birthDate: string
  birthPlace: string
  gender: Gender
  nationality: string
  provinceOrigin: string
  maritalStatus: MaritalStatus
  country: string
  city: string
  commune: string
  address: string
  phone: string
  whatsapp?: string
  email?: string
  
  // Step 2
  hasDiploma: boolean
  diplomaLevel?: DiplomaLevel
  profession?: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}