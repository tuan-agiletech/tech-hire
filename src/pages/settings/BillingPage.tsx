
import { useState } from 'react'
import { toast } from 'sonner'
import PlanCard from '@/components/settings/plan-card'
import UpgradeModal from '@/components/settings/upgrade-modal'
import type { UpgradePlanFormData } from '@/lib/validations/billing'

interface Subscription {
  id: string
  organizationId: string
  planId: 'free' | 'growth' | 'enterprise'
  startAt: string
  endAt: string | null
  stripeSubscriptionId: string | null
  stripeInvoiceId: string | null
  willRenew: boolean
}

// Mock data
const getSubscription = (): Subscription => ({
  id: 'cmgvkbyuu1icc12vig4afodc6',
  organizationId: 'cmgvkbyut1ica12viy4v4olu0',
  planId: 'free',
  startAt: '2025-10-18T00:52:09.653Z',
  endAt: null,
  stripeSubscriptionId: null,
  stripeInvoiceId: null,
  willRenew: true,
})

const getJobCount = () => 0

export default function BillingSettingsPage() {
  const [subscription, setSubscription] = useState(getSubscription())
  const jobCount = getJobCount()
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false)

  const currentPlanFeatures = [
    { name: 'Unlimited candidates', included: true },
    { name: 'Unlimited admins', included: true },
    { name: 'Assessment integrations', included: true },
    { name: 'Post on 10+ job boards', included: true },
    {
      name: 'Up to 3 jobs posted',
      included: true,
      limit: { current: jobCount, max: 3 },
    },
  ]

  const growthPlanFeatures = [
    { name: 'Unlimited candidates', included: true },
    { name: 'Unlimited admins', included: true },
    { name: 'Assessment integrations', included: true },
    { name: 'Unlimited jobs posted', included: true },
    { name: 'Remove Growhire branding', included: true },
    { name: 'Post on 10+ job boards', included: true },
    { name: 'Slack Connect with the Growhire team', included: true },
    { name: 'Scheduling', included: true, comingSoon: true },
    { name: 'SSO', included: true, comingSoon: true },
  ]

  const handleUpgrade = async (data: UpgradePlanFormData) => {
    try {
      // API call to upgrade subscription
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log('Upgrading to plan:', data)
      
      // Update subscription state
      setSubscription({
        ...subscription,
        planId: 'growth',
      })

      toast.success('Successfully upgraded to Growth plan!')
    } catch (error) {
      toast.error('Failed to upgrade plan')
      console.error(error)
      throw error
    }
  }

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription?')) return

    try {
      // API call to cancel subscription
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSubscription({
        ...subscription,
        willRenew: false,
      })

      toast.success('Subscription will be canceled at the end of billing period')
    } catch (error) {
      toast.error('Failed to cancel subscription')
      console.error(error)
    }
  }

  return (
    <>
      <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        {/* Current Plan */}
        <PlanCard
          name="Free forever"
          isCurrentPlan={subscription.planId === 'free'}
          features={currentPlanFeatures}
        />

        {/* Growth Plan */}
        {subscription.planId === 'free' && (
          <PlanCard
            name="Upgrade to Growth Plan"
            description="Get access to unlimited features."
            price={49}
            period="month"
            features={growthPlanFeatures}
            onUpgrade={() => setIsUpgradeModalOpen(true)}
            highlighted
          />
        )}

        {/* Active Growth Plan */}
        {subscription.planId === 'growth' && (
          <div className="bg-white shadow-sm sm:rounded-md">
            <div className="px-4 py-6 sm:p-8">
              <div className="sm:flex sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    Manage Subscription
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    View and manage your billing information.
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <dl className="divide-y divide-gray-200">
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-900">
                      Current Plan
                    </dt>
                    <dd className="mt-1 text-sm text-gray-500 sm:col-span-2 sm:mt-0">
                      Growth Plan - $49/month
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-900">
                      Billing Cycle
                    </dt>
                    <dd className="mt-1 text-sm text-gray-500 sm:col-span-2 sm:mt-0">
                      Monthly - Renews on{' '}
                      {new Date(
                        new Date(subscription.startAt).setMonth(
                          new Date(subscription.startAt).getMonth() + 1
                        )
                      ).toLocaleDateString()}
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-900">Status</dt>
                    <dd className="mt-1 text-sm text-gray-500 sm:col-span-2 sm:mt-0">
                      {subscription.willRenew ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                          Canceling at end of period
                        </span>
                      )}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-6 flex gap-3">
                {subscription.willRenew && (
                  <button
                    type="button"
                    onClick={handleCancelSubscription}
                    className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-50"
                  >
                    Cancel Subscription
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        planName="Growth Plan"
        price={49}
        onUpgrade={handleUpgrade}
      />
    </>
  )
}