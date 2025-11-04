export interface EmailAccount {
  id: string
  userId: string
  email: string
  provider: 'google' | 'microsoft' | 'custom'
  accessToken?: string
  refreshToken?: string
  expiresAt?: string
  isConnected: boolean
  createdAt: string
  updatedAt?: string
}

export interface EmailDomain {
  id: string
  organizationId: string
  domain: string
  status: 'pending' | 'verified' | 'failed'
  verificationToken?: string
  dnsRecords: DNSRecord[]
  createdAt: string
  verifiedAt?: string
  updatedAt?: string
}

export interface DNSRecord {
  type: 'TXT' | 'MX' | 'CNAME'
  name: string
  value: string
  priority?: string
  ttl?: number
}

export interface EmailSender {
  id: string
  email: string
  name?: string
  isVerified: boolean
  isDefault: boolean
}