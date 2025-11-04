import { z } from 'zod'
import { AttributeType } from '@/types/scorecard'

export const scorecardAttributeSchema = z.object({
  name: z.string().min(1, 'Attribute name is required'),
  type: z.nativeEnum(AttributeType),
  options: z.array(z.string()).default([]),
  isRequired: z.boolean().default(false)
}).refine(
  (data) => {
    if (data.type === AttributeType.MULTI_SELECT || data.type === AttributeType.SINGLE_SELECT) {
      return data.options && data.options.length >= 2
    }
    return true
  },
  {
    message: 'At least 2 options are required for select fields',
    path: ['options']
  }
)

export const scorecardTemplateSchema = z.object({
  name: z.string().min(1, 'Template name is required'),
  description: z.string().optional(),
  attributes: z.array(scorecardAttributeSchema).min(1, 'At least one attribute is required')
})

export type ScorecardTemplateFormData = z.infer<typeof scorecardTemplateSchema>
