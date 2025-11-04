
import { toast } from 'sonner'
import UpgradeBadge from '@/components/ui/upgrade-badge'

interface EmailAccount {
  id: string
  email: string
  provider: 'google' | 'microsoft'
  isConnected: boolean
}

interface Subscription {
  planId: 'free' | 'growth' | 'enterprise'
}

// Mock data
const getSubscription = (): Subscription => ({
  planId: 'free',
})

const getEmailAccounts = (): EmailAccount[] => []

export default function EmailSettingsPage() {
  const subscription = getSubscription()
  const emailAccounts = getEmailAccounts()

  const isPremiumPlan = subscription.planId !== 'free'

  const handleConnectGoogle = async () => {
    if (!isPremiumPlan) {
      toast.error('This feature requires an upgrade to Growth plan')
      return
    }

    try {
      // Redirect to Google OAuth
      window.location.href = '/api/auth/google/connect'
    } catch (error) {
      toast.error('Failed to connect Google account')
      console.error(error)
    }
  }

  const handleConnectMicrosoft = async () => {
    if (!isPremiumPlan) {
      toast.error('This feature requires an upgrade to Growth plan')
      return
    }

    try {
      // Redirect to Microsoft OAuth
      window.location.href = '/api/auth/microsoft/connect'
    } catch (error) {
      toast.error('Failed to connect Microsoft account')
      console.error(error)
    }
  }

  const handleConfigureDomain = () => {
    if (!isPremiumPlan) {
      toast.error('This feature requires an upgrade to Growth plan')
      return
    }

    // Navigate to domain configuration
    console.log('Configure domain clicked')
  }

  return (
    <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
      {/* Connected Email Accounts Section (Hidden if no accounts) */}
      {emailAccounts.length > 0 && (
        <section aria-labelledby="email-accounts-heading">
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="bg-white px-4 py-6 sm:p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <h2
                    id="email-accounts-heading"
                    className="text-lg font-medium leading-6 text-gray-900 inline-flex items-center space-x-2"
                  >
                    <span>Connected email accounts</span>
                    {!isPremiumPlan && <UpgradeBadge />}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Send emails from addresses in your own domain.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleConnectGoogle}
                    disabled={!isPremiumPlan}
                    className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Connect Google
                  </button>

                  <button
                    type="button"
                    onClick={handleConnectMicrosoft}
                    disabled={!isPremiumPlan}
                    className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 23 23">
                      <path fill="#f35325" d="M1 1h10v10H1z" />
                      <path fill="#81bc06" d="M12 1h10v10H12z" />
                      <path fill="#05a6f0" d="M1 12h10v10H1z" />
                      <path fill="#ffba08" d="M12 12h10v10H12z" />
                    </svg>
                    Connect Microsoft
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Custom Email Domain Section */}
      <section aria-labelledby="email-domain-heading">
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="bg-white px-4 py-6 sm:p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <h2
                  id="email-domain-heading"
                  className="text-lg font-medium leading-6 text-gray-900 inline-flex items-center space-x-2"
                >
                  <span>Custom email domain</span>
                  {!isPremiumPlan && <UpgradeBadge />}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Send emails from addresses in your own domain.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={handleConfigureDomain}
                disabled={!isPremiumPlan}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Configure domain
              </button>
            </div>

            {!isPremiumPlan && (
              <div className="mt-6 bg-purple-50 border border-purple-200 rounded-md p-4">
                <div className="flex">
                  <div className="shrink-0">
                    <svg
                      className="h-5 w-5 text-purple-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-purple-800">
                      Upgrade to Growth Plan
                    </h3>
                    <div className="mt-2 text-sm text-purple-700">
                      <p>
                        Custom email domains and connected email accounts are available on the
                        Growth plan.{' '}
                        <a
                          href="/settings/billing"
                          className="font-medium underline hover:no-underline"
                        >
                          Upgrade now
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}