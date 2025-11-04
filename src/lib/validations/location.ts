import { z } from 'zod'

export const locationSchema = z.object({
  name: z.string().min(1, 'Location name is required'),
  country: z.string().min(1, 'Please select a country'),
  isRemote: z.boolean().default(false)
})

export type LocationFormData = z.infer<typeof locationSchema>
