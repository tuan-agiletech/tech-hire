import { z } from 'zod'

export const upgradePlanSchema = z.object({
  planId: z.enum(['free', 'growth', 'enterprise']),
  paymentMethodId: z.string().optional(),
})

export type UpgradePlanFormData = z.infer<typeof upgradePlanSchema>