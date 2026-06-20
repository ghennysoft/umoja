import { Gender, MaritalStatus, IdType } from '@/app/generated/prisma/enums';
import { Agent } from '@/app/generated/prisma/client';

export type AgentWithRelations = Agent

export interface AgentFormData {
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
  hasId: boolean
  idType?: IdType
  idNumber?: string
  idExpirationDate?: string
  idPhoto?: string
  
  // Step 3
  function: string
  zone: string
  startDate: string
  supervisor?: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}