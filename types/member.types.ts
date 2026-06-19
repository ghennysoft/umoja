import { Agent, Gender, MaritalStatus, IdType } from '@prisma/client'

export type AgentWithRelations = Agent & {
  missions?: Mission[]
  activities?: Activity[]
  reports?: Report[]
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
  hasDiplome: boolean
  diplomeLevel: string
  Profession: string

}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}