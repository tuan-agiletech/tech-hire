export type PlanId = 'free' | 'growth' | 'enterprise'

export interface Subscription {
  id: string
  organizationId: string
  planId: PlanId
  startAt: string
  endAt: string | null
  stripeSubscriptionId: string | null
  stripeInvoiceId: string | null
  willRenew: boolean
  canceledAt?: string | null
  trialEndsAt?: string | null
}

export interface Plan {
  id: PlanId
  name: string
  description: string
  price: number
  interval: 'month' | 'year'
  features: PlanFeature[]
}

export interface PlanFeature {
  name: string
  included: boolean
  limit?: number
  comingSoon?: boolean
}

export interface Invoice {
  id: string
  subscriptionId: string
  amount: number
  currency: string
  status: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible'
  createdAt: string
  dueDate?: string
  paidAt?: string
  invoicePdf?: string
}

export interface PaymentMethod {
  id: string
  type: 'card'
  card?: {
    brand: string
    last4: string
    expMonth: number
    expYear: number
  }
  isDefault: boolean
}