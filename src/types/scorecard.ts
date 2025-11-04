export interface ScorecardTemplate {
  id: string
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
  attributeCount: number
  attributes: ScorecardAttribute[]
}

export interface ScorecardAttribute {
  id: string
  name: string
  type: AttributeType
  options?: string[]
  isRequired: boolean
  order: number
}

enum AttributeType {
  RATING = 'rating',
  YES_NO = 'yes-no',
  TEXT = 'text',
  MULTI_SELECT = 'multi-select',
  SINGLE_SELECT = 'single-select'
}
export { AttributeType }

export interface ScorecardTemplateFormData {
  name: string
  description?: string
  attributes: {
    name: string
    type: AttributeType
    options?: string[]
    isRequired: boolean
  }[]
}
