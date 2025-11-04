export interface Job {
  id: string
  title: string
  description?: string
  department?: string
  departmentId?: string
  location?: string
  locationId?: string
  status: 'draft' | 'published' | 'closed'
  type?: 'full-time' | 'part-time' | 'contract' | 'internship'
  remote?: boolean
  salary?: {
    min?: number
    max?: number
    currency?: string
  }
  candidatesCount?: number
  createdAt: string
  updatedAt?: string
  publishedAt?: string
}

export interface Department {
  id: string
  name: string
}

export interface Location {
  id: string
  name: string
  city?: string
  country?: string
}

export interface JobStage {
  id: string
  name: string
}

export interface JobFilters {
  locations: Location[]
  departments: Department[]
  stages: JobStage[]
}