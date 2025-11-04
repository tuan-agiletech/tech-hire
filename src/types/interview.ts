export interface InterviewQuestion {
  id: string
  question: string
  type: 'text' | 'video' | 'code' | 'multiple-choice'
  timeLimit?: number // in seconds
  required: boolean
  order: number
  options?: string[] // for multiple-choice
  expectedAnswer?: string
  evaluationCriteria?: string[]
}

export interface InterviewTemplate {
  id: string
  name: string
  description?: string
  organizationId: string
  questions: InterviewQuestion[]
  questionsCount: number
  duration?: number // total duration in minutes
  difficulty?: 'easy' | 'medium' | 'hard'
  jobRoles?: string[]
  tags?: string[]
  createdAt: string
  updatedAt?: string
  createdBy?: string
  usageCount?: number
  isPublic?: boolean
}

export interface InterviewSession {
  id: string
  templateId: string
  candidateId: string
  jobId?: string
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  scheduledAt?: string
  startedAt?: string
  completedAt?: string
  responses: InterviewResponse[]
  score?: number
  feedback?: string
  createdAt: string
  updatedAt?: string
}

export interface InterviewResponse {
  questionId: string
  answer: string | string[]
  videoUrl?: string
  duration?: number // time taken to answer in seconds
  score?: number
  evaluatorFeedback?: string
  createdAt: string
}