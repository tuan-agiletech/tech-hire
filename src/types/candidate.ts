export interface Candidate {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  location?: string
  photoUrl?: string
  linkedinUrl?: string
  resumeUrl?: string
  coverLetterUrl?: string
  
  // Job application info
  jobId?: string
  jobTitle?: string
  stage?: string
  stageId?: string
  rating?: number
  source?: string
  
  // Dates
  appliedAt: string
  createdAt: string
  updatedAt?: string
  lastActivityAt?: string
  
  // Custom fields
  customFields?: Record<string, any>
  
  // Tags
  tags?: string[]
  
  // Notes count
  notesCount?: number
  
  // Email status
  lastEmailSentAt?: string
  emailStatus?: 'bounced' | 'delivered' | 'opened' | 'clicked'
}

export interface CandidateFilter {
  jobs?: string[]
  stages?: string[]
  sources?: string[]
  tags?: string[]
  dateRange?: {
    from: string
    to: string
  }
  search?: string
}

export interface CandidateColumn {
  id: string
  label: string
  visible: boolean
  order: number
}