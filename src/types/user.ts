export interface User {
  id: string
  email: string
  status: 'active' | 'inactive' | 'suspended'
  firstName: string
  lastName: string
  photoUrl?: string | null
  externalPhotoId?: string | null
  preferences?: UserPreferences | null
  jobTargetId?: string | null
  createdAt: string
  updatedAt?: string
  lastActiveAt?: string
  failedLoginAttempts: number
  lastFailedLoginAttempt?: string | null
  onboardingDemoStatus?: string | null
  authProvider?: 'google' | 'microsoft' | 'email' | null
}

export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system'
  notifications?: {
    email?: boolean
    push?: boolean
    sms?: boolean
  }
  language?: string
  timezone?: string
}

export interface UserUpdatePayload {
  firstName?: string
  lastName?: string
  photoUrl?: string | null
  preferences?: UserPreferences
}