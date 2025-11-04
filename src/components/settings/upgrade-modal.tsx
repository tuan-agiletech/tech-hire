import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X, CreditCard } from 'lucide-react'
import { upgradePlanSchema, type UpgradePlanFormData } from '@/lib/validations/billing'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!)

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  planName: string
  price: number
  onUpgrade: (data: UpgradePlanFormData) => Promise<void>
}

function UpgradeModalContent({
  onClose,
  planName,
  price,
  onUpgrade,
}: Omit<UpgradeModalProps, 'isOpen'>) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpgradePlanFormData>({
    resolver: zodResolver(upgradePlanSchema),
  })

  const handleFormSubmit = async (data: UpgradePlanFormData) => {
    if (!stripe || !elements) return

    setIsProcessing(true)

    try {
      const cardElement = elements.getElement(CardElement)
      if (!cardElement) throw new Error('Card element not found')

      // Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      })

      if (error) throw error

      // Submit upgrade
      await onUpgrade({
        ...data,
        paymentMethodId: paymentMethod.id,
      })

      onClose()
    } catch (error) {
      console.error('Payment error:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="mt-6 space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-900">Plan Summary</h4>
          <div className="mt-2 bg-gray-50 rounded-md p-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-900">{planName}</span>
              <span className="text-sm font-semibold text-gray-900">
                ${price}/month
              </span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            <CreditCard className="inline-block w-4 h-4 mr-2" />
            Payment Method
          </label>
          <div className="p-3 border border-gray-300 rounded-md">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <p className="text-sm text-blue-700">
            You will be charged ${price} today and every month thereafter. You can
            cancel anytime.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-row-reverse gap-3">
        <button
          type="submit"
          disabled={!stripe || isSubmitting || isProcessing}
          className="inline-flex justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing...' : `Pay $${price}`}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default function UpgradeModal(props: UpgradeModalProps) {
  const { isOpen, onClose, planName, price, onUpgrade } = props

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold leading-6 text-gray-900"
                >
                  Upgrade to {planName}
                </Dialog.Title>

                <Elements stripe={stripePromise}>
                  <UpgradeModalContent
                    onClose={onClose}
                    planName={planName}
                    price={price}
                    onUpgrade={onUpgrade}
                  />
                </Elements>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}