

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { FormInput } from '@/components/ui/form-input'

const domainSchema = z.object({
  domain: z
    .string()
    .min(1, 'Domain is required')
    .regex(
      /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i,
      'Please enter a valid domain (e.g., company.com)'
    ),
})

type DomainFormData = z.infer<typeof domainSchema>

interface EmailDomainModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: DomainFormData) => Promise<void>
}

export default function EmailDomainModal({ isOpen, onClose, onSubmit }: EmailDomainModalProps) {
  const [step, setStep] = useState<'input' | 'verification'>('input')
  const [copiedRecord, setCopiedRecord] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DomainFormData>({
    resolver: zodResolver(domainSchema),
  })

  const handleFormSubmit = async (data: DomainFormData) => {
    await onSubmit(data)
    setStep('verification')
  }

  const handleClose = () => {
    reset()
    setStep('input')
    setCopiedRecord(null)
    onClose()
  }

  const copyToClipboard = (text: string, recordType: string) => {
    navigator.clipboard.writeText(text)
    setCopiedRecord(recordType)
    setTimeout(() => setCopiedRecord(null), 2000)
  }

  // Mock DNS records
  const dnsRecords = [
    {
      type: 'TXT',
      name: '@',
      value: 'growhire-verification=abc123xyz',
      purpose: 'Domain verification',
    },
    {
      type: 'MX',
      name: '@',
      value: 'mx.growhire.com',
      priority: '10',
      purpose: 'Email routing',
    },
    {
      type: 'TXT',
      name: '@',
      value: 'v=spf1 include:_spf.growhire.com ~all',
      purpose: 'SPF record',
    },
  ]

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                  Configure Custom Domain
                </Dialog.Title>

                {step === 'input' ? (
                  <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-6 space-y-6">
                    <FormInput
                      label="Your Domain"
                      error={errors.domain?.message}
                      required
                    >
                      <input
                        id="domain"
                        type="text"
                        placeholder="company.com"
                        {...register('domain')}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                      />
                    </FormInput>

                    <div className="mt-6 flex flex-row-reverse gap-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 disabled:opacity-50"
                      >
                        {isSubmitting ? 'Verifying...' : 'Continue'}
                      </button>
                      <button
                        type="button"
                        onClick={handleClose}
                        className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="mt-6">
                    <p className="text-sm text-gray-600">
                      Add the following DNS records to your domain provider to verify ownership and
                      enable email sending:
                    </p>

                    <div className="mt-4 space-y-4">
                      {dnsRecords.map((record, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="inline-flex items-center rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                                  {record.type}
                                </span>
                                <span className="text-sm font-medium text-gray-900">
                                  {record.purpose}
                                </span>
                              </div>
                              <dl className="space-y-1">
                                <div className="flex gap-2">
                                  <dt className="text-xs font-medium text-gray-500 w-20">Name:</dt>
                                  <dd className="text-xs text-gray-900 font-mono">{record.name}</dd>
                                </div>
                                <div className="flex gap-2">
                                  <dt className="text-xs font-medium text-gray-500 w-20">Value:</dt>
                                  <dd className="text-xs text-gray-900 font-mono break-all">
                                    {record.value}
                                  </dd>
                                </div>
                                {record.priority && (
                                  <div className="flex gap-2">
                                    <dt className="text-xs font-medium text-gray-500 w-20">
                                      Priority:
                                    </dt>
                                    <dd className="text-xs text-gray-900 font-mono">
                                      {record.priority}
                                    </dd>
                                  </div>
                                )}
                              </dl>
                            </div>
                            <button
                              onClick={() => copyToClipboard(record.value, record.type + index)}
                              className="ml-4 p-2 text-gray-400 hover:text-gray-600"
                            >
                              {copiedRecord === record.type + index ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
                      <p className="text-sm text-blue-700">
                        After adding these records, it may take up to 48 hours for DNS changes to
                        propagate. We'll verify your domain automatically.
                      </p>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="inline-flex justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}