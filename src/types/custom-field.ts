export type CustomFieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'date'
  | 'select'
  | 'multiselect'
  | 'checkbox'
  | 'url'
  | 'email'

export interface CustomField {
  id: string
  name: string
  type: CustomFieldType
  description?: string | null
  required: boolean
  options?: string[] | undefined
  organizationId: string
  createdAt: string
  updatedAt?: string | null
}

export interface CustomFieldValue {
  id: string
  customFieldId: string
  candidateId: string
  value: string | number | boolean | string[]
  createdAt: string
  updatedAt?: string | null
}