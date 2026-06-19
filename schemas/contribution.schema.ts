import { z } from 'zod'

export const contributionSchema = z.object({
  memberId: z.string().min(1, "L'ID du membre est requis"),
  amount: z.number().min(0.01, "Le montant doit être supérieur à 0"),
  date: z.string().optional(),
})

export type ContributionInput = z.infer<typeof contributionSchema>